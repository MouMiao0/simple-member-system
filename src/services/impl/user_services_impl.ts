/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 17:10:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-11-30 20:37:03
 * @FilePath: \electron-vite-vue\src\services\impl\user_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import user_services from '@/services/user_services'

class user_services_impl implements user_services{

    login(user_name: string, password: string): number{
        return 1;
    }

}

export default new user_services_impl();
