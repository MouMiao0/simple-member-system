/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 15:19:56
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-02 16:39:47
 * @FilePath: \electron-vite-vue\src\services\impl\log_services_impl.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import Revenue from "@/db/model/revenue";
import log_services from "@/services/log_services";
import IPage from "@/db/model/Ipage";
import Log from "@/db/model/logs";


class log_services_impl implements log_services {
    info(): Revenue {
        return {
            sumIncome: 0,
            sumExpend: 0,
            monthIncome: 0,
            monthExpend: 0,
            sumRevenue: 0,
            monthRevenue: 0
        }
    }

    get_logs(page?: number = 0, sort?: number = 0, desc?: boolean = true): IPage<Log> {
        return {
            record: [
                {
                    operation: 0,
                    member: {
                        name: "mm",
                        phone: 122
                    },
                    goods: {
                        name: "ggg"
                    },
                    amount: 200
                },
                {
                    operation: 1,
                    goods: {
                        name: "ggg"
                    },
                    amount: 100
                },
                {
                    operation: 2,
                    employee: {
                        name: "ee",
                        phone: 591
                    },
                    amount: 100
                }
            ],
        }
    }

    member_consumed(page?: number = 0, sort?: number = 0, desc?: boolean = true): IPage<Log> {
        return {
            record: [
                {
                    operation: 0,
                    member: {
                        name: "mm",
                        phone: 122
                    },
                    goods: {
                        name: "ggg"
                    },
                    amount: 200
                },
                {
                    operation: 0,
                    member: {
                        name: "m2",
                        phone: 32
                    },
                    goods: {
                        name: "ggg"
                    },
                    amount: 200
                },
                {
                    operation: 0,
                    member: {
                        name: "m3",
                        phone: 15
                    },
                    goods: {
                        name: "ggg"
                    },
                    amount: 200
                },

            ],
        }
    }

    goods_storaged(page?: number = 0, sort?: number = 0, desc?: boolean = true): IPage<Log> {
        return {
            record: [
                {
                    operation: 1,
                    goods: {
                        name: "ggg"
                    },
                    amount: 100
                }, {
                    operation: 1,
                    goods: {
                        name: "g2"
                    },
                    amount: 100
                }, {
                    operation: 1,
                    goods: {
                        name: "g3"
                    },
                    amount: 100
                },
            ],
        }
    }

    employee_salaries(page?: number = 0, sort?: number = 0, desc?: boolean = true): IPage<Log> {
        return {
            record: [
                {
                    operation: 2,
                    employee: {
                        name: "ee",
                        phone: 591
                    },
                    amount: 100
                }, {
                    operation: 2,
                    employee: {
                        name: "e2e",
                        phone: 591
                    },
                    amount: 100
                }, {
                    operation: 2,
                    employee: {
                        name: "ee3",
                        phone: 591
                    },
                    amount: 100
                }
            ],
        }
    }
}

export default new log_services_impl();