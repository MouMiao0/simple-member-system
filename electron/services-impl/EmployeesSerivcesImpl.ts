import SequelizeORM, { store } from '../db/SequelizeORM'
import Singleton from '../util/Singleton';
import { Employee } from './model-bind/Employee';

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 12:02:37
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-14 19:29:25
 * @FilePath: \electron-vite-vue\electron\services-impl\EmployeesSerivcesImpl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
const PAGESIZE = 5;

class EmployeesSerivcesImpl implements IEmployeesSerivces {


    getEmployees(page: number = 1, sort: number = 0, desc: boolean = true): Promise<Page<IEmployee>> {
        const employeesMapper = SequelizeORM.ORM.models.Employee;
        return new Promise<Page<IEmployee>>((resolve, reject) => {
            const offset = (page - 1) * 5;
            employeesMapper.findAndCountAll({ offset: offset, limit: PAGESIZE })
                .then(({ count, rows }) => {
                    const pageCounts = count > PAGESIZE ? Math.floor(count / PAGESIZE) + 1 : 1;
                    resolve({
                        record: rows,
                        currentPage: page,
                        pageCounts: pageCounts,
                        pageSize: PAGESIZE,
                    })
                }).catch(e => reject(e))
        })
    };

    addEmployee(employee: IEmployee): Promise<IEmployee> {
        const employeesMapper = SequelizeORM.ORM.models.Employee;
        return new Promise<IEmployee>((resolve, reject) => {
            employeesMapper.create(employee).then((e) => {
                resolve(e)
            }).catch(e => reject(e))
        })
    };

    modifiedEmployee(employee: IEmployee): Promise<IEmployee> {
        const employeesMapper = SequelizeORM.ORM.models.Employee;
        return new Promise<IEmployee>((resolve, reject) => {
            employeesMapper.findByPk(employee.id)
                .then((theEmployee) => {
                    theEmployee.set('name', employee.name);
                    theEmployee.set('phone', employee.phone);
                    theEmployee.set('salary', employee.salary);
                    theEmployee.save().then((v) => { resolve(v) }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }

    removeEmployee(employee: IEmployee): Promise<boolean> {
        const employeesMapper = SequelizeORM.ORM.models.Employee;
        return new Promise<IEmployee>((resolve, reject) => {
            employeesMapper.findByPk(employee.id)
                .then((theEmployee) => {
                    theEmployee.destroy().then(() => { resolve(true) }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }


    paySalary(): Promise<boolean> {
        const employeeMapper = SequelizeORM.ORM.models.Employee;
        const logsMapper = SequelizeORM.ORM.models.Logs;
        return new Promise<boolean>((resolve, reject) => {
            employeeMapper.findAll()
                .then((employees)=>{
                    employees.forEach((theEmployee)=>{
                        logsMapper.create({
                            operation:2,
                            e_id: theEmployee.id,
                            amount: theEmployee.salary
                        })
                    })
                })
                .finally(()=>{resolve(true)}).catch(e=>reject(e))
        })
    }
}

const employeesSerivcesImpl = new EmployeesSerivcesImpl();

export default employeesSerivcesImpl