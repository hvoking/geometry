export const Background = ({ xScale, minBound, maxBound, innerHeight }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={0}
			width={xScale(maxBound) - xScale(minBound)}
			height={innerHeight}
			fill="rgba(48, 48, 48, 1)"
		/>
	)
}

Background.displayName="Background";