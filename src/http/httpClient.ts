import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { AuthService } from '@/services/auth.service'
import { useToastStore } from '@/stores/toast.store'

const HTTP_STATUS_UNAUTHENTICATED = 401
const HTTP_STATUS_FORBIDDEN = 403
const ERR_NETWORK = 'ERR_NETWORK'
const EMPTY_ERROR = ''

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL?.toString() || '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const authStore = useAuthStore()
  const authTokens = authStore.authTokens
  if (!!authTokens?.token_type && !!authTokens?.access_token && !!config?.headers)
    config.headers.Authorization = `${authTokens.token_type} ${authTokens.access_token}`

  return config
})

async function handleRefreshFailedError(): Promise<void> {
  const authStore = useAuthStore()
  authStore.clearTokens()
}

interface FailedQueuePromise {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedQueuePromise[] = []

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((prom) => {
    if (error)
      prom.reject(error)

    else
      prom.resolve(token)
  })

  failedQueue = []
}

httpClient.interceptors.response.use(
  response => response,
  (err) => {
    const originalRequest = err.config

    if (err?.response?.status === HTTP_STATUS_UNAUTHENTICATED && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            }
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const authStore = useAuthStore()
      const authService = new AuthService()

      return new Promise((resolve) => {
        authService
          .refresh(authStore.authTokens?.refresh_token)
          .then(({ data }) => {
            axios.defaults.headers.common = {
              ...axios.defaults.headers.common,
              Authorization: `${data.token_type} ${data.access_token}`,
            }
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `${data.token_type} ${data.access_token}`,
            }

            authStore.setAuthTokens(data)
            processQueue(null, data.access_token)
            resolve(axios(originalRequest))
          })
          .catch(async (error: any) => {
            await handleRefreshFailedError(error)
          })
          .then(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(err)
  },
)

httpClient.interceptors.response.use(
  response => response,
  (error) => {
    const toastStore = useToastStore()
    if (error?.response?.status === HTTP_STATUS_FORBIDDEN) {
      toastStore.pushErrorMessage('No Permission')
      return EMPTY_ERROR
    }

    if (error?.code === ERR_NETWORK) {
      toastStore.pushErrorMessage('Network Error')
      return EMPTY_ERROR
    }

    return Promise.reject(error)
  },
)

export default httpClient
