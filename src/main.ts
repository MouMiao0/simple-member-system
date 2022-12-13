/*
 * @Author: MouMeo 1606958950@qq.com
 * @Date: 2022-11-30 00:02:42
 * @LastEditors: MouMeo 1606958950@qq.com
 * @LastEditTime: 2022-12-06 05:28:19
 * @FilePath: \electron-vite-vue\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by MouMeo 1606958950@qq.com, All Rights Reserved. 
 */
import { App, createApp } from 'vue'
import { createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import AppVue from './App.vue'
import { router } from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia();

const app : App = createApp(AppVue);

app
  .use(pinia)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
