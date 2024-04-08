export const Handler = ({ cx, cy, r }: any) => {
	return (
		<circle 
          cx={cx} 
          cy={r} 
          r={r - 1} 
          fill="rgba(255, 255, 255, 1)"
          strokeWidth={0}
        />
	)
}

Handler.displayName="Handler";