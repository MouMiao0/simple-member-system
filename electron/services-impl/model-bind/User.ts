import { DataTypes, Model, InferAttributes, InferCreationAttributes,CreationOptional } from 'sequelize';
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 11:59:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:13:49
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\User.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**用户创建可选参 */
// interface IUserCreation extends Optional<IUser,'id'> {}

const Sequelize = require('sequelize')

// interface User extends Model<IUser, IUserCreation>,IUserCreation{}
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements IUser {
    declare id?: CreationOptional<number>;
    declare name?: string;
    declare pw?: string;
}

/**用户模型初始化函数 */
const InitUser = (orm: Sequelize) => {
    return User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.TEXT,
        pw: DataTypes.TEXT
    }, {
        sequelize: orm,
        tableName: 'user'
    });
}

export { User, InitUser };