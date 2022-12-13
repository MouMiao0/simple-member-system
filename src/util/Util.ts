import { ElMessage, ElMessageBox } from 'element-plus';
import { useServiceStore } from '../../src/Services'

/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-11 10:29:00
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-13 13:32:26
 * @FilePath: \electron-vite-vue\src\util\Util.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */

export default class Util {
    /**日期格式化 */
    static getYYMMDD(dateStamp: number) {
        const date = new Date(dateStamp);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const hours = date.getUTCHours() + 8 > 23 ? date.getUTCHours() - 16 : date.getUTCHours() + 8;
        const mimu = date.getUTCMinutes();
        return date.getUTCFullYear() + '年' + month + '月' + day + '日  '
            + (hours < 10 ? '0' + hours : hours) + ':' + (mimu < 10 ? '0' + mimu : mimu);
    }
    /**用户验证 */
    static verfiy(service: (...arg:any) => Promise<boolean>, ...args: any) {
        return new Promise<void>((resolve, reject) => {
            const userServices = useServiceStore().userServices;
            ElMessageBox.prompt('请输入密码', 'Tip', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    userServices.verfiy(value)
                        .then((state) => {
                            if (state) {
                                // console.log(args);
                                service.apply(this, args)
                                    .then((flag) => {
                                        if (flag) {
                                            ElMessage({
                                                type: 'success',
                                                message: `操作成功`,
                                            })
                                            resolve();
                                        } else {
                                            ElMessage({
                                                type: 'info',
                                                message: `操作失败`,
                                            })
                                            reject(`操作失败`);
                                        }
                                    })

                            } else {
                                ElMessage({
                                    type: 'info',
                                    message: `密码错误`,
                                })
                                reject(`密码错误`);
                            }
                        })
                })
        })
    }
}