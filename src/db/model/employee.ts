/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:04:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 19:13:06
 * @FilePath: \electron-vite-vue\src\db\model\employee.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Logs from '@/db/model/logs'

export default interface employee {

    id?: number

    name?: string

    phone?: number

    salary?: number

    created_time: Date

    logs: Logs

}