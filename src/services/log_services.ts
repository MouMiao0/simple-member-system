import Log from "@/db/model/logs";
import Revenue from "@/db/model/revenue";

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:52:31
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 16:35:32
 * @FilePath: \electron-vite-vue\src\services\log_services.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
export default interface log_services {
    /**
     * 统计营收
     * @returns  统计营收
     */
    info: () => Revenue

    /**
     * 获取日志
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    get_logs: (page?: number, sort?: number, desc?: boolean) => IPage<Log>


    /**
     * 会员消费
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    member_consumed: (page?: number, sort?: number, desc?: boolean) => IPage<Log>

    /**
     * 工资支出
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    employee_salaries: (page?: number, sort?: number, desc?: boolean) => IPage<Log>

    /**
     * 工资消费
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    goods_storaged: (page?: number, sort?: number, desc?: boolean) => IPage<Log>
}