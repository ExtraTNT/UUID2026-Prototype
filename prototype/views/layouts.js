import { col, flex, styled } from './styles.js';
import { MoneyTile, TicketsTile, TimeTile, WeatherTile } from './tiles.js';
import { PeopleMap }     from './peopleMap.js';
import { TimetableView } from './timetable.js';
import { MapView }       from './map.js';

// Forced layout
const Shell = styled(`${col}width:600px;height:800px;`);
const Row   = styled(flex);
const Stack = styled(col);

// Layout A — money + tickets row on top, 600x600 people-map below.
export const LayoutA = state =>
  Shell([
    Row([ MoneyTile(state), TicketsTile(state) ]),
    PeopleMap(state)
  ]);

// Layout B — time / weather stacked on top, 600x600 map / timetable below.
export const LayoutB = state =>
  Shell([
    Stack([ TimeTile(state), WeatherTile(state) ]),
    state.view === 'timetable' ? TimetableView(state) : MapView(state)
  ]);
