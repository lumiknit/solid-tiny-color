import { Component } from 'solid-js';
import { ColorProps } from './ColorBoard';
type Props = {
    /** Stroke width ratio, percent (0.0-1.0) */
    strokeWidth: number;
    /** Enable rotation */
    rotate?: boolean;
} & ColorProps;
declare const HSVWheel: Component<Props>;
export default HSVWheel;
