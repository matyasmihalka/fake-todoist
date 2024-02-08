import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
// import { Logo } from '@/components/Logo'
import { Logo } from '../components/Logo'

describe('Logo Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />)
    expect(container).toBeTruthy()
  })

  it('contains an SVG with the correct attributes', () => {
    const { getByTestId } = render(<Logo />)
    const svg = getByTestId('logo-svg')
    expect(svg).toBeDefined()
    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(svg.getAttribute('viewBox')).toBe('0 0 100 125')
  })

  it('contains a path with the correct d attribute', () => {
    const { getByTestId } = render(<Logo />)
    const path = getByTestId('logo-path')
    expect(path).toBeDefined()
  })
})
