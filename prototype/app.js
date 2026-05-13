import {
  div, button,
  initStyles,
  mount, disableProfiler,
  createInterval,
  FloatingPanel, StateDebugger, RenderProfiler, ListenersDebugger,
} from '../src/index.js';
import { store, setState, getState } from './store.js';
import { LayoutA, LayoutB } from './views/layouts.js';

// Hack Nerd Font everywhere.
initStyles({
  fonts: {
    sans: "'Hack Nerd Font', 'Hack', ui-monospace, monospace",
    mono: "'Hack Nerd Font', 'Hack', ui-monospace, monospace",
  },
});
document.body.style.cssText =
  "padding:0; margin:0; font-family:'Hack Nerd Font','Hack',ui-monospace,monospace;";

// 30s ticker — flips map ⇄ timetable inside Layout B while auto is on.
createInterval(() => {
  const s = getState();
  if (!s.auto) return;
  setState({ view: s.view === 'timetable' ? 'map' : 'timetable' });
})({ ms: 30000, autoStart: true });

// Wall-clock ticker so the displayed time advances.
createInterval(() => setState({ now: new Date() }))(
  { ms: 30000, autoStart: true }
);

const simulateRfidScan = () => {
  setState({ layout: 'A' });
  setState({ rfid: true });
  setTimeout(() => setState({ layout: 'B', rfid: false }), 15000);
}

const weatherRandomizer = () => {
  const temp = Math.floor(Math.random() * 60) - 20;
  setState({ weatherId: (getState().weatherId + 1) % getState().weatherOptions.length, tempC: temp, tempF: Math.round(temp * 9/5 + 32)});
};

const pinView    = v => () => setState({ layout: 'B', view: v, auto: false });
const resumeAuto = () => setState({ auto: true, layout: 'Bs' });

const hwBtn = active => `
  padding:6px 12px;
  border:1px solid #333;
  background:${active ? '#222' : '#fff'};
  color:${active ? '#fff' : '#222'};
  font-size:14px;
  cursor:pointer;
  border-radius:4px;
`;

// eInk panel — strict 600x800
const einkPanel = state =>
  div({
    class: 'content',
    style: `
      width:600px; height:800px;
      box-sizing:border-box;
      background:#fff; color:#000;
      border:1px solid #000;
      overflow:hidden;
      font-family:'Hack Nerd Font','Hack',ui-monospace,monospace;
    `,
  })([
    state.layout === 'A' ? LayoutA(state) : LayoutB(state),
  ]);

const controls = state =>
  div({
    style: `
      display:flex; gap:8px; align-items:center; flex-wrap:wrap;
      padding:12px;
      background:#e6e6e6;
      border-bottom:1px solid #bbb;
    `,
  })([
    div({ style: 'font-size:12px; color:#555; margin-right:auto;' })([
      'simulated hardware controls — eInk content has no input',
    ]),
    
    button({ style: hwBtn(false), onclick: weatherRandomizer })(['Weather switch']),
    // Layout switch
    button({ style: hwBtn(state.layout === 'A' && state.rfid), onclick: simulateRfidScan })(['Simulate RFID Scan']),
    button({ style: hwBtn(state.layout === 'A' && !state.rfid), onclick: () => setState({ rfid: false, layout: 'A' }) })(['User Display']),
    button({
      style: hwBtn(state.layout === 'B' && state.view === 'timetable' && !state.auto),
      onclick: pinView('timetable'),
    })(['Time Table']),
    button({
      style: hwBtn(state.layout === 'B' && state.view === 'map' && !state.auto),
      onclick: pinView('map'),
    })(['Map']),
    button({
      style: hwBtn(state.auto),
      onclick: resumeAuto,
      title: 'Re-enable 30s auto-switching of map ⇄ timetable',
    })([state.auto ? '⟳ Auto 30s' : '⏸ Manual']),
    button({
      style: hwBtn(state.debugOpen),
      onclick: () => setState({ debugOpen: !state.debugOpen }),
    })(['⚙ Debug']),
  ]);

const pageView = state =>
  div({
    class: 'page',
    style: 'min-height:100vh; background:#cfcfcf; display:flex; flex-direction:column;',
  })([
    controls(state),
    div({ style: 'flex:1; display:flex; align-items:center; justify-content:center;' })([
      einkPanel(state),
    ]),
  ]);

const view = state => [
  pageView(state),
  FloatingPanel({
    id:       'state-debugger',
    title:    'State Debugger',
    open:     state.debugOpen,
    onClose:  () => { setState({ debugOpen: false }); disableProfiler(); },
    initialX: 24,
    initialY: 64,
    initialW: 920,
    initialH: 560,
  })([
    StateDebugger({ state, setState, getState }),
    RenderProfiler({ setState, active: state.debugOpen }),
    //ListenersDebugger({ setState }),
  ]),
];

mount(store)(document.body)(view);
