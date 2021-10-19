import { get, del, put, post } from '@/utils/request'

export const loadForumApi = (page = 1) => get('/api/v1/admin/forum', { page })
// 新增
export const insertForumApi = data => post('/api/v1/admin/forum', data)

export const deleteOneApi = id => del(`/api/v1/admin/forum/${id}`)

export const editOneApi = (id, data) => put(`/api/v1/admin/forum/${id}`, data)

// 根据id获取单条数据
export const getOneByIdApi = id => get(`/api/v1/admin/forum/${id}`)

