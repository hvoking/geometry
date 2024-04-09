export const Handler = ({ cx, cy, r }: any) => {
	return (
		<rect
            x={cx - 10} 
            y={cy - r}
            width={20} 
            height={2 * r}
            fill="rgba(255, 255, 255, 1)"
            strokeWidth={0}
        />
	)
}

Handler.displayName="Handler";