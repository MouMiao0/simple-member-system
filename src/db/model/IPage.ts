/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 01:54:26
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 02:37:08
 * @FilePath: \electron-vite-vue\src\db\model\IPage.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
export default interface IPage<T>{
    /**
     * 数据
     */
    record: T[]

    /**
     * 当前页序
     */
    currentPage: number

    /**
     * 每页个数
     */
    pageSize: number
    
    /**
     * 页面数量
     */
    pageCounts: number

    /**
     * 总条数
     */
    total?: number
}