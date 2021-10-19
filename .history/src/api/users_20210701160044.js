import { get, del, put } from '@/utils/request'

export const loadUsersApi = (page = 1) => get('/api/v1/admin/user', { page })
// 新增
// export const insertUsersApi = data => post('/api/v1/admin/user', data)

export const deleteOneApi = id => del(`/api/v1/admin/user/${id}`)

export const editOneApi = (id, data) => put(`/api/v1/admin/user/${id}`, data)

// 根据id获取单条数据
export const getOneByIdApi = id => get(`/api/v1/admin/user/${id}`)


// 购物车接口
// 展示
export const CloadUsersApi = (id, user) => get('/api/v1/admin/cart/info', { id, data })
// 新增
// export const insertUsersApi = data => post('/api/v1/admin/cart/info', data)
// 删除
export const CdeleteOneApi = id => del(`/api/v1/admin/cart/${id}`)
// 修改
// export const CeditOneApi = (id, data) => put(`/api/v1/admin/cart/info/${id}`, data)

// 根据id获取单条数据
export const CgetOneByIdApi = id => get(`/api/v1/admin/cart/info/${id}`)

