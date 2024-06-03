import { Component } from 'solid-js';
import { ColorProps } from './ColorBoard';
type Props = {
    /** Stroke width ratio, percent (0.0-1.0) */
    strokeWidth: number;
} & ColorProps;
declare const HueWheel: Component<Props>;
export default HueWheel;
