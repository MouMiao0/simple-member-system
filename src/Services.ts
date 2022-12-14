/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 18:54:20
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 15:44:42
 * @FilePath: \electron-vite-vue\src\Services.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import { Sequelize, DataTypes } from "sequelize";
import * as remote from '@electron/remote';
const UserServices = remote.getGlobal("userServices") as IUserServices ;
const MemberServices = remote.getGlobal('memberservices') as IMemberServices;
const EmployeesServices = remote.getGlobal('employeesServices') as IEmployeesSerivces;
const LogsServices = remote.getGlobal('logsServices') as ILogsServices;
const GoodsService = remote.getGlobal('goodsService') as IGoodsServices;


interface serivceState {
    not_login: boolean
    userServices: IUserServices
    memberServices: IMemberServices
    goodsServices: IGoodsServices
    employeesServices: IEmployeesSerivces
    logsServices: ILogsServices
    user_info?: Record<any, String>
}



/**
 * 服务调用, 在此注册服务
 */
export const useServiceStore = defineStore('serivce', {
    state: (): serivceState => {
        return {
            not_login: true,
            user_info: { name: '', pw: '' },
            userServices: UserServices,
            memberServices: MemberServices,
            goodsServices: GoodsService,
            employeesServices: EmployeesServices,
            logsServices: LogsServices,
        }
    },
    actions: {
    }
})