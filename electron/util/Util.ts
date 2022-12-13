/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-07 00:59:46
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-11 09:44:42
 * @FilePath: \electron-vite-vue\electron\util\Util.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { IpcMainInvokeEvent, ipcRenderer } from 'electron';
import Singleton from './Singleton';

export default class Util {
    
    /**获取月时间戳 */
    static getMonthTimeStamps(): { start: number, end: number }{
        // 获取时间戳 (本月第一天00.00.00  本月最后一天23.59.59)
        const data = new Date(); //本月
        data.setDate(1);
        data.setHours(0);
        data.setSeconds(0);
        data.setMinutes(0);
    
        const data1 = new Date(); // 下月
        if (data.getMonth() == 11) {
            data1.setMonth(0)
            data1.setUTCFullYear(data.getUTCFullYear()+1);
        } else {
            data1.setMonth(data.getMonth() + 1)
        }
        data1.setDate(1);
        data1.setHours(0);
        data1.setSeconds(0);
        data1.setMinutes(0);
    
        // const timeStart = Math.floor(data.getTime() / 1000);
        const timeStart = data.getTime();
        // const timeEnd = Math.floor(data1.getTime() / 1000) - 1;//(计算下月1号时间戳-1即可
        const timeEnd = data1.getTime() - 1;//(计算下月1号时间戳-1即可
    
        return { start: timeStart, end: timeEnd };
    }

}