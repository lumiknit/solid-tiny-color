import { onMount } from 'solid-js';
import { ColorBoard } from './ColorBoard';
import { styleAbsLT0, styleWH100 } from './style';
import { hslToHSV, hsvToHSL } from './color';
import { cross } from './utils';
const renderSLTriangle = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    for (let sy = 0; sy < height; sy++) {
        const yr = sy / height;
        const w = Math.round(2 * width * Math.min(yr, 1 - yr));
        for (let sx = 0; sx < w; sx++) {
            const x = sx / width;
            const y = 1 - yr + x / 2;
            // Blend s
            const r = 255 * y;
            const gb = r * (1 - x / y);
            ctx.fillStyle = `rgb(${r},${gb},${gb})`;
            ctx.fillRect(sx, sy, 1, 1);
        }
        if (width - w > 0)
            ctx.fillRect(w, sy, width - w, 1);
    }
};
const SLTriangle = (props) => {
    let canvasRef;
    const hue = () => props.hsv[0];
    onMount(() => {
        // Render Red + SV Triangle
        const ctx = canvasRef.getContext('2d');
        if (ctx)
            renderSLTriangle(ctx, canvasRef.width, canvasRef.height);
    });
    const cp = 'polygon(0 0, 0 100%, 100% 50%)';
    return (<ColorBoard {...props} style={{
            ...(typeof props.style === 'object' ? props.style : {}),
            'clip-path': cp,
        }} onPick={(x, y, init) => {
            let w = 2 * cross(y);
            if (x > w) {
                if (init)
                    return false;
                // Find the nearest point on the edge
                // Distance from the edge
                const dx = x - w;
                x -= dx * 0.3;
                if (y > 0.5)
                    y -= dx * 0.35;
                else
                    y += dx * 0.35;
                w = 2 * cross(y);
            }
            if (w > 0)
                x /= w;
            const newHSL = [props.hsv[0], x, 1 - y];
            props.onHSVChange?.(hslToHSV(newHSL));
            return true;
        }} colorToPos={(hsv) => {
            const [, s, l] = hsvToHSL(hsv);
            return [2 * cross(l) * s, 1 - l];
        }}>
			<canvas ref={canvasRef} width={32} height={32} style={{
            ...styleWH100,
            ...styleAbsLT0,
            'clip-path': cp,
            filter: `hue-rotate(${hue()}deg)`,
        }}/>
		</ColorBoard>);
};
export default SLTriangle;
