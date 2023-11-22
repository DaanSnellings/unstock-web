import type { AxiosPromise } from 'axios'
import { Cloudinary } from '@cloudinary/url-gen'
import axios from 'axios'

export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  },
})

export class CloudinaryService {
  uploadImage(image: File): AxiosPromise<any> {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'unstockphotos')
    return axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    )
  }
}
