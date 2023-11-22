import type { AxiosPromise } from 'axios'
import httpClient from '@/http/httpClient'
import type { RegisterRequest } from '@/models/request/registerRequest.type'
import { encodeQueryData } from '@/util/encode-query-data.util'

export class AuthService {
  register(email: string, password: string, firstName: string, lastName: string): AxiosPromise<any> {
    const registerRequest: RegisterRequest = {
      email,
      password,
      firstName,
      lastName,
    }

    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.post('/users', registerRequest, config)
  }

  login(email: string, password: string): AxiosPromise<any> {
    const formData = encodeQueryData({
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      username: email,
      password,
      grant_type: import.meta.env.VITE_GRANT_TYPE,
      scope: import.meta.env.VITE_SCOPE,
    })

    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return httpClient.post('/auth/token', formData, config)
  }

  getUserInfo(): AxiosPromise<any> {
    return httpClient.get('/auth/userinfo')
  }

  getUser(uuid: string | undefined): AxiosPromise<any> {
    return httpClient.get(`/users/${uuid}`)
  }

  refresh(refreshToken: string): AxiosPromise<any> {
    const formData = encodeQueryData({
      refresh_token: refreshToken,
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
    })

    const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    return httpClient.post('/auth/token', formData, config)
  }
}
