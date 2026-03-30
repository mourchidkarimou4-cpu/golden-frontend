import type { AxiosError } from 'axios'

export function isAxiosError(err: unknown): err is AxiosError {
  return typeof err === 'object' && err !== null && 'response' in err
}

export function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as Record<string, unknown> | undefined
    if (data?.detail) return String(data.detail)
    if (data?.message) return String(data.message)
    return JSON.stringify(data)
  }
  return 'Une erreur est survenue'
}
