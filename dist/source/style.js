export const styleWH100 = {
    width: '100%',
    height: '100%',
};
export const styleAbsLT0 = {
    position: 'absolute',
    left: '0',
    top: '0',
};
export const styleBgCheckerboard = (color1, color2, size = 16) => ({
    background: `repeating-conic-gradient(${color1} 0% 25%, ${color2} 25% 50%)`,
    'background-size': `${size}px ${size}px`,
});
export const styleNoTouchAction = {
    'touch-action': 'none',
    '-webkit-touch-callout': 'none',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
};
const gd = (deg) => `hsl(${deg},100%,50%) ${deg}deg`;
export const gradHueConic = `conic-gradient(${[0, 120, 240, 360].map(gd).join()})`;
