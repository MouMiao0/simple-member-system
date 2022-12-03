/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 13:42:49
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 12:37:59
 * @FilePath: \electron-vite-vue\src\services\employees_serivces.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Employee from "@/db/model/employee";
import IPage from "@/db/model/Ipage";

/**
 * 员工服务
 */
export default interface employees_serivces {

    /**
     *  获取员工信息
     * @param page 页数
     * @param sort 排序方式 : 0-添加时间排序, 1-库存排序, 2-价格排序, 3-名字排序
     * @param desc 是否为降序排序
     * @returns 员工页面
     */
    get_employees: (page?: number, sort?:number, desc?: boolean)=> Promise<IPage<Employee>>

    /**
     * 添加员工
     * @param employee 员工
     */
    add_employee: (employee: Employee)=> Promise<Employee>

    /**
     * 修改员工信息
     * @param employee 员工信息
     * @returns 修改结果
     */
    modified_employee: (employee: Employee)=> Promise<Employee> 

    /**
     * 删除员工
     * @param employee 员工
     * @returns 删除结果 
     */
    remove_employee: (employee: Employee)=> Promise<boolean>
    
}