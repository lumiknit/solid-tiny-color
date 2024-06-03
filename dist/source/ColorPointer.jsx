import { mergeProps } from 'solid-js';
import { hsvToRGB, rgbToGrayscale, rgbToStyle } from './color';
const ColorPointer = (props_) => {
    const props = mergeProps({ size: '10px' }, props_);
    const rgb = () => hsvToRGB(props.hsv);
    return (<div class={props.class} style={{
            'pointer-events': 'none',
            position: 'absolute',
            left: `${props.pos[0] * 100}%`,
            top: `${props.pos[1] * 100}%`,
            width: props.size,
            height: props.size,
            border: `2px solid ${rgbToGrayscale(rgb()) > 127 ? 'black' : 'white'}`,
            'border-radius': '50%',
            transform: 'translate(-50%, -50%)',
            'background-color': rgbToStyle(rgb()),
            ...props.style,
        }}/>);
};
export default ColorPointer;
