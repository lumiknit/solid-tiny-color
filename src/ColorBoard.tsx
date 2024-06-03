import { Component, JSX, splitProps } from 'solid-js';
import { HSV } from './color';
import { styleNoTouchAction } from './style';
import ColorPointer from './ColorPointer';

export type ColorProps = {
	/** Current selected color */
	hsv: HSV;

	/** Event handler for color is picked.
	 * @param hsl Picked color.
	 */
	onHSVChange?: (hsv: HSV) => void;
} & JSX.IntrinsicElements['div'];

/**
 * ColorBoard
 */
export type ColorBoardProps = {
	/** Current selected color */
	hsv: HSV;

	/** Event handler for specific xy is picked.
	 * @param pos Position of picked. Each [x, y] is between 0.0 to 1.0.
	 */
	onPick?: (x: number, y: number) => void;

	/**
	 * Color to position handler.
	 * @param hsv Color to convert.
	 * @returns Position of color. Each [x, y] is between 0.0 to 1.0.
	 */
	colorToPos: (hsv: HSV) => [number, number];
} & JSX.IntrinsicElements['div'];

/**
 * Color board component
 * This is a wrapper of all color board.
 */
export const ColorBoard: Component<ColorBoardProps> = (props) => {
	let ref: HTMLDivElement;
	const [, others] = splitProps(props, ['hsv', 'onPick', 'colorToPos']);
	const handlePointerEvent: JSX.EventHandler<HTMLDivElement, PointerEvent> = (
		e
	) => {
		if (props.onPick) {
			// Check pointer is down
			if (e.buttons === 0) return;
			ref.setPointerCapture(e.pointerId);
			const rect = (e.target as HTMLElement).getBoundingClientRect();
			const x = Math.min(
				1,
				Math.max(0, e.offsetX / e.currentTarget.offsetWidth)
			);
			const y = Math.min(
				1,
				Math.max(0, e.offsetY / e.currentTarget.offsetHeight)
			);
			props.onPick(x, y);
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
				x={props.colorToPos(props.hsv)[0]}
				y={props.colorToPos(props.hsv)[1]}
				hsv={props.hsv}
			/>
		</div>
	);
};
