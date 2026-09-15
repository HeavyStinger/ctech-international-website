// Astro's style={{...}} serialization (unlike React's) does NOT auto-append "px"
// to unitless numeric values — `{ width: 44 }` renders as invalid CSS `width:44`
// instead of `width:44px`. This mirrors React's CSSProperty unitless-number
// allowlist so numeric style values behave the same way they did as JSX.
const UNITLESS = new Set([
  'animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth',
  'boxFlex', 'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'columns',
  'flex', 'flexGrow', 'flexPositive', 'flexShrink', 'flexNegative', 'flexOrder',
  'gridArea', 'gridRow', 'gridRowEnd', 'gridRowSpan', 'gridRowStart',
  'gridColumn', 'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart',
  'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order', 'orphans',
  'tabSize', 'widows', 'zIndex', 'zoom',
  'fillOpacity', 'floodOpacity', 'stopOpacity',
  'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth',
]);

export function pxify(style) {
  if (!style) return style;
  const out = {};
  for (const [key, value] of Object.entries(style)) {
    out[key] = (typeof value === 'number' && !UNITLESS.has(key)) ? `${value}px` : value;
  }
  return out;
}
