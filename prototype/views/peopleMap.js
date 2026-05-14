import { FestivalMap, Single, Stack } from './festivalLayout.js';

// Map with friends <3
export const PeopleMap = ({ positions, labels, people, lengths, cols, displayPos }) =>
  FestivalMap({ displayPos })(
    Object.entries(labels).flatMap(([id, text]) => {
      const pos    = positions[id];
      const list   = people[id]  || [];
      const limit  = lengths[id];
      const ncols  = cols[id]    || 1;
      const bodyAt = { x: pos.x, y: pos.y + 28 }; // 4px padding + 24px label height
      const body   = limit != null && list.length > limit
        ? Single({ ...bodyAt, text: `${list.length}/${Object.values(people).flat().length}` })
        : (list.length ? Stack({ ...bodyAt, items: list, cols: ncols }) : null);
      return [ Single({ ...pos, text }), body ];
    }).filter(Boolean)
  );
