import { Op } from "sequelize";
import SequelizeORM from "../db/SequelizeORM";
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:57:48
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 11:13:55
 * @FilePath: \electron-vite-vue\electron\services-impl\GoodsServicesImpl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
const PAGESIZE = 5;



class GoodsServicesImpl implements IGoodsServices {

    getGoods(page: number = 0, sort: number = 0, desc: boolean = true): Promise<Page<IGoods>> {
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        return new Promise<Page<IGoods>>((resolve, reject) => {
            const offset = (page - 1) * 5;
            goodsMapper.findAndCountAll({ offset: offset, limit: PAGESIZE })
                .then(({ rows, count }) => {
                    const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
                    resolve({
                        record: rows,
                        currentPage: page,
                        pageCounts: pageCounts,
                        pageSize: PAGESIZE,
                    })
                })
                .catch(e => reject(e))
        })
    };

    remove(goods: IGoods): Promise<boolean> {
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        return new Promise<boolean>((resolve, reject) => {
            goodsMapper.findByPk(goods.id)
                .then((theGoods) => {
                    theGoods.destroy()
                        .then(() => { resolve(true) })
                })
        })
    };

    modified(goods: IGoods): Promise<boolean> {
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        return new Promise<boolean>((resolve, reject) => {
            goodsMapper.findByPk(goods.id)
                .then((theGoods) => {
                    theGoods.name = goods.name
                    theGoods.price = goods.price
                    theGoods.count = goods.count
                    theGoods.save().then(() => {
                        resolve(true)
                    })
                }).catch(e => reject(e))
        })
    }

    queryGoods(name: string): Promise<IGoods[]> {
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        return new Promise<IGoods[]>((resolve, reject) => {
            const strLike = '\%' + name + '\%'
            goodsMapper.findAll({ where: { name: { [Op.like]: strLike } } })
                .then((goodsList) => {
                    resolve(goodsList)
                }).catch(e => reject(e))
        })
    };

    addGoods(goods: IGoods): Promise<boolean> {
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        return new Promise<boolean>((resolve, reject) => {
            goodsMapper.create(goods as Record<any, any>)
                .then(() => {
                    resolve(true)
                }).catch(e => reject(e))
        })
    };

    storage(goods: IGoods, amount: number): Promise<boolean> {
        const logsMapper = SequelizeORM.ORM.models.Logs;
        const goodsMapper = SequelizeORM.ORM.models.Goods;
        const incrementNum = goods.count;
        return new Promise<boolen>((resolve, reject) => {
            goodsMapper.findByPk(goods.id)
                .then((theGoods) => {
                    theGoods.increment({ 'count': incrementNum })
                        .then(() => {
                            logsMapper.create({ operation: 1, g_id: goods.id, goods_count: incrementNum, amount: amount })
                                .then(() => {
                                    resolve(true);
                                })
                        }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    };
}

const goodsServicesImpl = new GoodsServicesImpl();

export default goodsServicesImpl;