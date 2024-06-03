import { splitProps } from 'solid-js';
import SLTriangle from './SLTriangle';
import HueWheel from './HueWheel';
import { styleAbsLT0, styleWH100 } from './style';
const HSLWheel = (props) => {
    const [local, divProps] = splitProps(props, [
        'rotate',
        'strokeWidth',
        'hsv',
        'onHSVChange',
        'children',
    ]);
    const rad = () => 50 * (0.99 - props.strokeWidth);
    return (<div {...divProps} style={{
            position: 'relative',
        }}>
			<HueWheel {...local} style={{
            ...styleAbsLT0,
            ...styleWH100,
        }}/>
			<SLTriangle {...local} style={{
            position: 'absolute',
            left: `${50 - rad() / 2}%`,
            top: `${50 - (rad() * Math.sqrt(3)) / 2}%`,
            width: `${rad() * 1.5}%`,
            height: `${rad() * Math.sqrt(3)}%`,
            transform: props.rotate
                ? `translate(-16.7%, 0) rotate(${props.hsv[0] - 90}deg) translate(16.7%, 0)`
                : 'none',
        }}/>
		</div>);
};
export default HSLWheel;
