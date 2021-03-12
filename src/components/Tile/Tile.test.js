import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Tile } from './Tile'

describe('<Tile /> tests', () => {
	it('should render as default button', () => {
		const { container } = render(<Tile />)
		expect(container.firstChild).toMatchSnapshot()
	})
})