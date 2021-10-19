import { post, get } from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/api/v1/auth/manager_login',
  //   method: 'post',
  //   data
  // })
  return post('/api/v1/auth/manager_login', data)
}

export function getInfo() {
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return get('/api/v1/admin/user', data)
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
