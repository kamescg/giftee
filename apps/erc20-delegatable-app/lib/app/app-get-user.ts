import axios from 'axios'

export async function appGetUser(issuerAddress: string): Promise<
  | {
      content?: any
      object: 'User'
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/user/get', {
      params: {
        issuerAddress,
      },
    })
    return data
  } catch (error: any) {
    throw error
  }
}
