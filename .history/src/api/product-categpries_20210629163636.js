import { get, post, del, put } from '@/utils/request'

export const loadModelsApi = (page = 1) => get('/api/v1/admin/productcategory', { page })
// 新增
export const insertModelsApi = data => post('/api/v1/admin/productcategory', data)

export const deleteOneApi = id => del(`/api/v1/admin/productcategory/${id}`)

export const editOneApi = (id, data) => put(`/api/v1/admin/productcategory/${id}`, data)

// 根据id获取单条数据
export const getOneByIdApi = id => get(`/api/v1/admin/productcategory/${id}`)


