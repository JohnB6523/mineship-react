import * as React from "react"
import { Board } from "../Board"
import icon_ship_2 from "../../images/icon_ship_2.png"
import icon_ship_3 from "../../images/icon_ship_3.png"
import icon_ship_4 from "../../images/icon_ship_4.png"
import icon_ship_destroyed from "../../images/icon_ship_destroyed.png"
import rules_3r from "../../images/rules_3r.png"
import rules_3b_1ship from "../../images/rules_3b_1ship.png"
import rules_3b_2ship from "../../images/rules_3b_2ship.png"
import rules_3b_3ship from "../../images/rules_3b_3ship.png"

function initGame() {
	// Generate unrevealed tiles and tile Images
	let tiles = Array.from({length: 8}, () => Array.from({length: 8}, () => "tile_0"))
	let tileImages = Array.from({length: 8}, () => Array.from({length: 8}, () => "tile_unrevealed"))
	// Generate ships
	// Array of ships only used to track which have been destroyed
	let ships = []
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
		ships.push({ positions: newShip, destroyed: false })
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
	console.log(tiles)
	return {tileImages: tileImages, tiles: tiles, status: "", ships: ships}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = initGame()
	}

	handleClick(i, j) {
		// Nothing to do if already revealed, or game is finished
		if (this.state.tileImages[i][j] !== "tile_unrevealed" || this.state.status !== "") {
			return
		}
		let tileImages = this.state.tileImages.slice()
		let ships = this.state.ships.slice()
		tileImages[i][j] = this.state.tiles[i][j]
		if (this.state.tiles[i][j] === "tile_0") {
			// propagate reveals of zeros
			let revealedList = []
			let propagateQueue = [[i,j]]
			do {
				let tile = propagateQueue.shift()
				tileImages[tile[0]][tile[1]] = this.state.tiles[tile[0]][tile[1]]
				revealedList.push(tile)
				// If zero, add adjacent tiles to queue
				if (this.state.tiles[tile[0]][tile[1]] === "tile_0") {
					for (let i2 = Math.max(0,tile[0]-1); i2 < Math.min(8,tile[0]+2); i2++) {
						for (let j2 = Math.max(0,tile[1]-1); j2 < Math.min(8,tile[1]+2); j2++) {
							// Only add to queue if not already revealed and not already in queue
							let doNotPropagateList = revealedList.concat(propagateQueue)
							let doNotPropagate = false
							for (let dnpTile of doNotPropagateList) {
								if (dnpTile[0] === i2 && dnpTile[1] === j2) {
									doNotPropagate = true
								}
							}
							if (!doNotPropagate) {
								propagateQueue.push([i2,j2])
							}
						}
					}
				}
			} while (propagateQueue.length > 0)
			this.setState({tileImages: tileImages, tiles: this.state.tiles, status: this.state.status, ships: ships})
			return
		} else if (this.state.tiles[i][j] === "tile_mine") {
			// If mine, lose game
			let status = "You Lose!"
			this.setState({tileImages: this.state.tiles, tiles: this.state.tiles, status: status, ships: ships})
			return
		} else if (this.state.tiles[i][j].startsWith("tile_ship")) {
			// if ship piece, check if won
			let numShipPieces = 0
			for (let row of tileImages) {
				for (let tile of row) {
					if (tile.startsWith("tile_ship")) {
						numShipPieces++
					}
				}
			}
			// check if ship is destroyed and update icon
			for (let ship of ships) {
				let isDestroyed = ship.positions.map(([i,j]) => tileImages[i][j] === this.state.tiles[i][j]).reduce((cumul, next) => cumul && next)
				if (isDestroyed) {
					ship.destroyed = true
				}
			}
			// If all ship pieces revealed, win game, otherwise reveal clicked tile as normal
			if (numShipPieces === 9) {
				let status = "You Win!"
				this.setState({tileImages: this.state.tiles, tiles: this.state.tiles, status: status, ships: ships})
				return
			}
		}
		this.setState({tileImages: tileImages, tiles: this.state.tiles, status: this.state.status, ships: ships})
	}

	clickAll() {
		this.setState({tileImages: this.state.tiles, tiles: this.state.tiles, ships: this.state.ships})
	}

	render() {
		return (
			<div>
				<h1 className="title">MineShip</h1>
				<div className="boardDiv">
					<Board onClick={(i, j) => this.handleClick(i, j)} tileImages={this.state.tileImages} />
				</div>
				<div className="icons">
					<img className="icon" src={this.state.ships[0].destroyed ? icon_ship_destroyed : icon_ship_2} alt={this.state.ships[0].destroyed ? icon_ship_destroyed : icon_ship_2} />
					<img className="icon" src={this.state.ships[1].destroyed ? icon_ship_destroyed : icon_ship_3} alt={this.state.ships[1].destroyed ? icon_ship_destroyed : icon_ship_3} />
					<img className="icon" src={this.state.ships[2].destroyed ? icon_ship_destroyed : icon_ship_4} alt={this.state.ships[2].destroyed ? icon_ship_destroyed : icon_ship_4} />
				</div>
				<div className="menu">
					<button className="button" onClick={() => this.setState(initGame())}>New Game</button>
					<button className="button" onClick={() => document.getElementById("rulesModal").style.display = "block"}>Rules</button>
				</div>
				<div className="winLoseDiv">
					<span className="winLoseMessage" role="presentation" aria-label={ this.state.status }><b>{ this.state.status }</b></span>
				</div>
				<div id="rulesModal" className="modal" onClick={(event) => {let modal = document.getElementById("rulesModal"); if(event.target === modal) {modal.style.display = "none"}}}>
					<div className="modalContent" role="dialog">
						<span className="close" onClick={() => document.getElementById("rulesModal").style.display = "none"}>&times;</span>
						<div>
							<h2 className="rulesHeader">Rules</h2>
							<p>This game is inspired by Minesweeper and Battleship. The goal is to find all of the ships, without finding any of the mines. There are three ships, one that is 2 tiles long, one 3 tiles long and one 4 tiles long.</p>
							<p>When you click a tile, what's underneath will be revealed. This could be a segment of a ship, a mine, or a number. When a number is revealed, this tells you how many of the 8 surrounding tiles contain either a ship segment, or a mine. If a number is red, that means all the surrounding non-number tiles are mines. If it is blue, at least one of teh surrounding non-number tiles is a ship segment. For example, a red 3 means there are 3 mines in the surrounding tiles. A blue 3 could mean 2 mines and 1 ship segment, 1 mine and 2 ship segments, or 3 ship segments.</p>
							<div className="rulesImages">
								<img className="rulesImage" src={rules_3r} alt="3 mines surround the middle tile, so it is a red 3." />
								<img className="rulesImage" src={rules_3b_1ship} alt="2 mines and 1 ship piece produces a blue 3." />
								<img className="rulesImage" src={rules_3b_2ship} alt="1 mine and 2 ship pieces also produces a blue 3. Note the ship pieces aren't necessarily from the same ship." />
								<img className="rulesImage" src={rules_3b_3ship} alt="If you're lucky, a blue 3 could mean 3 ship pieces, and 0 mines." />
							</div>
							<p>If you manage to reveal all of the ship segments without revealing any mines, you win the game. If you're unlucky and reveal even a single mine, you'll lose. Whnever the game ends, win or lose, the rest of the board is revealed.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Game }