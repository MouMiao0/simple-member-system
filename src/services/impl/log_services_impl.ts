/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:19:56
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 13:17:05
 * @FilePath: \electron-vite-vue\src\services\impl\log_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Revenue from "@/db/model/revenue";
import log_services from "@/services/log_services";
import IPage from "@/db/model/Ipage";
import Logs from "@/db/model/logs";
import { Op } from "sequelize";
import { PAGESIZE } from "./StaticVar";
import Member from "@/db/model/member";
import Goods from "@/db/model/goods";
import Employee from "@/db/model/employee";


class log_services_impl implements log_services {
    async info(): Promise<Revenue> {
        const sumIncome = await Logs.sum('amount', { where: { operation: 0 } })
        const sumExpend = await Logs.sum('amount', { where: { [Op.or]: [{operation: 2},{ operation: 1}] } })
        const sumRevenue = sumIncome - sumExpend;

        // 获取时间戳 (本月第一天00.00.00  本月最后一天23.59.59)
        const data = new Date(); //本月
        data.setDate(1);
        data.setHours(0);
        data.setSeconds(0);
        data.setMinutes(0);

        const data1 = new Date(); // 下月
        if (data.getMonth() == 11) {
            data1.setMonth(0)
        } else {
            data1.setMonth(data.getMonth() + 1)
        }
        data1.setDate(1);
        data1.setHours(0);
        data1.setSeconds(0);
        data1.setMinutes(0);


        const timeStart = Math.floor(data.getTime() / 1000);
        const timeEnd = Math.floor(data1.getTime() / 1000) - 1;//(计算下月1号时间戳-1即可

        const monthIncome = await Logs.sum('amount', {
            where: {
                [Op.and]: { createAt: { [Op.lte]: timeEnd, [Op.gt]: timeStart }, operation: 0 }
            }
        })
        const monthExpend = await Logs.sum('amount', {
            where: {
                [Op.and]: { createAt: { [Op.lte]: timeEnd, [Op.gt]: timeStart }, [Op.and]: [ {operation: 2},{ operation: 1 }] }
            }
        })
        const monthRevenue = monthIncome - monthExpend;

        return {
            sumIncome: sumIncome,
            sumExpend: sumExpend,
            monthIncome: monthIncome,
            monthExpend: monthExpend,
            sumRevenue: sumExpend,
            monthRevenue: monthExpend
        }
    }

    async get_logs(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<Logs>> {
        const offset = (page - 1) * 5;
        const { count, rows } = await Logs.findAndCountAll({ offset: offset, limit: PAGESIZE });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    }

    async member_consumed(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<Logs>> {
        const offset = (page - 1) * 5;
        const { count, rows } = await Logs.findAndCountAll({
            where: {
                operation: 0
            }, offset: offset, limit: PAGESIZE
        });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    }

    async goods_storaged(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<Logs>> {
        const offset = (page - 1) * 5;
        const { count, rows } = await Logs.findAndCountAll({
            where: {
                operation: 1
            }, offset: offset, limit: PAGESIZE
        });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    }

    async employee_salaries(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<Logs>> {
        const offset = (page - 1) * 5;
        const { count, rows } = await Logs.findAndCountAll({
            where: {
                operation: 2
            }, offset: offset, limit: PAGESIZE
        });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    }
}

export default new log_services_impl();