/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:04:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:33:20
 * @FilePath: \electron-vite-vue\src\db\model\employee.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Logs from '@/db/model/logs'
import { DataTypes, Model } from "sequelize"
import sequelize from "@/db/SequelizeDb"

export default class Employee extends Model {

    declare id?: number

    declare name?: string

    declare phone?: number

    declare salary?: number

    declare createAt: Date

    declare logs: Logs

}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
}, { sequelize: sequelize, tableName: 'employee' , timestamps: false})


