/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:54:22
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 19:16:55
 * @FilePath: \electron-vite-vue\src\db\model\logs.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Employee from "@/db/model/employee";
import Member from "@/db/model/member";
import Goods from "@/db/model/goods";

export default interface logs {

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
    employee?: Employee

    /**
     * 会员id
     */
    m_id?: number

    /**
     * 会员
     */
    member: Member

    /**
     * 商品id
     */
    g_id?:number

    /**商品 */
    goods: Goods

    /**
     * 金额
     */
    amount?: number


    /**
     * 记录时间
     */
    created_time?: Date
}