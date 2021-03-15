import * as React from "react"
// Image imports, all attempts at cleaner ways of doing this have failed
import tile_unrevealed from "../../images/tile_unrevealed.png"
import tile_mine from "../../images/tile_mine.png"
import tile_0 from "../../images/tile_0.png"
import tile_1b from "../../images/tile_1b.png"
import tile_1r from "../../images/tile_1r.png"
import tile_2b from "../../images/tile_2b.png"
import tile_2r from "../../images/tile_2r.png"
import tile_3b from "../../images/tile_3b.png"
import tile_3r from "../../images/tile_3r.png"
import tile_4b from "../../images/tile_4b.png"
import tile_4r from "../../images/tile_4r.png"
import tile_5b from "../../images/tile_5b.png"
import tile_5r from "../../images/tile_5r.png"
import tile_6b from "../../images/tile_6b.png"
import tile_6r from "../../images/tile_6r.png"
import tile_7b from "../../images/tile_7b.png"
import tile_7r from "../../images/tile_7r.png"
import tile_8b from "../../images/tile_8b.png"
import tile_8r from "../../images/tile_8r.png"
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
	tile_1b: tile_1b,
	tile_1r: tile_1r,
	tile_2b: tile_2b,
	tile_2r: tile_2r,
	tile_3b: tile_3b,
	tile_3r: tile_3r,
	tile_4b: tile_4b,
	tile_4r: tile_4r,
	tile_5b: tile_5b,
	tile_5r: tile_5r,
	tile_6b: tile_6b,
	tile_6r: tile_6r,
	tile_7b: tile_7b,
	tile_7r: tile_7r,
	tile_8b: tile_8b,
	tile_8r: tile_8r,
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