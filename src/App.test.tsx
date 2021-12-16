import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

test('renders the title', () => {
    render(<App />)
    const linkElement = screen.getByText(/Space Loops/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders the search button', () => {
    render(<App />)
    const linkElement = screen.getByText(/SEARCH/i)
    expect(linkElement).toBeInTheDocument()
})

test('can search', async () => {
    render(<App />)
    const linkElement = screen.getByText(/SEARCH/i)
    fireEvent.click(linkElement)
    await waitFor(() => {
        const image = screen.getByAltText(
            'https://images-assets.nasa.gov/image/jsc2007e034221/jsc2007e034221~thumb.jpg'
        )
        expect(image).toBeTruthy()
    })
})
