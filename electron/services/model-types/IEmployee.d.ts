/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 15:04:55
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 05:06:02
 * @FilePath: \electron-vite-vue\electron\services\model-types\Employee.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

/**
 * 员工
 */
 interface IEmployee {

    id?: number

    name?: string

    phone?: number

    salary?: number

    createAt: Date

    logs: ILogs

}




