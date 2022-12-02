/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 18:54:20
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:06:28
 * @FilePath: \electron-vite-vue\src\service.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { defineStore } from "pinia";
import user_services from "@/services/user_services";
import user_services_impl from "@/services/impl/user_services_impl";
import User from "@/db/model/user"
import member_services from "@/services/member_services";
import member_services_impl from "@/services/impl/member_services_impl";
import goods_services from "@/services/goods_services";
import goods_services_impl from "@/services/impl/goods_services_impl";
import employees_serivces from "@/services/employees_serivces";
import employees_serivces_impl from "@/services/impl/employees_serivces_impl";
import log_services from "@/services/log_services";
import log_services_impl  from "./services/impl/log_services_impl";
import { Sequelize } from "sequelize";
import sequelize from "@/db/SequelizeDb";
import { ElLoading } from 'element-plus';


interface serivceState{
    not_login: boolean
    user_info: User
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
export const useServiceStore = defineStore('serivce',{
    state: ():serivceState=>{
        return {
            not_login: true,
            user_info: {name:'admin',pw:'admin'},
            user_services: user_services_impl,
            member_services: member_services_impl,
            goods_services: goods_services_impl,
            employees_services: employees_serivces_impl,
            log_services: log_services_impl,
            orm: sequelize
        }
    },
    actions:{
        initFin(func: Function){
            func();
        }
    }
})