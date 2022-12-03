/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 11:59:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 02:54:55
 * @FilePath: \electron-vite-vue\src\db\model\user.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { DataTypes, Model } from "sequelize"
import sequelize from "@/db/SequelizeDb"

export default class User extends Model {

    declare id?: number

    declare name?: string

    declare pw?: string
}


