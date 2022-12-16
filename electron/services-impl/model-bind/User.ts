import { timeStamp } from 'node:console';
import { DataTypes, Sequelize, Optional, ModelDefined } from 'sequelize';
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 11:59:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-15 23:38:08
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\User.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**用户创建可选参 */

type IUserCreation = Optional<IUser,'id'>

type User = ModelDefined<IUser,IUserCreation>

/**用户模型初始化函数 */
const InitUser = (orm: Sequelize) => {
    return orm.define('User',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.TEXT,
        pw: DataTypes.TEXT
    }, {
        tableName: 'user',
        timeStamp: false
    });
}

export { User, InitUser };