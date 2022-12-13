import { ModelDefined, Optional, Sequelize ,DataTypes} from 'sequelize';

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:04:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 20:18:27
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\Employee.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

/**员工创建可选参数 */
type IEmployeeCreation = Optional<IEmployee, 'id' | 'createAt' | 'logs'>;

type Employee = ModelDefined<IEmployee, IEmployeeCreation>;

/**员工模型初始化函数 */
const InitEmployee = (orm: Sequelize): Employee => {
    return orm.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.TEXT,
        phone: DataTypes.INTEGER,
        salary: DataTypes.INTEGER,
        createAt: { type: DataTypes.INTEGER, defaultValue: new Date().getTime() }
    }, { tableName: 'employee', timestamps: false });
}

export {Employee, InitEmployee};
