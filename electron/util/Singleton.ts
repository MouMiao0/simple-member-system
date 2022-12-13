/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-06 20:59:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-09 22:25:09
 * @FilePath: \electron-vite-vue\electron\util\Singleton.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**单例抽象实现 */
export default abstract class Singleton<T>{

    protected static instance: T|null = null;

    public constructor() { };

    public static InstanceAsync<T>(c: { new(): T }): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (!Singleton<T>.instance) {
                Singleton<T>.instance = new c();
            }
            resolve(Singleton<T>.instance);
        })
    }

    public static Instance<T>(c: { new(): T }): T {
        if (!Singleton<T>.instance) {
            Singleton<T>.instance = new c();
        }
        return (Singleton<T>.instance);
    }
}