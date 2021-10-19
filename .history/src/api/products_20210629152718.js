import { get, post } from '@/utils/request'

export const loadProductsApi = (page = 1) => get('/api/v1/admin/product', { page })

export const insertProductsApi = (page = 1) => get('/api/v1/admin/product', { page })

