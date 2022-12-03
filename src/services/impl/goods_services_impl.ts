/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:57:48
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 11:31:32
 * @FilePath: \electron-vite-vue\src\services\impl\goods_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Goods from "@/db/model/goods";
import Logs from "@/db/model/logs";
import goods_services from "@/services/goods_services";
import { Op } from "sequelize";
import { PAGESIZE } from "./StaticVar";

class goods_services_impl implements goods_services {

    async get_goods(page: number = 0, sort: number = 0, desc: boolean = true): Promise<IPage<Goods>> {
        const offset = (page - 1) * 5;
        const {count, rows} = await Goods.findAndCountAll({ offset: offset, limit: PAGESIZE });
        const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
        return {
            record: rows,
            currentPage: page,
            pageCounts: pageCounts,
            pageSize: PAGESIZE,
        }
    };

    async remove(goods: Goods) :Promise<boolean>{
        const theGoods = await Goods.findByPk(goods.id)
        if(theGoods){
            await theGoods.destroy();
            return true;
        }else{
            return false
        }
    };

    async modified(goods: Goods) :Promise<boolean>{
        const theGoods = await Goods.findByPk(goods.id)
        if(theGoods){
            theGoods.name = goods.name
            theGoods.price = goods.price
            theGoods.count = goods.count
            await theGoods.save();
            return true;
        }else{
            return false
        }
    }

    async queryGoods(name: string):Promise<Goods[]> {
        const strLike = '\%'+name+'\%'
        const goodsList = Goods.findAll({where:{name:{[Op.like]:strLike}}});
        return goodsList as Goods[];
    };

    async addGoods(goods: Goods):Promise<boolean>{
        const theGoods = await Goods.create(goods);
        if(theGoods.id!=null){
            return true
        }else{
            return false
        }
    };

    async storage(goods: Goods, amount: number):Promise<boolean>{
        const theGoods = await Goods.findByPk(goods.id);
        if(theGoods){
            theGoods.count = goods.count;
            await theGoods.save();
            await Logs.create({operation: 1,g_id : goods.id, amount:amount});
            return true;
        }else{
            return false;
        }
    };
}

export default new goods_services_impl();