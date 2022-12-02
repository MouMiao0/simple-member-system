/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 12:02:37
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 12:49:09
 * @FilePath: \electron-vite-vue\src\services\impl\employees_serivces_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Employee from '@/db/model/employee';
import IEmployeesSerivces from '@/services/employees_serivces'
import IPage from '@/db/model/Ipage';

class EmployeesSerivcesImpl implements IEmployeesSerivces{
    
    get_employees (page: number = 0, sort: number = 0, desc: boolean = true): IPage<Employee>{
        return {
            record:[
                {name: '员工1', phone: "911", salary: 2000},
                {name: '员工2', phone: "233", salary: 2000},
                {name: '员工3', phone: "114", salary: 2000},
                {name: '员工4', phone: "1514", salary: 2000},
            ],
            currentPage: 1,
            pageSize: 3,
            pageCounts: 2,
            total: 4
        }
    };
    
}

export default new EmployeesSerivcesImpl();