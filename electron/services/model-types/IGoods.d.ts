/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 05:06:16
 * @FilePath: \electron-vite-vue\electron\services\model-types\Goods.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */


/**
 * 商品
 */
 interface IGoods {

    /**
     * id
     */
    id?: number

    /**
     * 名字
     */
    name?: string

    /**
     * 价格
     */
    price?: number

    /**
     * 货架
     */
    count?: number

    /**
     * 创建时间
     */
    createAt?: Date

    /**
     * 记录
     */
    logs: ILogs
}



