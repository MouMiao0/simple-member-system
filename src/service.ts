/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 18:54:20
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 01:39:32
 * @FilePath: \electron-vite-vue\src\service.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import user_services from "@/services/user_services";
import user_services_impl from "@/services/impl/user_services_impl";
import Logs from '@/db/model/logs';
import Member from '@/db/model/member';
import Employee from '@/db/model/employee';
import Goods from '@/db/model/goods';
import User from '@/db/model/user';
import member_services from "@/services/member_services";
import member_services_impl from "@/services/impl/member_services_impl";
import goods_services from "@/services/goods_services";
import goods_services_impl from "@/services/impl/goods_services_impl";
import employees_serivces from "@/services/employees_serivces";
import employees_serivces_impl from "@/services/impl/employees_serivces_impl";
import log_services from "@/services/log_services";
import log_services_impl from "./services/impl/log_services_impl";
import { Sequelize,DataTypes } from "sequelize";
import { ElLoading } from 'element-plus';


interface serivceState {
    not_login: boolean
    user_info: Record<any, String>
    user_services: user_services
    member_services: member_services
    goods_services: goods_services
    employees_services: employees_serivces
    log_services: log_services
    orm: Sequelize
}



/**
 * 服务调用, 在此注册服务
 */
export const useServiceStore = defineStore('serivce', {
    state: (): serivceState => {
        return {
            not_login: true,
            user_info: { name: 'admin', pw: 'admin' },
            user_services: user_services_impl,
            member_services: member_services_impl,
            goods_services: goods_services_impl,
            employees_services: employees_serivces_impl,
            log_services: log_services_impl,
            orm: {} as Sequelize
        }
    },
    actions: {
        /**
         * 初始化数据库
         * @returns ORM接口
         */
        initDB() {
            return new Promise<Sequelize>((resolve, reject) => {

                //#region 数据库连接
                // const path = app.getPath("userData");
                const path = "./src/db/";

                console.log(process.versions.electron)

                const orm = new Sequelize({
                    dialect: 'sqlite', storage: path+'sequelize.db',
                });
                this.orm = orm;

                try {
                    orm.authenticate()
                    console.log('数据库连接成功')
                } catch (error) {
                    console.log('数据库连接失败')
                    reject(error)
                }

                //#endregion

                //#region 用户模型
                User.init({
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    name: DataTypes.TEXT,
                    pw: DataTypes.TEXT
                }, {
                    sequelize: orm, tableName: 'user'
                })
                //#endregion

                //#region 会员模型
                Member.init({
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
                }, { sequelize: orm, tableName: 'member', timestamps: false })
                //#endregion

                //#region 商品模型
                Goods.init({
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    name: { type: DataTypes.TEXT, unique: true },
                    price: DataTypes.INTEGER,
                    count: DataTypes.INTEGER,
                    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
                }, { sequelize: orm, tableName: 'goods', timestamps: false })
                //#endregion
                
                //#region 员工模型
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
                }, { sequelize: orm, tableName: 'employee', timestamps: false })
                //#endregion

                //#region 日志模型
                Logs.init({
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    operation: DataTypes.INTEGER,
                    e_id: { type: DataTypes.INTEGER, references: { model: Employee, key: 'id' } },
                    m_id: { type: DataTypes.INTEGER, references: { model: Member, key: 'id' } },
                    g_id: { type: DataTypes.INTEGER, references: { model: Goods, key: 'id' } },
                    goods_count: DataTypes.INTEGER,
                    amount: DataTypes.INTEGER,
                    createAt: { type: DataTypes.INTEGER, defaultValue: DataTypes.NOW }
                }, { sequelize: orm, tableName: 'logs', timestamps: false })

                Employee.hasMany(Logs, { foreignKey: 'e_id' })
                Logs.belongsTo(Employee)
                Goods.hasMany(Logs, { foreignKey: 'g_id' })
                Logs.belongsTo(Goods)
                Member.hasMany(Logs, { foreignKey: 'm_id' })
                Logs.belongsTo(Member)
                //#endregion
                
                // sequelize.sync({force:true}).then().catch();
                console.log('初始化完成');
                resolve(orm);
            })
        }
    }
})