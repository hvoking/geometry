import { useGeometry } from '../Context/geometry'

const Items = () => {
	const {toogleGeometry} = useGeometry();
	const onClick = (e: any) => {
		e.preventDefault()
		toogleGeometry(e.currentTarget.innerHTML)
	}
	return (
		<div className="items">
			<ul className="nav navbar-nav">
			<li className="dropdown">
				<a className="dropdown-toggle" data-toggle="dropdown" href="/frontend">Geometry
				<span className="caret"></span></a>
				<ul className="dropdown-menu">
				  <li><a onClick={onClick} className="geometry" href="/frontend">Sphere</a></li>
				  <li><a onClick={onClick} className="geometry" href="/frontend">Cube</a></li>
				  <li><a onClick={onClick} className="geometry" href="/frontend">Cylinder</a></li>
				  <li><a onClick={onClick} className="geometry" href="/frontend">Equation1</a></li>
				</ul>
			</li>
			<li><a href="/frontend">Items</a></li>
			<li><a href="/frontend">Material</a></li>
			</ul>
		</div>
	)
}

Items.displayName="Items";
export default Items;