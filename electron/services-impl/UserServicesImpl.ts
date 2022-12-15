import SequelizeORM from "../db/SequelizeORM";
import { User } from "./model-bind/User";
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 17:10:40
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-15 18:36:52
 * @FilePath: \electron-vite-vue\electron\services-impl\UserServicesImpl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */


class UserServicesImpl implements IUserServices {

    userName?: string;

    userPW?: string;

    login(user_name: string, password: string): Promise<number> {
        const userMapper = SequelizeORM.ORM.models.User;
        return new Promise((resolve, reject) => {
            userMapper.findOne({
                where: {
                    name: user_name,
                    pw: password
                }
            }).then((user) => {
                if (user && user.id) {
                    this.userName = user.getDataValue('name');
                    this.userPW = user.getDataValue('pw');
                    resolve(1);
                } else {
                    resolve(0);
                }
            }).catch((e) => {
                console.log(e);
                resolve(2)
            })
        })
    }

    verfiy(password: string): Promise<boolean> {
        const userMapper = SequelizeORM.ORM.models.User;
        return new Promise<boolean>((resolve, reject) => {
            if (!this.userName) resolve(false);
            userMapper.findOne({
                where: {
                    name: this.userName,
                    pw: password
                }
            }).then((user) => {
                if (user && (user.getDataValue('id') as number) === 1) resolve(true)
                else resolve(false);
            }).catch(() => { resolve(false) })
        })
    };

    modifedUserPw(before_password: string, after_password: string): Promise<number> {
        const userMapper = SequelizeORM.ORM.models.User;
        return new Promise<number>((resolve, reject) => {
            this.verfiy(before_password)
                .then((state) => {
                    if (state) {
                        userMapper.findOne({
                            where: {
                                name: this.userName,
                                pw: before_password
                            }
                        }).then((user) => {
                            user.pw = after_password;
                            user.save().then(() => { resolve(1) }).catch(e => reject(e))
                        }).catch(e => reject(e))
                    } else {
                        resolve(0)
                    }
                }).catch(() => resolve(0))
        })
    };

    modifiedUserName(before_user_name: string, after_user_name: string): Promise<number> {
        const userMapper = SequelizeORM.ORM.models.User;
        return new Promise<number>((resolve, reject) => {
            if (!this.userPW) resolve(0);
            userMapper.findOne({
                where: {
                    name: before_user_name,
                    pw: this.userPW
                }
            }).then((user) => {
                user.name = after_user_name;
                user.save().then(() => { resolve(1) }).catch(e => reject(e))
            }).catch(e => reject(e))
        })
    };
}

const userServices = new UserServicesImpl();

export default userServices;