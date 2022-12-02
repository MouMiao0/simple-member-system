/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:23:24
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:36:32
 * @FilePath: \electron-vite-vue\src\db\model\member.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Logs from "@/db/model/logs"
import { DataTypes, Model } from "sequelize"
import sequelize from "@/db/SequelizeDb"

export default class member extends Model {

    declare id?: number

    declare name?: string

    declare plate_code?: number

    declare phone?: number

    declare sex?: number

    declare credit?: number

    declare createAt?: Date

    declare logs: Logs

    declare month_consume?: number

    declare sum_consum?: number

    declare consum_count?: number
}

member.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    plate_code: {
        type: DataTypes.TEXT,
        unique: true
    },
    phone: { type: DataTypes.INTEGER, unique: true },
    sex: DataTypes.BLOB,
    credit: DataTypes.INTEGER,
    month_consume: DataTypes.INTEGER,
    sum_consum: DataTypes.INTEGER,
    consum_count: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
}, { sequelize: sequelize, tableName: 'member', timestamps: false })

