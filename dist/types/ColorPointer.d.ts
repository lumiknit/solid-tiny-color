import { Component, JSX } from 'solid-js';
import { HSV } from './color';
type Props = {
    pos: [number, number];
    /** Size of pointer */
    size?: string;
    /** Fill color */
    hsv: HSV;
    /** Override styles */
    style?: JSX.CSSProperties;
    /** Override class */
    class?: string;
};
declare const ColorPointer: Component<Props>;
export default ColorPointer;
