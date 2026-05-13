import { div, i } from '../../src/index.js';
import { Panel } from './Panel.js';
import { card, center, clip, col, flex, frame, grow, p4, row, styled, f700, fs42px, fs52px, w100 } from './styles.js';

const pad     = n => String(n).padStart(2, '0');
const fmtHM   = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtDate = d => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

// 600-wide bordered eInk row (TimeTile / WeatherTile share this frame).
const einkRow = h => content =>
  styled(`${frame(600)(h)}${card}${row}${center}${p4}}${clip}`)([
    styled(`${grow}${col}${w100}align-items:flex-start;justify-content:center;`)(content),
  ]);

// Single row
const ticketRow = total => (t, idx) =>
  styled(`flex:1;${flex}${center}${idx < total - 1 ? 'border-bottom:1px solid #000;' : ''}font-size:20px;`)([t]);

// Layout A 300×200
// Money: body below the icon (full width), one big centered value.
export const MoneyTile = ({ money }) =>
  Panel({ w: 300, h: 200, mode: 'below', iconClass: 'nf nf-md-glass_cocktail' })([
    styled(`${flex}${center}${fs52px}${f700}letter-spacing:.02em;`)([`${money}.-`]),
  ]);

// Tickets: body beside the icon (full height), 5 evenly-tall rows.
export const TicketsTile = ({ tickets }) =>
  Panel({ w: 300, h: 200, mode: 'beside', iconClass: 'nf nf-md-ticket_account' })(
    tickets.map(ticketRow(tickets.length))
  );

export const TimeTile = ({ now }) =>
  einkRow(50)([
    styled(`${flex}${p4}${f700}${fs42px}${w100}justify-content:space-between;`)([
      div({})([fmtHM(now)]),
      div({})([fmtDate(now)]),
    ]),
  ]);

export const WeatherTile = ({ tempC, tempF, weatherId, weatherOptions }) =>
  einkRow(150)([
    styled(`${fs52px}${f700}line-height:1;margin:auto;`)([
      i({ className: `nf nf-md-weather_${weatherOptions[weatherId]}` })([]),
      ` ${tempC}°C / ${tempF}°F`,
    ]),
  ]);
