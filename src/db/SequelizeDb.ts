/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-12-02 20:25:54
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-03 04:10:58
 * @FilePath: \electron-vite-vue\src\db\SequelizeDb.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import path from "path";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite', storage: './src/db/dev.db',
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;