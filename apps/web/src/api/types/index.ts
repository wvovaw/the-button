export interface SignUpRequestData {
  email: string
  name: string
  password: string
}
export interface SignUpResponseData {
  id: number
  email: string
  name: string
}
export interface SignInRequestData {
  email: string
  password: string
}
export interface SignInResponseData {
  accessToken: string
}
export interface PostRecordRequesData {
  highscore?: number
  peaks?: number[]
  clicks?: number
}
export interface RecordData {
  id: number
  highscore: number
  totalResets: number
  totalClicks: number
  average: number
  owner: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}
export interface RecordsPaginatedQuerystringData {
  page: number
  perPage: number
}
export interface RecordsPaginatedResponseData {
  data: RecordData[]
  meta: {
    page: number
    perPage: number
    itemsCount: number
  }
}
export interface StatisticsResponseData {
  totalClicks: number
  playersCount: number
  avgHighscore: number
}
