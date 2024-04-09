export const Foreground = ({ activeForeground, xScale, minBound, currentPosition, circleRadius }: any) => {
	return (
		<rect
			x={xScale(minBound)}
			y={0}
			width={xScale(currentPosition) - xScale(minBound)}
			height={circleRadius * 2}
			fill={"rgba(0, 120, 120, 0.6)"}
		/>
	)
}

Foreground.displayName="Foreground";