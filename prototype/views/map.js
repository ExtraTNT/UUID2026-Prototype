import { FestivalMap, Single } from './festivalLayout.js';

export const MapView = ({ positions, labels, displayPos }) =>
  FestivalMap({displayPos})(Object.entries(labels).map(([id, text]) => Single({ ...positions[id], text })));
