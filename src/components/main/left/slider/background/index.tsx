export const Background = ({ xScale, minBound, maxBound, circleRadius }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={circleRadius / 2}
			rx={circleRadius / 2}
			ry={circleRadius / 2}
			width={xScale(maxBound) - xScale(minBound)}
			height={circleRadius}
			fill="rgba(126, 126, 132, 0.4)"
		/>
	)
}

Background.displayName="Background";