import { createStore } from '../src/index.js';

export const store = createStore({
  layout:    'B',
  view:      'timetable',
  auto:      true,
  rfid:      false,
  debugOpen: false,
  weatherId:  2,
  //cloudy
  //lightning
  //pouring
  //snowy
  //sunny
  //sunny_alert
  //partly_cloudy
  weatherOptions: ['cloudy', 'lightning', 'pouring', 'snowy', 'sunny', 'sunny_alert', 'partly_cloudy'],

  now:   new Date(),
  tempC: 14,
  tempF: 57,

  money:   1754,
  tickets: ['ToytoiIsland', 'Entrance', 'Camp D', 'Bar 18+', 'Showers +'],

  // Anchor (x,y) of each zone label on the 600x600 festival-map grid.
  positions: {
    stage1:  { x:  20, y:  20 },
    stage2:  { x: 315, y:  20 },
    bar:     { x:  20, y: 213 },
    food:    { x: 190, y: 213 },
    vip:     { x: 460, y: 213 },
    showers: { x:  18, y: 293 },
    wc:      { x: 158, y: 293 },
    firstaid:{ x: 258, y: 293 },
    info:    { x: 398, y: 293 },
    campA:   { x:  20, y: 368 },
    campB:   { x: 215, y: 368 },
    campD:   { x: 415, y: 368 },
  },

  labels: {
    stage1: 'Stage 1', stage2: 'Stage 2',
    bar: 'BAR', food: 'Food Stands', vip: 'VIP',
    showers: 'Showers', wc: 'WC', firstaid: 'First Aid', info: 'Info',
    campA: 'Camp A', campB: 'Camp B', campD: 'Camp D',
  },

  people: {
    stage1: ['Hugi', 'Lucki', 'Mandy', 'Fäbu', 'Hunzi', 'Maximilian von Allmen'],
    stage2: ['Nicole', 'Fred'],
    bar:    ['Tobi', 'Eli'],
    food:   [],
    vip:    ['Mara'],
    campA:  [],
    campB:  [],
    campD:  ['Boby', 'Rob'],
  },

  // Display-length threshold per zone — over this collapses to "<count>/<total>".
  lengths: {
    stage1: 6, 
    stage2: 6,
    bar: 1,
    food: 0,
    vip: 1,
    campA: 10,
    campB: 10,
    campD: 10,
  },

  // Number of columns the name grid uses per zone.
  cols: {
    stage1: 2,
    stage2: 2,
    bar: 1,
    food: 2,
    vip: 1,
    showers: 1,
    wc: 1,
    firstaid: 1,
    info: 1,
    campA: 2,
    campB: 2,
    campD: 2,
  },

  stage1: [
    ['Megadeth',      '18:30'],
    ['Metallica',     '20:00'],
    ['Judas Priest',  '21:00'],
    ['Slayer',        '22:30'],
    ['Sepultura',     '00:30'],
    ['The Offspring', '02:00'],
  ],

  stage2: [
    ['Save your last breath', '18:30'],
    ['Moment of madness',     '20:00'],
    ['Kanonenfieber',         '21:00'],
    ['GoHang',                '22:30'],
    ['Leather Lung',          '00:30'],
    ['Durbatuluk',            '01:30'],
  ],
});

export const { getState, setState } = store;
