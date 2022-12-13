/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:23:24
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 10:16:47
 * @FilePath: \electron-vite-vue\src\services\model-types\IMember.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

/**会员 */
interface IMember {

    id?: number

    name?: string

    plate_code?: number

    phone?: number

    sex?: number

    credit?: number

    createAt?: Date

    Logs?:{    
        /**月消费 */
        month_consume?: number
    }

    sum_consum?: number

    consum_count?: number
}


