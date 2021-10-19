import {get} from '@/utils/request'

export const loadProductsApi = (page=1)=>get('/api/v1/admin/product',{page})