import type { AxiosPromise } from 'axios'

import httpClient from '@/http/httpClient'

import type { Image } from '@/models/image.type'
import type { ImageRequest } from '@/models/request/imageRequest.type'
import type { ImageList } from '@/models/image-list.type'

export class ImageService {
  getAll(offset: number, limit: number, filter: string): AxiosPromise<ImageList> {
    return httpClient.get(`/images?offset=${offset}&limit=${limit}&filter=${filter}`)
  }

  getById(uuid: string, userUuid: string | undefined): AxiosPromise<Image> {
    if (userUuid === undefined)
      return httpClient.get(`/images/${uuid}`)

    return httpClient.get(`/images/${uuid}?userUuid=${userUuid}`)
  }

  getAllByUserId(uuid: string, offset: number, limit: number): AxiosPromise<ImageList> {
    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.get(`/images/user/${uuid}?offset=${offset}&limit=${limit}`, config)
  }

  addImage(imageRequest: ImageRequest): AxiosPromise<Image> {
    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.post('/images', imageRequest, config)
  }

  deleteImage(uuid: string): AxiosPromise<string> {
    const config = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
    return httpClient.delete(`/images/${uuid}`, config)
  }
}
