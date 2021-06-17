import SaturationKnob from './SaturationKnob';

const Saturation = () => {
	const style = {
		width: "100%", 
		height: "100%", 
		background: "-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)"
	}
	return (
		<>
			<SaturationKnob />
			<div className="saturation-field">
				<div className="c" style={style}></div>
			</div>
		</>
	);
}

export default Saturation;