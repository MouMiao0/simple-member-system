/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:52:31
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 22:39:32
 * @FilePath: \electron-vite-vue\electron\services\ILogServices.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**日志服务 */
interface ILogsServices {
    /**
     * 统计营收
     * @returns  统计营收
     */
    info: () => Promise<Revenue>

    /**
     * 获取日志
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    getLogs: (page?: number, sort?: number, desc?: boolean) => Promise<Page<ILogs>>


    /**
     * 会员消费
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    memberConsumed: (page?: number, sort?: number, desc?: boolean) =>Promise<Page<ILogs>>

    /**
     * 工资支出
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    employeeSalaries: (page?: number, sort?: number, desc?: boolean) =>Promise<Page<ILogs>>

    /**
     * 工资消费
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-金额排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 日志页
     */
    goodsStoraged: (page?: number, sort?: number, desc?: boolean) =>Promise<Page<ILogs>>
}