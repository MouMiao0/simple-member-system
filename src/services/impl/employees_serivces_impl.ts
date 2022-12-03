/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 12:02:37
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 13:18:44
 * @FilePath: \electron-vite-vue\src\services\impl\employees_serivces_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

import Employee from '@/db/model/employee';
import IEmployeesSerivces from '@/services/employees_serivces'
import IPage from '@/db/model/Ipage';

class EmployeesSerivcesImpl implements IEmployeesSerivces{
    
    async get_employees (page: number = 0, sort: number = 0, desc: boolean = true): Promise<IPage<Employee>>{
        return {} as IPage<Employee>;
    };
    
    async add_employee(employee: Employee) : Promise<Employee>{
        return {} as Employee;
    };

    async modified_employee(employee: Employee) : Promise<Employee>{
        return {} as Employee;
    }

    async remove_employee(employee: Employee) : Promise<boolean>{
        return false;
    }
}

export default new EmployeesSerivcesImpl();