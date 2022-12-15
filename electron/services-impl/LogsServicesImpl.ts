import SequelizeORM from "../db/SequelizeORM";
import { Op } from "sequelize";
import Util from "../util/Util";

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:19:56
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-15 18:55:03
 * @FilePath: \electron-vite-vue\electron\services-impl\LogsServicesImpl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
const PAGESIZE = 10;


class LogServicesImpl implements ILogsServices {

    info(): Promise<Revenue> {
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<Revenue>((resolve, reject) => {
            const revenue = {
                sumExpend: 0,
                sumIncome: 0,
                sumRevenue: 0,
                monthExpend: 0,
                monthIncome: 0,
                monthRevenue: 0
            } as Revenue;
            const monthStamp = Util.getMonthTimeStamps();
            logsMapper.sum('amount', { where: { operation: 0 } })
                .then((sumIncome) => {
                    revenue.sumIncome = sumIncome;
                    logsMapper.sum('amount', { where: { [Op.or]: [{ operation: 2 }, { operation: 1 }] } })
                        .then((sumExpend) => {
                            revenue.sumExpend = sumExpend;
                            revenue.sumRevenue = revenue.sumIncome - revenue.sumExpend;
                            logsMapper.sum('amount', {
                                where: {
                                    [Op.and]: { createAt: { [Op.lte]: monthStamp.end, [Op.gt]: monthStamp.start }, operation: 0 }
                                }
                            }).then((mothIncome) => {
                                revenue.monthIncome = mothIncome;
                                logsMapper.sum('amount', {
                                    where: {
                                        [Op.and]: { createAt: { [Op.lte]: monthStamp.end, [Op.gt]: monthStamp.start }, [Op.and]: [{ operation: 2 }, { operation: 1 }] }
                                    }
                                }).then((monthExpend) => {
                                    revenue.monthExpend = monthExpend;
                                    revenue.monthRevenue = revenue.monthIncome - revenue.monthExpend;
                                    resolve(revenue);
                                })
                            }).catch(e => reject(e))
                        }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }

    getLogs(page: number = 1, sort: number = 0, desc: boolean = true): Promise<Page<ILogs>> {
        const LOGSPAGESIZE = 5;
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<Page<ILogs>>((resolve, reject) => {
            const offset = (page - 1) * LOGSPAGESIZE;
            logsMapper.findAndCountAll({ include: { all: true }, offset: offset, limit: LOGSPAGESIZE })
                .then(({ count, rows }) => {
                    const pageCounts = count > LOGSPAGESIZE ? Math.floor(count / LOGSPAGESIZE) + 1 : 1;
                    resolve({
                        record: rows,
                        currentPage: page,
                        pageCounts: pageCounts,
                        pageSize: LOGSPAGESIZE,
                    })
                })

        })
    }

    memberConsumed(page: number = 1, sort: number = 0, desc: boolean = true): Promise<Page<ILogs>> {
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<Page<ILogs>>((resolve, reject) => {
            const offset = (page - 1) * PAGESIZE;
            logsMapper.findAndCountAll({
                include: { all: true },
                where: {
                    operation: 0
                }, offset: offset, limit: PAGESIZE
            }).then(({ count, rows }) => {
                const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
                resolve({
                    record: rows,
                    currentPage: page,
                    pageCounts: pageCounts,
                    pageSize: PAGESIZE,
                })
            }).catch(e => reject(e))
        })
    }

    goodsStoraged(page: number = 1, sort: number = 0, desc: boolean = true): Promise<Page<ILogs>> {
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<Page<ILogs>>((resolve, reject) => {
            const offset = (page - 1) * PAGESIZE;
            logsMapper.findAndCountAll({
                include: { all: true },
                where: {
                    operation: 1
                }, offset: offset, limit: PAGESIZE
            }).then(({ count, rows }) => {
                const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
                resolve({
                    record: rows,
                    currentPage: page,
                    pageCounts: pageCounts,
                    pageSize: PAGESIZE,
                })
            })
        })
    }

    employeeSalaries(page: number = 1, sort: number = 0, desc: boolean = true): Promise<Page<ILogs>> {
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<Page<ILogs>>((resolve, reject) => {
            const offset = (page - 1) * PAGESIZE;
            logsMapper.findAndCountAll({
                include: { all: true },
                where: {
                    operation: 2
                }, offset: offset, limit: PAGESIZE
            }).then(({ count, rows }) => {
                const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
                resolve({
                    record: rows,
                    currentPage: page,
                    pageCounts: pageCounts,
                    pageSize: PAGESIZE,
                })
            })
        })
    }
}

const logsServicesImpl = new LogServicesImpl();

export default logsServicesImpl;