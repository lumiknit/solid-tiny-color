import { Component, onMount } from 'solid-js';
import { ColorBoard, ColorProps } from './ColorBoard';
import { styleWH100 } from './style';
import { HSL, hslToHSV, hsvToHSL } from './color';

const renderSLTriangle = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
) => {
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
		if (width - w > 0) ctx.fillRect(w, sy, width - w, 1);
	}
};

const SLTriangle: Component<ColorProps> = (props) => {
	let canvasRef: HTMLCanvasElement;

	const hue = () => props.hsv[0];

	onMount(() => {
		// Render Red + SV Triangle
		const ctx = canvasRef.getContext('2d');
		if (ctx) renderSLTriangle(ctx, canvasRef.width, canvasRef.height);
	});

	return (
		<ColorBoard
			{...props}
			style={{
				...(typeof props.style === 'object' ? props.style : {}),
				'clip-path': 'polygon(0 0, 0 100%, 100% 50%)',
			}}
			onPick={(x, y, init) => {
				let w = 2 * Math.min(y, 1 - y);
				if (x > w) {
					if(init) return false;
					// Find the nearest point on the edge
					// Distance from the edge
					const dx = x - w;
					x -= dx * 0.3;
					if (y > 0.5) y -= dx * 0.35;
					else y += dx * 0.35;
					w = 2 * Math.min(y, 1 - y);
				}
				if (w > 0) x /= w;
				const newHSL: HSL = [props.hsv[0], x, 1 - y];
				props.onHSVChange?.(hslToHSV(newHSL));
				return true;
			}}
			colorToPos={(hsv) => {
				const [, s, l] = hsvToHSL(hsv);
				return [2 * Math.min(l, 1 - l) * s, 1 - l];
			}}
		>
			<canvas
				ref={canvasRef!}
				width={32}
				height={32}
				style={{
					...styleWH100,
					position: 'absolute',
					left: 0,
					top: 0,
					'clip-path': 'polygon(0 0, 0 100%, 100% 50%)',
					filter: `hue-rotate(${hue()}deg)`,
				}}
			/>
		</ColorBoard>
	);
};

export default SLTriangle;
