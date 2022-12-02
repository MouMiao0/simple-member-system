/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 17:10:34
 * @FilePath: \electron-vite-vue\src\db\model\goods.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

export default class goods extends Model<goods>{

    id?: number

    name?: string

    price?: number

    count?: number

    created_time?: Date

}