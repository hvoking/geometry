export const Foreground = ({ xScale, minBound, currentPosition, innerHeight }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={0}
			width={xScale(currentPosition) - xScale(minBound)}
			height={innerHeight}
			fill={"rgba(0, 120, 120, 0.6)"}
		/>
	)
}

Foreground.displayName="Foreground";