import * as React from 'react'
import { Tile } from '../Tile'

class Board extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
					<tr>
						<td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td><td><Tile /></td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export { Board }