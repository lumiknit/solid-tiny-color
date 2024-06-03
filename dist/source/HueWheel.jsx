import { ColorBoard } from './ColorBoard';
import { gradHueConic, styleWH100 } from './style';
import { degToRad } from './utils';
const HueWheel = (props) => {
    return (<ColorBoard {...props} onPick={(x, y) => {
            const angle = Math.atan2(y - 0.5, x - 0.5) / degToRad;
            props.onHSVChange?.([(angle + 450) % 360, props.hsv[1], props.hsv[2]]);
        }} colorToPos={([h]) => {
            const angle = h * degToRad;
            const r = (1 - (100 * props.strokeWidth) / 200) / 2;
            return [0.5 + r * Math.sin(angle), 0.5 - r * Math.cos(angle)];
        }}>
			<div style={{
            ...styleWH100,
            'background-image': gradHueConic,
            'border-radius': '50%',
            'mask-image': `radial-gradient(closest-side circle at center,transparent ${99.5 - 100 * props.strokeWidth}%,black ${100 - 100 * props.strokeWidth}%)`,
        }}/>
		</ColorBoard>);
};
export default HueWheel;
