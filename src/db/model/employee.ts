/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:04:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 00:33:44
 * @FilePath: \electron-vite-vue\src\db\model\employee.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Logs from '@/db/model/logs'
import { Model } from "sequelize"

export default class Employee extends Model {

    declare id?: number

    declare name?: string

    declare phone?: number

    declare salary?: number

    declare createAt: Date

    declare logs: Logs

}




