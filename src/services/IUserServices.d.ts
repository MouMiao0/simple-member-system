/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 12:40:00
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-06 04:56:55
 * @FilePath: \electron-vite-vue\src\services\IUserServices.d.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

/**
 * 主账号登陆
 */
interface IUserServices
{
    /**
     * 登陆
     * @param user_name 用户名 
     * @param password 密码
     * @returns 登陆结果;0 失败;1 成功; 
     */ 
    login:(user_name: string, password: string)=>Promise<number>


    /**
     * 修改账号名
     * @param before_user_name 修改前账号名  
     * @param after_user_name 修改后账号名
     * @returns 修改结果
     */
    modified_user_name:(before_user_name: string, after_user_name: string)=>Promise<number>


    /**
     * 修改密码
     * @param before_password 修改前账号密码
     * @param after_password 修改后账号密码
     * @returns 修改结果
     */
    modified_user_pw: (before_password: string, after_password: string)=>Promise<number>

    /**
     * 用户验证
     * @param password 密码
     * @returns 验证结果
     */
    verfiy: (password: string)=>Promise<boolean>
}