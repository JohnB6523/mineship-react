import * as React from "react"
import tile_unrevealed from "../../images/tile_unrevealed.png"
import tile_mine from "../../images/tile_mine.png"
import tile_0 from "../../images/tile_0.png"

function Tile(props) {
	let images = {
		Unrevealed: tile_unrevealed,
		Mine: tile_mine,
		0: tile_0
	}

	return (
		<button className="tile" onClick={props.onClick}>
			<img src={images[props.image]} alt={props.image}></img>
		</button>
	);
}
Tile.defaultProps = {
	image: "Unrevealed"
}

export { Tile }