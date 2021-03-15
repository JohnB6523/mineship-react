import * as React from "react"
import { Board } from "../Board"
import { NewGameButton } from "../NewGameButton/NewGameButton"

function initGame() {
	// Generate unrevealed tiles and tile Images
	let tiles = Array.from({length: 8}, () => Array.from({length: 8}, () => "tile_0"))
	let tileImages = Array.from({length: 8}, () => Array.from({length: 8}, () => "tile_unrevealed"))
	// Generate ships
	let directions = ["u", "r", "d", "l"]
	for (let i = 0; i < 3; i++) {
		// Direction ship is pointing: Up is 0, Right is 1, Down is 2, Left is 3
		let shipDirection = directions[Math.floor(Math.random() * 4)]
		let shipAddPieces = i + 1
		let newShip = []
		let spacesEmpty = true
		// Generate ship positions until empty spots found
		do {
			spacesEmpty = true
			newShip = [[Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]]
			switch(shipDirection) {
				case "u":
					// Bounds check, if fails, continues the do-while loop
					if (newShip[0][0] + shipAddPieces > 7) {
						spacesEmpty = false
						continue;
					}
					// Ship points up, so next piece increments y-axis
					for (let j = 0; j < shipAddPieces; j++) {
						newShip.push([newShip[j][0] + 1, newShip[j][1]])
					}
					break;
				case "r":
					// Bounds check, if fails, continues the do-while loop
					if (newShip[0][1] - shipAddPieces < 0) {
						spacesEmpty = false
						continue;
					}
					// Ship points right, so next piece decrements x-axis
					for (let j = 0; j < shipAddPieces; j++) {
						newShip.push([newShip[j][0], newShip[j][1] - 1])
					}
					break;
				case "d":
					// Bounds check, if fails, continues the do-while loop
					if (newShip[0][0] - shipAddPieces < 0) {
						spacesEmpty = false
						continue;
					}
					// Ship points down, so next piece decrements y-axis
					for (let j = 0; j < shipAddPieces; j++) {
						newShip.push([newShip[j][0] - 1, newShip[j][1]])
					}
					break;
				case "l":
					// Bounds check, if fails, continues the do-while loop
					if (newShip[0][1] + shipAddPieces > 7) {
						spacesEmpty = false
						continue;
					}
					// Ship points up, so next piece increments x-axis
					for (let j = 0; j < shipAddPieces; j++) {
						newShip.push([newShip[j][0], newShip[j][1] + 1])
					}
					break;
				default:
					// Only here to prevent warning, should be impossible to reach
					console.log("Ship Direction default branch reached")
			}
			// Check none of ship piece locations already filled
			for (let newShipPiece of newShip) {
				if (tiles[newShipPiece[0]][newShipPiece[1]] !== "tile_0") {
					spacesEmpty = false
					break;
				}
			}
		} while (!spacesEmpty)
		// Place ship in tiles
		for (let k = 0; k < newShip.length; k++) {
			// First ship piece is front, last is end, in-between pieces are middle
			switch (k) {
				case 0:
					tiles[newShip[k][0]][newShip[k][1]] = "tile_ship_front_" + shipDirection
					break;
				case newShip.length - 1:
					tiles[newShip[k][0]][newShip[k][1]] = "tile_ship_end_" + shipDirection
					break;
				default:
					tiles[newShip[k][0]][newShip[k][1]] = "tile_ship_middle_" + shipDirection
			}
		}
	}
	// Generate 10 mines
	for (let i = 0; i < 10; i++) {
		let spaceEmpty = true
		let newMine = []
		// Generate mine position until empty position found
		do {
			spaceEmpty = true
			newMine = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
			if (tiles[newMine[0]][newMine[1]] !== "tile_0") {
				spaceEmpty = false
			}
		} while (!spaceEmpty)
		// Place mine in tiles
		tiles[newMine[0]][newMine[1]] = "tile_mine"
	}
	// Generate numbers
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			// Skips mines and ship pieces
			if (tiles[i][j] !== "tile_0") {
				continue
			}
			// Get surrounding tiles, with bounds check
			let surroundArea = tiles.map(row => row.slice(Math.max(0,j-1), Math.min(8,j+2))).slice(Math.max(0,i-1), Math.min(8,i+2))
			let surroundTiles = surroundArea.reduce((cumul, arr) => cumul.concat(arr))
			// Count pieces and check if any ship pieces
			let numPieces = 0
			let blue = false
			for (let tile of surroundTiles) {
				if (tile === "tile_mine") {
					numPieces++
				} else if (tile.startsWith("tile_ship")) {
					numPieces++
					blue = true
				}
			}
			// Update, if not 0
			if (numPieces > 0) {
				tiles[i][j] = "tile_" + numPieces + (blue ? "b" : "r")
			}
		}
	}
	// console.log(tiles)
	return {tileImages: tileImages, tiles: tiles}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = initGame()
	}

	handleClick(i, j) {
		// Nothing to do if already revealed
		if (this.state.tileImages[i][j] !== "tile_unrevealed") {
			return
		}
		let tileImages = this.state.tileImages.slice()
		tileImages[i][j] = this.state.tiles[i][j]
		this.setState({tileImages: tileImages, tiles: this.state.tiles})
	}

	clickAll() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				this.handleClick(i,j)
			}
		}
	}

	render() {
		return (
			<div>
				<Board onClick={(i, j) => this.handleClick(i, j)} tileImages={this.state.tileImages} />
				<NewGameButton onClick={() => this.setState(initGame())} />
				<button onClick={() => this.clickAll()}>Clear All</button>
			</div>
		);
	}
}

export { Game }