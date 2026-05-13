import { i } from '../../src/index.js';
import { card, center, clip, col, flex, frame, minZero, p4, styled } from './styles.js';

// Reusable titled panel.
// w x h frame, 1px border, white background.
// icon as i at top left 
// mode='below' : body occupies row 2, both columns (full width).
// mode='beside' : body occupies column 2, both rows (full height).
export const Panel = ({ w, h, iconClass = '', iconSize = 52, slot = 60, mode = 'below' }) => body => {
  const cells = mode === 'beside' ? 'grid-column:2;grid-row:1/3;' : 'grid-column:1/3;grid-row:2;';
  return styled(`${frame(w)(h)}${card}display:grid;grid-template-columns:${slot}px 1fr;grid-template-rows:${slot}px 1fr;${clip}`)([
    styled(`grid-column:1;grid-row:1;${flex}${center}box-sizing:border-box;`)([
      i({ className: iconClass, style: `font-size:${iconSize}px;line-height:1;font-style:normal;${p4}` })([]),
    ]),
    styled(`${cells}${col}${minZero}${p4}`)(body || []),
  ]);
};
