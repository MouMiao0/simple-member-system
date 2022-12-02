/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 05:34:29
 * @FilePath: \electron-vite-vue\src\db\model\goods.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Logs from "@/db/model/logs"
import { DataTypes, Model } from "sequelize"
import sequelize from "@/db/SequelizeDb"

export default class Goods extends Model {

    declare id?: number

    declare name?: string

    declare price?: number

    declare count?: number

    declare createAt?: Date

    declare logs: Logs
}

Goods.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{type: DataTypes.TEXT, unique: true},
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
},{sequelize:sequelize,tableName:'goods',timestamps:false})

