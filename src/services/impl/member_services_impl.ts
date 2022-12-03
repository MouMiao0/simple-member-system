/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 15:04:30
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:28:01
 * @FilePath: \electron-vite-vue\src\services\impl\member_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import member_services from "@/services/member_services";
import Member from "@/db/model/member";
import IPage from "@/db/model/Ipage";
import { PAGESIZE } from "./StaticVar";
import { Op } from "sequelize";
import  Goods  from "@/db/model/goods";
import Logs from "@/db/model/logs";

class member_services_impl implements member_services {


    public async add_member(member: Member): Promise<number> {
        if (member.phone == undefined || member.phone < 9999999999 || member.phone > 99999999999) return 0;
        const phoneHas = await Member.findOne({ where: { phone: member.phone } });
        if (phoneHas != null) return 2;
        const plateCodeHas = await Member.findOne({ where: { plate_code: member.plate_code } });
        if (plateCodeHas != null) return 3;
        const resMember = await Member.create(member);
        this.count++;
        return 1;
    }

    public async get_members(page: number = 1, sort: number = 0, desc: boolean = true): Promise<IPage<Member>> {
        const offset = (page - 1) * 5;
        const {count, rows} = await Member.findAndCountAll({ offset: offset, limit: PAGESIZE });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    }

    public async search_by_phone(phone: number): Promise<Member[]> {
        const phoneHeader: string = phone + '\%';
        const members = await Member.findAll({ where: { phone: { [Op.like]: phoneHeader } } })
        return members as Member[];
    }

    public async search_by_phone_last_iv(phone_iv: number): Promise<Member[]> {
        const phoneFoot: string = '\%' + phone_iv + '\%';
        const members = await Member.findAll({ where: { phone: { [Op.like]: phoneFoot } } })
        return members as Member[];
    }

    public async pay(member:Member,amount: number): Promise<boolean>{
        const theMember = await Member.findByPk(member.id)
        if(!theMember) return false;
        theMember.credit += amount;
        await theMember.save();
        return true;
    }

    public async remove_member(member:Member):Promise<boolean>{
        const theMember = await Member.findByPk(member.id);
        if(theMember){
            await theMember.destroy();
            return true;
        }else{
            return false;
        }
    }

    public async modified_member (member: Member):Promise<boolean>{
        const theMember = await Member.findByPk(member.id);
        if(theMember){
            theMember.name = member.name
            theMember.plate_code = member.plate_code
            theMember.sex = member.sex
            theMember.credit = member.credit         
            await theMember.save();
            return true;
        }else{
            return false;
        }
    }

    async consume(member:Member, goods: Goods):Promise<Logs>{
        const theMember = await Member.findByPk(member.id);
        const theGoods = await Goods.findByPk(goods.id);
        const amount = -1 * goods.count * (theGoods.price ?? 0);
        if(theMember && theGoods){
            theMember.sum_consum += amount;
            theMember.month_consume += amount;
            theMember.consum_count++;
            theMember.credit -= amount;
            theGoods.count += goods.count;
            if(theMember.credit >= 0){
                await theMember.save()
                await theGoods.save()
                const logs = await Logs.create({operation:0, member:theMember,goods:theGoods,amount: amount});
                return logs;
            }
        }
        return null;
    }
}

export default new member_services_impl();