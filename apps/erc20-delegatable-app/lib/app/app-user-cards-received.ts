import axios from 'axios'

export async function appUserCardsReceived(): Promise<
  | {
      content?: Array<any>
      object: 'Cards'
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/received')
    return data
  } catch (error: any) {
    throw error
  }
}
