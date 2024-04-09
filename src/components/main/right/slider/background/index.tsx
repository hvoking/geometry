export const Background = ({ xScale, minBound, maxBound, circleRadius }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={0}
			width={xScale(maxBound) - xScale(minBound)}
			height={circleRadius * 2}
			fill="rgba(48, 48, 48, 1)"
		/>
	)
}

Background.displayName="Background";