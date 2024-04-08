export const Legend = ({ xScale, circleRadius, currentPosition }: any) => {
	const legendWidth = 20;

	return (
		<>
		<polygon 
			points={`
				${xScale(currentPosition)} ${circleRadius * 2}, 
				${xScale(currentPosition) - 5} ${circleRadius * 3}, 
				${xScale(currentPosition) + 5} ${circleRadius * 3}
			`}
			fill="rgba(126, 126, 132, 1)"
		/>
		<rect
			x={xScale(currentPosition) - legendWidth}
			y={circleRadius * 3}
			rx={2}
			ry={2}
			width={legendWidth * 2}
			height={circleRadius * 3}
			fill="rgba(23, 23, 32, 1)"
			strokeWidth={2}
			stroke="rgba(126, 126, 132, 1)"
		>
		</rect>
		<text 
			x={xScale(currentPosition)} 
			y={circleRadius * 5} 
			fill="rgba(255, 255, 255, 1)" 
			textAnchor="middle"
			fontSize="0.8em"
		>
			{Math.round(currentPosition)}
		</text>
		</>
	)
}

Legend.displayName="Legend";