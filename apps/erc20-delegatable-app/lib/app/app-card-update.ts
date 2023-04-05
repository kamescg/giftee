import axios from 'axios'

export async function appCardUpdate(card: any): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.post('/api/update', {
      ...card,
    })
    return data
  } catch (error: any) {
    throw error
  }
}
