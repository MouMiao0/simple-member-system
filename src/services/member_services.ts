/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:30:02
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 02:01:32
 * @FilePath: \electron-vite-vue\src\services\member_services.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import goods from "@/db/model/goods";
import IPage from "@/db/model/Ipage";
import logs from "@/db/model/logs";
import Member from "@/db/model/member";

/**
 * 会员服务
 */
export default interface member_services{

    /**
     * 浏览会员
     * @param page 页数
     * @param sort 排序方式 0-按时间, 1-按金额, 2-按姓名, 3-消费次数, 4-总消费金额, 5-月消费金额
     * @param desc 是否按降序排序
     * @returns 会员列表
     */
    get_members: (page: number = 0, sort: number = 0, desc: boolean = true)=>IPage<Member>

    /**
     * 添加会员
     * @param member 会员信息
     * @returns 添加结果
     */
    add_member: (member: Member)=>number

    /**
     * 完整手机号查找
     * @param phone 手机号
     * @returns 会员
     */
    search_by_phone: (phone: number)=>Member[]

    /**
     * 手机后四位查找
     * @param phone_iv 手机号后四位 
     * @returns 匹配的会员
     */
    search_by_phone_last_iv:(phone_iv: number)=>Member[]

    /**
     * 会员消费
     * @param goods 商品 
     * @returns 结果
     */
    consume:(goods: goods)=>logs

    /**
     * 会员充值
     * @param amount 金额 
     * @returns 充值结果
     */
    pay:(amount: number)=>boolean

    /**
     * 会员删除
     * @param member 会员信息 
     * @returns 删除结果
     */
    remove_member:(member:Member)=>boolean

    /**
     * 修改会员信息
     * @param member 会员信息
     * @returns 修改结果
     */
    modified_member: (member: Member)=>boolean
}