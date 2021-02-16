import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Photos text', () => {
  render(<App />)
  const elem = screen.getByText(/Photos/i)
  expect(elem).toBeInTheDocument()
})
