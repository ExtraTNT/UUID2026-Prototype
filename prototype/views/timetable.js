import { col, frame, styled, border, flex, black, p4, f700 } from './styles.js';
import { div } from '../../src/index.js';

// Stage 1 / Stage 2 set lists live in the store.

const height = 40;
const fontSize = 24;
const sizeStyle = `height:${height}px;font-size:${fontSize}px;line-height:1.1;`;

export const StageBlock = (label) => slots =>
  styled(`${border}${col}flex:1;min-height:0;`)([
    div({ style: `${black}${p4}${f700}${sizeStyle}text-align:center;letter-spacing:.08em;`})([label]),
    ...slots.map(([name, time]) =>
      styled(`${flex}${p4}${sizeStyle}justify-content:space-between;border-bottom:1px solid #000;`)([
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
