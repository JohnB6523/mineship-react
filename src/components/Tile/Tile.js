import * as React from "react"
// Image imports, all attempts at cleaner ways of doing this have failed
import tile_unrevealed from "../../images/tile_unrevealed.png"
import tile_mine from "../../images/tile_mine.png"
import tile_0 from "../../images/tile_0.png"
import tile_ship_front_u from "../../images/tile_ship_front_u.png"
import tile_ship_front_d from "../../images/tile_ship_front_d.png"
import tile_ship_front_l from "../../images/tile_ship_front_l.png"
import tile_ship_front_r from "../../images/tile_ship_front_r.png"
import tile_ship_middle_u from "../../images/tile_ship_middle_u.png"
import tile_ship_middle_d from "../../images/tile_ship_middle_d.png"
import tile_ship_middle_l from "../../images/tile_ship_middle_l.png"
import tile_ship_middle_r from "../../images/tile_ship_middle_r.png"
import tile_ship_end_u from "../../images/tile_ship_end_u.png"
import tile_ship_end_d from "../../images/tile_ship_end_d.png"
import tile_ship_end_l from "../../images/tile_ship_end_l.png"
import tile_ship_end_r from "../../images/tile_ship_end_r.png"

let images = {
	tile_unrevealed: tile_unrevealed,
	tile_mine: tile_mine,
	tile_0: tile_0,
	tile_ship_front_u: tile_ship_front_u,
	tile_ship_front_d: tile_ship_front_d,
	tile_ship_front_l: tile_ship_front_l,
	tile_ship_front_r: tile_ship_front_r,
	tile_ship_middle_u: tile_ship_middle_u,
	tile_ship_middle_d: tile_ship_middle_d,
	tile_ship_middle_l: tile_ship_middle_l,
	tile_ship_middle_r: tile_ship_middle_r,
	tile_ship_end_u: tile_ship_end_u,
	tile_ship_end_d: tile_ship_end_d,
	tile_ship_end_l: tile_ship_end_l,
	tile_ship_end_r: tile_ship_end_r
}

function Tile(props) {
	return (
		<button className="tile" onClick={props.onClick}>
			<img src={images[props.image]} alt={props.image}></img>
		</button>
	);
}
Tile.defaultProps = {
	image: "tile_unrevealed"
}

export { Tile }