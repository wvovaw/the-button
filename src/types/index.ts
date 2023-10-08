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
}
export type UserProfile = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
}