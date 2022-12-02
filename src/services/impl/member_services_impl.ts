/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-01 15:04:30
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 02:07:42
 * @FilePath: \electron-vite-vue\src\services\impl\member_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import member_services from "@/services/member_services";
import Member from "@/db/model/member";
import IPage from "@/db/model/Ipage";

class member_services_impl implements member_services {

    public get_members(page: number = 0, sort: number = 0, desc: boolean = true): IPage<Member> {
        return {
            record: [
                { id: 1, name: "会员1", phone: 132, sex: 1, credit: 1000 },
                { id: 2, name: "会员2", phone: 152, sex: 1, credit: 1000 },
                { id: 3, name: "会员3", phone: 172, sex: 1, credit: 1000 }
            ],
            currentPage: 1,
            pageSize: 3,
            pageCounts: 1,
            total: 3
        };
    }

    public search_by_phone(phone: number): Member[] {
        return [
            { id: 1, name: "会员1", phone: 132, sex: 1, credit: 1000 },
            { id: 2, name: "会员2", phone: 152, sex: 1, credit: 1000 }
        ];
    }

    public search_by_phone_last_iv(phone_iv: number): Member[] {
        return [
            { id: 1, name: "涛", phone: 5891, sex: 1, credit: 1000 },
            { id: 2, name: "网", phone: 3201, sex: 1, credit: 1000 }
        ];
    };
}

export default new member_services_impl();