import { Component } from 'solid-js';
import { ColorProps } from './ColorBoard';
import { HSV } from './color';
type Props = {
    /** Color map
     * @param hsv Current color
     * @param p Position. 0.0 is leftmost, 1.0 is rightmost.
     * @returns [color for style, color in HSV]
     */
    colorMap: (hsv: HSV, p: number) => [string, HSV];
    /** Inverse Color map
     * @param color Color in HSV
     * @returns Position. 0.0 is leftmost, 1.0 is rightmost.
     */
    inverseColorMap: (color: HSV) => number;
} & ColorProps;
declare const Slider: Component<Props>;
export default Slider;
export declare const RGBSliderR: Component<ColorProps>;
export declare const RGBSliderG: Component<ColorProps>;
export declare const RGBSliderB: Component<ColorProps>;
export declare const HSVSliderH: Component<ColorProps>;
export declare const HSVSliderS: Component<ColorProps>;
export declare const HSVSliderV: Component<ColorProps>;
export declare const HSLSliderH: Component<ColorProps>;
export declare const HSLSliderS: Component<ColorProps>;
export declare const HSLSliderL: Component<ColorProps>;
