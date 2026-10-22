export interface HelloResponse {
  message: string
}

export async function getHello(): Promise<HelloResponse> {
  const response = await fetch('/api/hello')

  if (!response.ok) {
    throw new Error('The backend request failed.')
  }

  return response.json() as Promise<HelloResponse>
}

export async function sayHello(name: string): Promise<HelloResponse> {
  const response = await fetch('/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error('The backend request failed.')
  }

  return response.json() as Promise<HelloResponse>
}

export async function saveCosmetic(cosmeticName: string): Promise<HelloResponse> {
  const response = await fetch('/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: cosmeticName }),
  })

  if (!response.ok) {
    throw new Error('The backend request failed.')
  }

  return response.json() as Promise<HelloResponse>
}
