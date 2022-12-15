import { resolve } from "path";
import { Op } from "sequelize";
import SequelizeORM, { store } from "../db/SequelizeORM";
import Util from "../util/Util";
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 15:04:30
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:15:07
 * @FilePath: \electron-vite-vue\electron\services-impl\MemberServicesImpl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
const PAGESIZE = 5;

class MemberServicesImpl implements IMemberServices {


    addMember(member: IMember): Promise<number> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<number>((resolve, reject) => {
            if (member.phone == undefined || member.phone < 9999999999 || member.phone > 99999999999) resolve(0);
            memberMapper.findOne({ where: { [Op.or]: [{ phone: member.phone }, { plate_code: member.plate_code }] } })
                .then((v) => {
                    if (v != null) { resolve(2) }
                    else {
                        memberMapper.create(member as Record<any, any>)
                            .then(() => {
                                resolve(1);
                            })
                    }
                }).catch(e => reject(e))
        })
    }

    getMembers(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<IMember>> {
        const sequelize = SequelizeORM.ORM;
        const memberMapper = SequelizeORM.ORM.models.Member;
        const logsMapper = SequelizeORM.ORM.models.Logs;
        const { start, end } = Util.getMonthTimeStamps();
        return new Promise<IPage<IMember>>((resolve, reject) => {
            const offset = (page - 1) * 5;
            memberMapper.findAndCountAll({
                include: {
                    model: logsMapper, as: 'Logs', required: false,
                    attributes: [
                        [sequelize.fn('SUM', sequelize.col('amount')), 'month_consum']
                    ],
                    where: { createAt: { [Op.gt]: start , [Op.lte]: end } }
                },
                raw:true,
                offset: offset, limit: PAGESIZE
            })
                .then(({ count, rows }) => {
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

    searchByPhone(phone: number): Promise<IMember[]> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<IMember>((resolve, reject) => {
            const phoneHeader: string = phone + '\%';
            memberMapper.findAll({ where: { phone: { [Op.like]: phoneHeader } } })
                .then((members) => {
                    resolve(members)
                }).catch(e => reject(e))
        })
    }

    searchByPhoneLastIV(phone_iv: number): Promise<IMember[]> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<IMember>((resolve, reject) => {
            const phoneFoot: string = '\%' + phone_iv + '\%';
            memberMapper.findAll({ where: { phone: { [Op.like]: phoneFoot } } })
                .then((members) => {
                    resolve(members)
                }).catch(e => reject(e))
        })
    }

    pay(member: IMember, amount: number): Promise<boolean> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<boolean>((resolve, reject) => {
            memberMapper.findByPk(member.id)
                .then((theMember) => {
                    theMember.increment({ 'credit': amount })
                        .then(() => {
                            resolve(true)
                        }).catch(e => reject(e))
                }).catch(() => reject(false))
        })
    }

    removeMember(member: IMember): Promise<boolean> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<boolean>((resolve, reject) => {
            memberMapper.findByPk(member.id)
                .then((theMember) => {
                    theMember.destroy()
                        .then(() => {
                            resolve(true)
                        }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }

    modifiedMember(member: IMember): Promise<boolean> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        return new Promise<boolean>((resolve, reject) => {
            memberMapper.findByPk(member.id).then((theMember) => {
                theMember.set('name', member.name)
                theMember.set('plate_code', member.plate_code)
                theMember.set('sex', member.sex)
                theMember.set('credit', member.credit)
                theMember.save().then(() => { resolve(true) }).catch(e => reject(e))
            }).catch(e => reject(e))
        })
    }

    consume(member: IMember, goods: IGoods): Promise<ILogs> {
        const memberMapper = SequelizeORM.ORM.models.Member;
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<ILogs>((resolve, reject) => {
            memberMapper.findByPk(member.id)
                .then((theMember) => {
                    goodsMapper.findByPk(goods.id)
                        .then((theGoods) => {
                            const amount = (goods.count ?? 0) * (theGoods.getDataValue('price') as number);
                            const count = theGoods.getDataValue('count') as number + goods.count;
                            const afterCredit = theMember.getDataValue('credit') as number + amount;
                            console.log(count + ":" + afterCredit)
                            if (afterCredit >= 0 && count >= 0) {
                                theMember.increment({
                                    'sum_consum': -amount,
                                    'consum_count': 1,
                                    'credit': amount
                                }).then(() => {
                                    theGoods.increment({
                                        'count': goods.count,
                                    }).then(() => {
                                        logsMapper.create({ operation: 0, m_id: member.id, g_id: goods.id, amount: -amount })
                                            .then((createLogs) => {
                                                logsMapper.findByPk(createLogs.getDataValue('id'), { include: { all: true } })
                                                    .then((logs) => {
                                                        resolve(logs)
                                                    }).catch(e => reject(e))
                                            }).catch(e => reject(e))
                                    }).catch(e => reject(e))
                                }).catch(e => reject(e))
                            } else {
                                resolve(null)
                            }
                        }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }

}

const memberServicesImpl = new MemberServicesImpl();

export default memberServicesImpl;