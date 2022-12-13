import { ModelDefined, Optional, Sequelize, DataTypes } from 'sequelize';
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:23:24
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:11:49
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\Member.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**会员模型可选参 */
type IMemberCreation = Optional<IMember, 'id' | 'consum_count' | 'createAt' | 'logs' | 'month_consume' | 'sum_consum'>

type Member = ModelDefined<IMember, IMemberCreation>

/**会员模型初始化函数 */
const InitMember = (orm: Sequelize): Member => {
    return orm.define('Member', {
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
        sum_consum: { type: DataTypes.INTEGER, defaultValue: 0 },
        consum_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        createAt: { type: DataTypes.INTEGER, defaultValue: new Date().getTime() }
    }, { tableName: 'member', timestamps: false });
}

export { Member, InitMember };