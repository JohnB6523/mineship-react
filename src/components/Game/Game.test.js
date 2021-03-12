import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Game } from './Game'

describe('<Game /> tests', () => {
	it('should render a board', () => {
		const { container } = render(<Game />)
		expect(container.firstChild).toMatchSnapshot()
	})
})