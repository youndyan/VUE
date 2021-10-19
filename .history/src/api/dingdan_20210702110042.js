import { get, del } from '@/utils/request'

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