import { sdiv } from '../../src/index.js';

//  Atomic style fragments — concatenate as template-literal pieces.

//  Display + direction (orthogonal: pair `flex` alone with `center` for the
//  default row, or use `col`/`row` when direction matters).
export const flex   = 'display:flex;';
export const col    = `${flex}flex-direction:column;`;
export const row    = `${flex}flex-direction:row;`;

//  Centering — assumes display:flex is already set via flex/col/row.
export const center = 'align-items:center;justify-content:center;';

//  Flex-child sizing — `minZero` lets a flex child shrink below its content,
//  `grow` is the common "fill remaining space, allow shrink" pair.
export const minZero = 'min-width:0;min-height:0;';
export const grow    = `flex:1;${minZero}`;

//  Bordered white card — the recurring eInk look. `border`/`white` are kept
//  separately for the few places that want only one.
export const border = 'border:1px solid #000;';
export const white  = 'background:#fff;';
export const black  = 'background:#000;color:#fff;';
export const card   = `${white}${border}`;

export const clip   = 'overflow:hidden;';
export const noWrap = 'white-space:nowrap;';

export const p4 = 'padding:4px;';

//  Fixed-size box with border-box sizing.
export const frame = w => h => `width:${w}px;height:${h}px;box-sizing:border-box;`;

//  Absolute placement at (x, y).
export const at = x => y => `position:absolute;left:${x}px;top:${y}px;`;

// Curried <div> with inline style.
export const styled = style => sdiv(style)({})
