/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:30:02
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 13:06:22
 * @FilePath: \electron-vite-vue\src\services\member_services.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Goods from "@/db/model/goods";
import IPage from "@/db/model/Ipage";
import Logs from "@/db/model/logs";
import member from "@/db/model/member";
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
    get_members: (page?: number, sort?: number , desc?: boolean )=>Promise<IPage<Member>>

    /**
     * 添加会员
     * @param member 会员信息
     * @returns 添加结果: 0-手机号位数不对, 1-成功, 2-手机号重复, 3-车牌号重复
     */
    add_member: (member: Member)=>Promise<number>

    /**
     * 完整手机号查找
     * @param phone 手机号
     * @returns 会员
     */
    search_by_phone: (phone: number)=>Promise<Member[]>

    /**
     * 手机后四位查找
     * @param phone_iv 手机号后四位 
     * @returns 匹配的会员
     */
    search_by_phone_last_iv:(phone_iv: number)=>Promise<Member[]>

    /**
     * 会员消费
     * @param goods 商品 
     * @returns 结果
     */
    consume:(member:Member, goods: Goods)=>Promise<Logs>

    /**
     * 会员充值
     * @param member 会员
     * @param amount 金额 
     * @returns 充值结果
     */
    pay:(member: Member, amount: number)=>Promise<boolean>

    /**
     * 会员删除
     * @param member 会员信息 
     * @returns 删除结果
     */
    remove_member:(member:Member)=>Promise<boolean>

    /**
     * 修改会员信息
     * @param member 会员信息
     * @returns 修改结果
     */
    modified_member: (member: Member)=>Promise<boolean>
}