import { ModelDefined, Optional, Sequelize, DataTypes, Model } from 'sequelize';
import { Goods } from './Goods';
import { Employee } from './Employee';
import { Member } from './Member';

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:54:22
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:12:08
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\Logs.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**日志记录可选参数 */
type ILogsCreation = Optional<ILogs, 'id' | 'e_id' | 'g_id' | 'm_id' | 'createAt' | 'employee' | 'goods' | 'goods_count' | 'member'>

type Logs = ModelDefined<ILogs, ILogsCreation>

/**日志模型初始化函数 */
const InitLogs = (orm: Sequelize,EmployeeModel:Model,GoodsModel:Model,MemberModel:Model): Logs => {
    const LogsModel = orm.define('Logs', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        operation: DataTypes.INTEGER,
        e_id: { type: DataTypes.INTEGER, references: { model: EmployeeModel, key: 'id' } },
        m_id: { type: DataTypes.INTEGER, references: { model: MemberModel, key: 'id' } },
        g_id: { type: DataTypes.INTEGER, references: { model: GoodsModel, key: 'id' } },
        goods_count: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        createAt: { type: DataTypes.INTEGER, defaultValue: new Date().getTime() }
    }, { tableName: 'logs', timestamps: false });

    return LogsModel
}

export { Logs, InitLogs };