import { at, card, clip, frame, noWrap, styled, white, f700, w100, h100, fs42px, fs24px } from './styles.js';
import { i } from '../../src/index.js';

const SVG_SKETCH = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' width='592' height='592'>
  <defs>
    <pattern id='dots' x='0' y='0' width='10' height='10' patternUnits='userSpaceOnUse'><circle cx='5' cy='5' r='1' fill='#000'/></pattern>
    <pattern id='grass' x='0' y='0' width='14' height='14' patternUnits='userSpaceOnUse'><circle cx='7' cy='7' r='1.3' fill='#000'/></pattern>
  </defs>
  <rect width='600' height='600' fill='#fff'/>
  <rect x='10' y='10' width='285' height='110' fill='none' stroke='#000' stroke-width='3'/>
  <rect x='305' y='10' width='285' height='110' fill='none' stroke='#000' stroke-width='3'/>
  <rect x='10' y='130' width='580' height='65' fill='url(#dots)' stroke='#000' stroke-dasharray='3 3'/>
  <rect x='10' y='205' width='80' height='70' fill='none' stroke='#000'/>
  <rect x='100' y='205' width='280' height='70' fill='none' stroke='#000'/>
  <rect x='390' y='205' width='200' height='70' fill='none' stroke='#000'/>
  <rect x='395' y='210' width='190' height='60' fill='none' stroke='#000'/>
  <rect x='10' y='285' width='130' height='50' fill='none' stroke='#000' stroke-dasharray='4 4'/>
  <rect x='150' y='285' width='90' height='50' fill='none' stroke='#000' stroke-dasharray='4 4'/>
  <rect x='250' y='285' width='130' height='50' fill='none' stroke='#000' stroke-dasharray='4 4'/>
  <rect x='390' y='285' width='200' height='50' fill='none' stroke='#000' stroke-dasharray='4 4'/>
  <line x1='0' y1='350' x2='600' y2='350' stroke='#000' stroke-dasharray='14 14' stroke-width='2'/>
  <rect x='10' y='360' width='185' height='230' fill='url(#grass)' stroke='#000'/>
  <rect x='205' y='360' width='190' height='230' fill='url(#grass)' stroke='#000'/>
  <rect x='405' y='360' width='185' height='230' fill='url(#grass)' stroke='#000'/>
  <rect x='280' y='580' width='40' height='20' fill='#fff' stroke='#000'/>
</svg>`;

const DEFAULT_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SVG_SKETCH)}`;


// 600x600 canvas with image as background.
export const FestivalMap = ({ image = DEFAULT_IMAGE, pad = 4, displayPos = [0,0] } = {}) => overlays =>
  styled(`position:relative;${frame(600)(600)}padding:${pad}px;${white}${clip}`)([
    styled(`position:relative;${w100}${h100}background:url("${image}") center/100% 100% no-repeat;${clip}`)([...overlays, 
      i({className: 'nf nf-md-map_marker', style: `${at(displayPos[0])(displayPos[1])}${fs24px}`})([]),
    ]),
    
  ]);

// Single label at (x, y).
export const Single = ({ x, y, text, size = 14 }) =>
  styled(`${at(x)(y)}font-size:${size}px;${f700}${card}padding:0 2px;${noWrap}`)([text]);

// Stack of labels at (x, y). Collapses to "<count>/<length>" if items.length > lengths[id].
export const Stack = ({ x, y, items, cols = 1, size = 14 }) =>
  styled(`${at(x)(y)}display:grid;grid-template-columns:repeat(${cols},auto);gap:2px;`)(
    items.map(t => styled(`${card}padding:0 2px;font-size:${size}px;line-height:1.25;${noWrap}`)([t]))
  );
