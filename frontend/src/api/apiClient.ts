export interface HelloResponse {
  message: string
}

export async function getHello(name?: string): Promise<HelloResponse> {
  const url = name ? `/api/hello?name=${encodeURIComponent(name)}` : '/api/hello'
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('The backend request failed.')
  }

  return response.json() as Promise<HelloResponse>
}
