import { post, request } from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/api/v1/auth/manager_login',
  //   method: 'post',
  //   data
  // })
  return post('/api/v1/auth/manager_login', data)
}

export function getInfo(per, data) {
  return request({
    url: '/api/v1/admin/user',
    method: 'get',
    params: { per, data }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
