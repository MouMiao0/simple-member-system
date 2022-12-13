/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:38:28
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 05:09:13
 * @FilePath: \electron-vite-vue\electron\services\IGoodsServices.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */


/**
 * 商品服务
 */
interface IGoodsServices{
    
    /**
     * 获取商品
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-库存排序, 2-价格排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 商品数组
     */
    getGoods: (page?: number, sort?:number, desc?: boolean)=> Promise<IPage<IGoods>>

    /**
     * 搜索商品
     * @param name 商品名字 
     * @returns 商品列表
     */
    queryGoods: (name: string) => Promise<IGoods[]>

    /**
     * 入库
     * @param goods 商品
     * @param amount 花费
     * @returns 操作结果
     */
    storage: (goods: IGoods, amount: number) => Promise<boolean>

    /**
     * 商品添加
     * @param goods 商品 
     * @returns 添加结果
     */
    addGoods: (goods: IGoods) => Promise<boolean>
    
    /**
     * 修改信息
     * @param goods 商品
     * @returns 操作结果 
     */
    modified: (goods: IGoods) => Promise<boolean>
    

    /**
     * 删除商品
     * @param goods 商品
     * @returns 操作结果
     */
    remove: (goods: IGoods) => Promise<boolean>
}