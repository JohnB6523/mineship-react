import * as React from "react"
import tile_unrevealed from "../../images/tile_unrevealed.png"

function Tile(props) {
	return (
		<button className="tile" onClick={props.onClick}>
			<img src={tile_unrevealed} alt=""></img>
		</button>
	);
}

export { Tile }