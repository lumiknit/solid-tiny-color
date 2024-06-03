import { splitProps } from 'solid-js';
import SVSquare from './SVSquare';
import HueWheel from './HueWheel';
import { styleAbsLT0, styleWH100 } from './style';
const HSVWheel = (props) => {
    const [local, divProps] = splitProps(props, [
        'rotate',
        'strokeWidth',
        'hsv',
        'onHSVChange',
        'children',
    ]);
    const squareWidth = () => (100 * (0.99 - props.strokeWidth)) / Math.sqrt(2);
    return (<div {...divProps} style={{
            position: 'relative',
        }}>
			<HueWheel {...local} style={{
            ...styleAbsLT0,
            ...styleWH100,
        }}/>
			<SVSquare {...local} style={{
            position: 'absolute',
            left: `${(100 - squareWidth()) / 2}%`,
            top: `${(100 - squareWidth()) / 2}%`,
            width: `${squareWidth()}%`,
            height: `${squareWidth()}%`,
            transform: props.rotate ? `rotate(${props.hsv[0] - 45}deg)` : 'none',
        }}/>
		</div>);
};
export default HSVWheel;
