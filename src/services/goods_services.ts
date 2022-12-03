/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:38:28
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 06:53:34
 * @FilePath: \electron-vite-vue\src\services\goods_services.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Goods from "@/db/model/goods";
import IPage from "@/db/model/Ipage";

/**
 * 商品服务
 */
export default interface goods_services{
    
    /**
     * 获取商品
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-库存排序, 2-价格排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 商品数组
     */
    get_goods: (page?: number, sort?:number, desc?: boolean)=> Promise<IPage<Goods>>

    /**
     * 搜索商品
     * @param name 商品名字 
     * @returns 商品列表
     */
    queryGoods: (name: string) => Promise<Goods[]>

    /**
     * 入库
     * @param goods 商品
     * @param amount 花费
     * @returns 操作结果
     */
    storage: (goods: Goods, amount: number) => Promise<boolean>

    /**
     * 商品添加
     * @param goods 商品 
     * @returns 添加结果
     */
    addGoods: (goods: Goods) => Promise<boolean>
    
    /**
     * 修改信息
     * @param goods 商品
     * @returns 操作结果 
     */
    modified: (goods: Goods) => Promise<boolean>
    

    /**
     * 删除商品
     * @param goods 商品
     * @returns 操作结果
     */
    remove: (goods: Goods) => Promise<boolean>
}