import { Component, JSX } from 'solid-js';
import { HSV } from './color';
export type ColorProps = {
    /** Current selected color */
    hsv: HSV;
    /** Event handler for color is picked.
     * @param hsl Picked color.
     */
    onHSVChange?: (hsv: HSV) => void;
    /** Pointer style */
    pointerStyle?: JSX.CSSProperties;
    /** Pointer class */
    pointerClass?: string;
} & JSX.IntrinsicElements['div'];
/**
 * ColorBoard
 */
export type ColorBoardProps = {
    /** Current selected color */
    hsv: HSV;
    /** Event handler for specific xy is picked.
     * @param pos Position of picked. Each [x, y] is between 0.0 to 1.0.
     * @param init If true, this is down event, not move.
     * @returns If true or undefined, successfully color was picked, and capture the pointer.
     */
    onPick?: (x: number, y: number, init?: boolean) => boolean | void;
    /**
     * Color to position handler.
     * @param hsv Color to convert.
     * @returns Position of color. Each [x, y] is between 0.0 to 1.0.
     */
    colorToPos: (hsv: HSV) => [number, number];
    /** Pointer style */
    pointerStyle?: JSX.CSSProperties;
    /** Pointer class */
    pointerClass?: string;
} & JSX.IntrinsicElements['div'];
/**
 * Color board component
 * This is a wrapper of all color board.
 */
export declare const ColorBoard: Component<ColorBoardProps>;
