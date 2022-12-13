/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:23:29
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 05:31:49
 * @FilePath: \electron-vite-vue\electron\services\model-types\Revenue.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**
 * 收益
 */
 interface Revenue {
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