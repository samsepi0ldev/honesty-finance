export type Transaction = {
  id: string
  category: string
  description: string
  attachment?: string
  created_at: Date
  value: number
  type: string
  wallet: { name: string }
}
