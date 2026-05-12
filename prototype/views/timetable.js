import { col, frame, styled, border, flex, black, p4 } from './styles.js';
import { div } from '../../src/index.js';

// Stage 1 / Stage 2 set lists live in the store.

const height = 40;
const fontSize = 16;
const sizeStyle = `height:${height}px;font-size:${fontSize}pt;`;

export const StageBlock = (label) => slots =>
  styled(`${border}${col}flex:1;min-height:0;`)([
    div({ style: `${black}text-align:center;${p4}font-weight:700;letter-spacing:.08em;${sizeStyle}`})([label]),
    ...slots.map(([name, time]) =>
      styled(`${flex}justify-content:space-between;${p4}border-bottom:1px solid #000;${sizeStyle}`)([
        div({})([name]),
        div({})([time]),
      ])
    ),
  ]);

export const TimetableView = ({ stage1, stage2 }) =>
  styled(`${frame(600)(600)}${col}`)([
    StageBlock('Stage 1')(stage1),
    StageBlock('Stage 2')(stage2),
  ]);
