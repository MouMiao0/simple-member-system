/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:54:22
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:32:54
 * @FilePath: \electron-vite-vue\src\db\model\logs.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Employee from "@/db/model/employee";
import Member from "@/db/model/member";
import Goods from "@/db/model/goods";
import { DataTypes, Model } from "sequelize";
import sequelize from "@/db/SequelizeDb";

export default class Logs extends Model {

    declare id?: number

    /**
     * 操作类型: 0-会员消费, 1-货物入库, 2-员工工资
     */
    declare operation?: number

    /**
     * 员工id
     */
    declare e_id?: number

    /**
     * 员工
     */
    declare employee?: Employee

    /**
     * 会员id
     */
    declare m_id?: number

    /**
     * 会员
     */
    declare member?: Member

    /**
     * 商品id
     */
    declare g_id?: number

    /**商品 */
    declare goods?: Goods

    /**
     * 
     */
    declare goods_count?: number

    /**
     * 金额
     */
    declare amount?: number


    /**
     * 记录时间
     */
    declare createAt?: Date
}



