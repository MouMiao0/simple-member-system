/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 01:54:26
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 05:10:19
 * @FilePath: \electron-vite-vue\electron\services\model-types\IPage.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**
 * 分页数据
 */
interface Page<T>{
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