/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:42:49
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 19:07:42
 * @FilePath: \electron-vite-vue\src\services\IEmployeesSerivces.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */


/**
 * 员工服务
 */
interface IEmployeesSerivces {

    /**
     *  获取员工信息
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-库存排序, 2-价格排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 员工页面
     */
    getEmployees: (page?: number, sort?: number, desc?: boolean) => Promise<IPage<IEmployee>>

    /**
     * 添加员工
     * @param employee 员工
     */
    addEmployee: (employee: IEmployee) => Promise<IEmployee>

    /**
     * 修改员工信息
     * @param employee 员工信息
     * @returns 修改结果
     */
    modifiedEmployee: (employee: IEmployee) => Promise<IEmployee>

    /**
     * 删除员工
     * @param employee 员工
     * @returns 删除结果 
     */
    removeEmployee: (employee: IEmployee) => Promise<boolean>

    /**发放薪水 */
    paySalary: () => Promise<boolean>

}
