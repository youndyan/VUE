import { get, post } from '@/utils/request'

export const loadProductsApi = (page = 1) => get('/api/v1/admin/product', { page })
// 新增
export const insertProductsApi = data => post('/api/v1/admin/product', data)

