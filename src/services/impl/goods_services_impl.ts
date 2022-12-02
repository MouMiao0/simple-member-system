/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 23:57:48
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 04:51:12
 * @FilePath: \electron-vite-vue\src\services\impl\goods_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Goods from "@/db/model/goods";
import goods_services from "@/services/goods_services";

class goods_services_impl implements goods_services {
    get_goods(page: number = 0, sort: number = 0, desc: boolean = true): IPage<Goods> {
        return {
            record: [
                { name: "商品1", price: 20, count: 20 },
                { name: "商品2", price: 3, count: 0 },
                { name: "商品3", price: 5, count: 10 }
            ],
            currentPage: 1,
            pageSize: 3,
            pageCounts: 1,
            total: 3
        }
    };

    modified(goods: Goods): boolean {
        return true
    };

    queryGoods(name: string): Goods[] {
        return this.get_goods().record;
    };
}

export default new goods_services_impl();