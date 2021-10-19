import { get, post, del, put } from '@/utils/request'

export const loadProductsApi = (page = 1) => get('/api/v1/admin/product', { page })
// 新增
export const insertProductsApi = data => post('/api/v1/admin/product', data)

export const deleteOneApi = id => del(`/api/v1/admin/product/${id}`)

export const deitOneApi = id => del(`/api/v1/admin/product/${id}`)


