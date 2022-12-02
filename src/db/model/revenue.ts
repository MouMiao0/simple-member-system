/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:23:29
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 15:30:31
 * @FilePath: \electron-vite-vue\src\db\model\revenue.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**
 * 收益
 */
export default class Revenue {
    /**
     * 总收入
     */
    sumIncome: number

    /**
     * 总支出
     */
    sumExpend: number

    /**
     * 月收入
     */
    monthIncome: number

    /**
     * 月支出
     */
    monthExpend: number    

    /**
     * 总收益
     */
    sumRevenue: number

    /**
     * 月收益
     */
    monthRevenue: number
}