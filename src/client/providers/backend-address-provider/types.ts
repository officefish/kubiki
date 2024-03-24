export interface IBackendAddressState {
  host: string
  port: number
}

export interface IBackendAddressActions {
  setHost: (host: string) => void
  setPort: (port: number) => void
}
