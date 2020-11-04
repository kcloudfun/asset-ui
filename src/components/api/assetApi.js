import fetch from '@/fetch'

/**
 * 查询资产列表
 * @param {*} params 
 * @param {*} currentPage 
 * @param {*} pageSize 
 */
export function queryGoodsList(params, currentPage, pageSize) {
    return fetch({
        url: '/asset/goods/list/' + currentPage + '/' + pageSize,
        method: 'POST',
        data: params
    })
}

/**
 * 保存
 * @param {*} params 
 */
export function saveGoods(params) {
    return fetch({
        url: '/asset/goods/save',
        method: 'POST',
        data: params
    })
}

/**
 * 删除
 * @param {*} params 
 */
export function deleteById(params) {
    return fetch({
        url: '/asset/goods/delete/' + params,
        method: 'POST'
    })
}