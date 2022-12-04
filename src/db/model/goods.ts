/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 00:33:54
 * @FilePath: \electron-vite-vue\src\db\model\goods.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Logs from "@/db/model/logs"
import {  Model } from "sequelize"

export default class Goods extends Model {

    declare id?: number

    declare name?: string

    declare price?: number

    declare count?: number

    declare createAt?: Date

    declare logs: Logs
}



