import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HelloPage } from './HelloPage'

describe('HelloPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a loading message while the request is in progress', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    render(<HelloPage />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading message from the backend')
  })

  it('shows the message returned by the backend', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Hello from the skincare backend' }),
      }),
    )

    render(<HelloPage />)

    expect(await screen.findByText('Hello from the skincare backend')).toBeInTheDocument()
  })

  it('shows an error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    render(<HelloPage />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the backend message')
  })
})
