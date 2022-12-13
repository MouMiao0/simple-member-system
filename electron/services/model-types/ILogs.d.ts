/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:54:22
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 23:14:39
 * @FilePath: \electron-vite-vue\electron\services\model-types\ILogs.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

/**
 * 日志记录
 */
interface ILogs {

    id?: number

    /**
     * 操作类型: 0-会员消费, 1-货物入库, 2-员工工资
     */
    operation?: number

    /**
     * 员工id
     */
    e_id?: number

    /**
     * 员工
     */
    employee?: IEmployee

    /**
     * 会员id
     */
    m_id?: number

    /**
     * 会员
     */
    member?: IMember

    /**
     * 商品id
     */
    g_id?: number

    /**商品 */
    goods?: IGoods

    /**
     * 
     */
    goods_count?: number

    /**
     * 金额
     */
    amount?: number


    /**
     * 记录时间
     */
    createAt?: Date
}



