import { splitProps } from 'solid-js';
import { styleNoTouchAction } from './style';
import ColorPointer from './ColorPointer';
import { clamp } from './utils';
/**
 * Color board component
 * This is a wrapper of all color board.
 */
export const ColorBoard = (props) => {
    let ref;
    const [locals, others] = splitProps(props, [
        'hsv',
        'onPick',
        'colorToPos',
        'pointerStyle',
        'pointerClass',
    ]);
    const handlePointerEvent = (e) => {
        if (!props.onPick || e.buttons === 0)
            return;
        // Check pointer is down
        const x = clamp(e.offsetX / e.currentTarget.offsetWidth, 0, 1), y = clamp(e.offsetY / e.currentTarget.offsetHeight, 0, 1);
        if (props.onPick(x, y, e.type === 'pointerdown') !== false) {
            ref.setPointerCapture(e.pointerId);
        }
        else {
            ref.releasePointerCapture(e.pointerId);
        }
    };
    return (<div {...others} ref={ref} style={{
            position: 'relative',
            ...styleNoTouchAction,
            ...(typeof props.style === 'object' ? props.style : {}),
        }} onPointerDown={handlePointerEvent} onPointerMove={handlePointerEvent}>
			{props.children}
			<ColorPointer pos={props.colorToPos(props.hsv)} hsv={props.hsv} style={locals.pointerStyle} class={locals.pointerClass}/>
		</div>);
};
