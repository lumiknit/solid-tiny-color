import { Component, JSX, splitProps } from 'solid-js';
import { HSV } from './color';
import { styleNoTouchAction } from './style';
import ColorPointer from './ColorPointer';
import { clamp } from './utils';

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
export const ColorBoard: Component<ColorBoardProps> = (props) => {
	let ref: HTMLDivElement;
	const [locals, others] = splitProps(props, [
		'hsv',
		'onPick',
		'colorToPos',
		'pointerStyle',
		'pointerClass',
	]);
	const handlePointerEvent: JSX.EventHandler<HTMLDivElement, PointerEvent> = (
		e
	) => {
		if (!props.onPick || e.buttons === 0) return;
		// Check pointer is down
		const x = clamp(e.offsetX / e.currentTarget.offsetWidth, 0, 1),
			y = clamp(e.offsetY / e.currentTarget.offsetHeight, 0, 1);
		if (props.onPick(x, y, e.type === 'pointerdown') !== false) {
			ref.setPointerCapture(e.pointerId);
		} else {
			ref.releasePointerCapture(e.pointerId);
		}
	};
	return (
		<div
			{...others}
			ref={ref!}
			style={{
				position: 'relative',
				...styleNoTouchAction,
				...(typeof props.style === 'object' ? props.style : {}),
			}}
			onPointerDown={handlePointerEvent}
			onPointerMove={handlePointerEvent}
		>
			{props.children}
			<ColorPointer
				pos={props.colorToPos(props.hsv)}
				hsv={props.hsv}
				style={locals.pointerStyle}
				class={locals.pointerClass}
			/>
		</div>
	);
};
