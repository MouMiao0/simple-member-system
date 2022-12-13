import { ModelDefined, Optional, Sequelize ,DataTypes} from 'sequelize';
/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 14:44:15
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-05 20:18:57
 * @FilePath: \electron-vite-vue\electron\services-impl\model-bind\Goods.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
/**商品创建可选参 */
type IGoodsCreation = Optional<IGoods,'id'|'logs'|'createAt'>

type Goods = ModelDefined<IGoods,IGoodsCreation>;

/**商品模型初始化函数 */
const InitGoods = (orm: Sequelize): Goods=>{
    return orm.define('Goods',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: DataTypes.TEXT, unique: true },
        price: DataTypes.INTEGER,
        count: DataTypes.INTEGER,
        createAt: { type: DataTypes.INTEGER, defaultValue: new Date().getTime() }
    }, {tableName: 'goods', timestamps: false });
}

export {Goods, InitGoods};