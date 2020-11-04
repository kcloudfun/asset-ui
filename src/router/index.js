import Vue from 'vue'
import Router from 'vue-router'
import assetManage from '@/components/view/AssetManage'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: '资产管理',
    component: assetManage
  }
]

export default new Router({
  routes: routes
})
