import { FestivalMap, Single } from './festivalLayout.js';

export const MapView = ({ positions, labels }) =>
  FestivalMap()(Object.entries(labels).map(([id, text]) => Single({ ...positions[id], text })));
