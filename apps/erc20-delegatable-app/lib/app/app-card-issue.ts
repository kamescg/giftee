import axios from 'axios'

export async function appCardIssue(card: any): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.post('/api/issue', {
      ...card,
    })
    return data
  } catch (error: any) {
    throw error
  }
}
