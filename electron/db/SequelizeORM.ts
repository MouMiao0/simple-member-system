/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-05 14:30:05
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-06 22:26:51
 * @FilePath: \electron-vite-vue\electron\db\SequelizeORM.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { app } from "electron";
import { Model, Sequelize } from "sequelize";
import * as fs from 'fs-extra'
import * as path from 'path'
import { User, InitUser } from "../services-impl/model-bind/User";
import { Goods, InitGoods } from "../services-impl/model-bind/Goods";
import { Member, InitMember } from '../services-impl/model-bind/Member';
import { Employee, InitEmployee } from '../services-impl/model-bind/Employee';
import Store = require('electron-store');
import { Logs, InitLogs } from "../services-impl/model-bind/Logs";
import Singleton from "../util/Singleton";

class SequelizeORM extends Singleton<SequelizeORM>{

    /**数据库实例 */
    public ORM: Sequelize;

    /** 初始化模型 */
    private InitModel(file: string): Promise<Sequelize> {
        const userDatePath = app.getPath('userData');
        const fileName = "orm.db";
        const filePath = path.resolve(userDatePath, fileName);
        return new Promise<Sequelize>((resolve, reject) => {
            //#region 数据连接
            const orm = new Sequelize({
                dialect: 'sqlite',
                storage: file
            });
            orm.authenticate().then(() => {
                console.log('数据库连接成功')


                //#region 绑定模型
                const UserModel = InitUser(orm);
                const GoodsModel = InitGoods(orm);
                const MemberModel = InitMember(orm);
                const EmployeeModel = InitEmployee(orm);
                const LogsModel = InitLogs(orm, EmployeeModel, GoodsModel, MemberModel);
                //#endregion

                //#region 绑定依赖
                EmployeeModel.hasMany(LogsModel, { foreignKey: 'e_id' })
                LogsModel.belongsTo(EmployeeModel, { foreignKey: 'e_id' })
                GoodsModel.hasMany(LogsModel, { foreignKey: 'g_id' })
                LogsModel.belongsTo(GoodsModel, { foreignKey: 'g_id' })
                MemberModel.hasMany(LogsModel, { foreignKey: 'm_id' })
                LogsModel.belongsTo(MemberModel, { foreignKey: 'm_id' })
                //#endregion

                resolve(orm);
            }).catch((e) => {
                console.log('数据库连接失败')
                reject(e);
            })
            //#endregion
        })
    }

    /**初始化数据库方法 */
    InitORM(): Promise<Sequelize> {
        const userDatePath = app.getPath('userData');
        const fileName = "orm.db";
        const filePath = path.resolve(userDatePath, fileName);
        return new Promise<Sequelize>((resolve, reject) => {
            fs.pathExists(filePath)
                .then((exists) => {
                    if (exists) {
                        this.InitModel(filePath)
                            .then((orm) => {
                                console.log('数据库初始化成功');
                                this.ORM = orm;
                                resolve(orm);
                            })
                            .catch((e) => {
                                console.log('数据库初始化失败');
                                reject(e);
                            })
                    } else {
                        this.InitModel(filePath)
                            .then((orm) => {
                                orm.sync({ force: true }).then(() => {
                                    console.log('数据库初次初始化成功');
                                    this.ORM = orm;
                                    resolve(orm);
                                })
                            })
                            .catch((e) => {
                                console.log('数据库初次初始化失败');
                                reject(e);
                            })
                    }
                })
        })
    }

}

// /** 初始化模型 */
// const InitModel = (file: string) => {
//     return new Promise<Sequelize>((resolve, reject) => {
//         //#region 数据连接
//         const orm = new Sequelize({
//             dialect: 'sqlite',
//             storage: file
//         });
//         orm.authenticate().then(() => {
//             console.log('数据库连接成功')
//         }).catch((e) => {
//             console.log('数据库连接失败')
//             reject(e);
//         })

//         //#endregion

//         //#region 绑定模型
//         const UserModel = InitUser(orm);
//         const GoodsModel = InitGoods(orm);
//         const MemberModel = InitMember(orm);
//         const EmployeeModel = InitEmployee(orm);
//         const LogsModel = InitLogs(orm, EmployeeModel, GoodsModel, MemberModel);
//         //#endregion

//         //#region 绑定依赖
//         EmployeeModel.hasMany(LogsModel, { foreignKey: 'e_id' })
//         LogsModel.belongsTo(EmployeeModel, { foreignKey: 'e_id' })
//         GoodsModel.hasMany(LogsModel, { foreignKey: 'g_id' })
//         LogsModel.belongsTo(GoodsModel, { foreignKey: 'g_id' })
//         MemberModel.hasMany(LogsModel, { foreignKey: 'm_id' })
//         LogsModel.belongsTo(MemberModel, { foreignKey: 'm_id' })
//         //#endregion


//         //#region 注入模型
//         store.User = UserModel;
//         store.Goods = GoodsModel;
//         store.Member = MemberModel;
//         store.Employee = EmployeeModel;
//         store.Logs = LogsModel;
//         //#endregion

//         resolve(orm);
//     })
// }


// /**初始化数据库方法 */
// const InitORM = () => {
//     return new Promise<Sequelize>((resolve, reject) => {
//         fs.pathExists(filePath)
//             .then((exists) => {
//                 if (exists) {
//                     InitModel(filePath)
//                         .then((orm) => {
//                             console.log('数据库初始化成功');
//                             resolve(orm);
//                         })
//                         .catch((e) => {
//                             console.log('数据库初始化失败');
//                             reject(e);
//                         })
//                 } else {
//                     InitModel(filePath)
//                         .then((orm) => {
//                             orm.sync({ force: true }).then(() => {
//                                 console.log('数据库初次初始化成功');
//                                 resolve(orm);
//                             })
//                         })
//                         .catch((e) => {
//                             console.log('数据库初次初始化失败');
//                             reject(e);
//                         })
//                 }
//             })
//     })
// }

export default SequelizeORM.Instance(SequelizeORM);