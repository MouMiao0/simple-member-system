/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 19:16:38
 * @FilePath: \electron-vite-vue\src\db\model\goods.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Logs from "@/db/model/logs"

export default interface goods {

    id?: number

    name?: string

    price?: number

    count?: number

    created_time?: Date

    logs: Logs
}