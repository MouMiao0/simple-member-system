/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 17:10:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 13:31:36
 * @FilePath: \electron-vite-vue\src\services\impl\user_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import user_services from '@/services/user_services'
import User from '@/db/model/user';
import { useServiceStore } from '@/service';

class user_services_impl implements user_services{

    login(user_name: string, password: string): Promise<number>{
        return new Promise((resolve,reject)=>{
            User.findOne({
                where:{
                    name: user_name,
                    pw: password
                }
            }).then((user)=>{
                if(user && user.id == 1){
                    resolve(1);
                }else{
                    resolve(0)
                }
            }).catch((e)=>{
                reject(e)
            })
        })
    }

    async verfiy(password: string) : Promise<boolean>{
        const user = await User.findOne({where:{pw:password}});
        return user != null;
    };

    async modifed_user_pw(before_password: string, after_password: string):Promise<number>{
        return 0
    };

    async modified_user_name(before_user_name: string, after_user_name: string):Promise<number>{
        return 0
    };
}

export default new user_services_impl();
