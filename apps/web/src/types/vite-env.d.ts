/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SIGNATURE_SECRET: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_CLIENT_SECRET: string
  readonly VITE_GOOGLE_REDIRECT_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
