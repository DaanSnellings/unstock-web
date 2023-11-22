import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.store'
import { useToastStore } from './toast.store'
import { ImageService } from '@/services/image.service'
import { CloudinaryService } from '@/services/cloudinary.service'
import type { Image } from '@/models/image.type'
import type { ImageRequest } from '@/models/request/imageRequest.type'

export const useImageStore = defineStore('ImageStore', () => {
  const isLoading = ref<boolean>(false)
  const imageService = new ImageService()
  const cloudinaryService = new CloudinaryService()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const images = ref<Image[]>([])
  const totalImages = ref<number>(0)
  const imagesByUserId = ref<Image[]>([])
  const imagesByCurrentUser = ref<Image[]>([])
  const totalImagesByCurrentUser = ref<number>(0)

  const delay = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const fetch = async (offset: number, limit: number, filter: string): Promise<void> => {
    try {
      isLoading.value = true
      const response = await imageService.getAll(offset, limit, filter)

      const newImages = response.data.images
      const meta = response.data.meta

      totalImages.value = meta.total

      for (const image of newImages) {
        await delay(1)
        images.value = [...images.value, image]
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const fetchAllByCurrentUser = async (offset: number, limit: number): Promise<void> => {
    try {
      isLoading.value = true
      const response = await imageService.getAllByUserId(authStore.userinfo?.uuid as string, offset, limit)
      const newImages = response.data.images
      const meta = response.data.meta
      totalImagesByCurrentUser.value = meta.total

      for (const image of newImages) {
        await delay(1)
        imagesByCurrentUser.value = [...imagesByCurrentUser.value, image]
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const addImage = async (title: string, keywords: string[], price: number, image: File): Promise<Image> => {
    try {
      isLoading.value = true
      const cloudinaryResponse = await cloudinaryService.uploadImage(image)
      const imageRequest: ImageRequest = {
        url: cloudinaryResponse.data.public_id,
        userUuid: authStore.userinfo?.uuid,
        title,
        keywords,
        price,
      }

      const response = await imageService.addImage(imageRequest)
      images.value.push(response.data)
      await delay(5000)
      toastStore.pushSuccessMessage('Image added')
      return response.data
    }
    finally {
      isLoading.value = false
    }
  }

  const deleteImage = async (uuid: string): Promise<void> => {
    try {
      isLoading.value = true
      const response = await imageService.deleteImage(uuid)
      const index = imagesByCurrentUser.value.findIndex(image => image.uuid === uuid)
      imagesByCurrentUser.value.splice(index, 1)
      if (response.status === 200)
        toastStore.pushSuccessMessage('Image deleted')
    }
    finally {
      isLoading.value = false
    }
  }

  const getImageById = async (uuid: string, userUuid: string | undefined): Promise<Image> => {
    try {
      isLoading.value = true
      const response = await imageService.getById(uuid, userUuid as string | undefined)
      return response.data
    }
    finally {
      isLoading.value = false
    }
  }

  const checkImageExists = async (uuid: string): Promise<boolean> => {
    try {
      isLoading.value = true
      const response = await imageService.getById(uuid, undefined).catch(() => {
        return { status: 404 }
      })
      return response.status === 200
    }
    finally {
      isLoading.value = false
    }
  }

  const activateLoadingAnimation = (): void => {
    isLoading.value = true

    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  }

  return { fetch, fetchAllByCurrentUser, addImage, deleteImage, getImageById, checkImageExists, activateLoadingAnimation, isLoading, images, imagesByUserId, imagesByCurrentUser, totalImages, totalImagesByCurrentUser }
})
