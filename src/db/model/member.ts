/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:23:24
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 00:18:40
 * @FilePath: \electron-vite-vue\src\db\model\member.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

export default class member extends Model<member>{

    id?: number

    name?: string

    phone?: number

    sex?: number

    credit?: number

    created_time: Date

    month_consume?: number

    sum_consum?: number

    consum_count?: number
}