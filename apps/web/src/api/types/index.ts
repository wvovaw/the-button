export interface GetGoogleOauthUrlResponse {
  url: string
}

export interface UserProfile {
  id: number
  name: string
  email: string
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
