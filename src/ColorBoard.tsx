import { Component, JSX, splitProps } from 'solid-js';
import { RGB } from './color';
import { styleNoTouchAction } from './style';
import ColorPointer from './ColorPointer';

export type ColorProps = {
	/** Current selected color */
	rgb: RGB;

	/** Event handler for color is picked.
	 * @param rgb Color picked.
	 */
	onRGBChange?: (rgb: RGB) => void;
} & JSX.IntrinsicElements['div'];

/**
 * ColorBoard
 */
export type ColorBoardProps = {
	/** Current selected color */
	rgb: RGB;

	/** Event handler for specific xy is picked.
	 * @param pos Position of picked. Each [x, y] is between 0.0 to 1.0.
	 */
	onPick?: (x: number, y: number) => void;

	/**
	 * Color to position handler.
	 * @param rgb Color to convert.
	 * @returns Position of color. Each [x, y] is between 0.0 to 1.0.
	 */
	colorToPos: (rgb: RGB) => [number, number];
} & JSX.IntrinsicElements['div'];

/**
 * Color board component
 * This is a wrapper of all color board.
 */
export const ColorBoard: Component<ColorBoardProps> = (props) => {
	let ref: HTMLDivElement;
	const [, others] = splitProps(props, ['rgb', 'onPick', 'colorToPos']);
	const handlePointerEvent = (e: PointerEvent) => {
		if (props.onPick) {
			// Check pointer is down
			if (e.buttons === 0) return;
			ref.setPointerCapture(e.pointerId);
			const rect = (e.target as HTMLElement).getBoundingClientRect();
			const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
			const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
			props.onPick(x, y);
		}
	};
	return (
		<div
			{...others}
			ref={ref!}
			style={{
				...styleNoTouchAction,
				position: 'relative',
			}}
			onPointerDown={handlePointerEvent}
			onPointerMove={handlePointerEvent}
		>
			{props.children}
			<ColorPointer
				x={props.colorToPos(props.rgb)[0]}
				y={props.colorToPos(props.rgb)[1]}
				rgb={props.rgb}
			/>
		</div>
	);
};
