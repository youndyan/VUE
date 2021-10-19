import { get, del, put, post } from '@/utils/request'

export const loadUsersApi = (page = 1) => get('/api/v1/admin/user', { page })
// 新增
export const insertUsersApi = data => post('/api/v1/admin/user', data)

export const deleteOneApi = id => del(`/api/v1/admin/user/${id}`)

export const editOneApi = (id, data) => put(`/api/v1/admin/user/${id}`, data)

// 根据id获取单条数据
export const getOneByIdApi = id => get(`/api/v1/admin/user/${id}`)

// 购物车接口
// 展示
export const CloadUsersApi = id => get('/api/v1/admin/cart/info', { user: id })
// 新增
// export const insertUsersApi = data => post('/api/v1/admin/cart/info', data)
// 删除
export const CdeleteOneApi = id => del(`/api/v1/admin/cart/${id}`)
// 修改
// export const CeditOneApi = (id, data) => put(`/api/v1/admin/cart/info/${id}`, data)

// 根据id获取单条数据
export const CgetOneByIdApi = id => get(`/api/v1/admin/cart/info/${id}`)

// 订单接口
// 展示
export const DloadUsersApi = id => get('/api/v1/admin/order', { user: id })
// 新增
// export const insertUsersApi = data => post('/api/v1/admin/order', data)
// 删除
export const DdeleteOneApi = id => del(`/api/v1/admin/order/${id}`)
// 修改
// export const CeditOneApi = (id, data) => put(`/api/v1/admin/order/${id}`, data)

// 根据id获取单条数据
export const DgetOneByIdApi = id => get(`/api/v1/admin/order/${id}`)
