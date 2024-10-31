export type SignUpRequestData = {
  email: string;
  name: string;
  password: string;
};
export type SignUpResponseData = {
  id: number;
  email: string;
  name: string;
};
export type SignInRequestData = {
  email: string;
  password: string;
};
export type SignInResponseData = {
  accessToken: string;
};
export type PostRecordRequesData = {
  highscore?: number;
  peaks?: number[];
  clicks?: number;
};
export type RecordData = {
  id: number;
  highscore: number;
  totalResets: number;
  totalClicks: number;
  average: number;
  owner: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};
export type RecordsPaginatedQuerystringData = {
  page: number;
  perPage: number;
};
export type RecordsPaginatedResponseData = {
  data: RecordData[];
  meta: {
    page: number;
    perPage: number;
    itemsCount: number;
  };
};
export type StatisticsResponseData = {
  totalClicks: number;
  playersCount: number;
  avgHighscore: number;
}