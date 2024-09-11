/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

import '@/styles/style.scss';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import VueTablerIcons from 'vue-tabler-icons';
import VueApexCharts from 'vue3-apexcharts';
import Vue3Marquee from 'vue3-marquee';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';

// google-fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';

// axios
import axios from 'axios';
//i18
import messages from '@/utils/locales/messages';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: 'zh',
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true
});

const app = createApp(App)

app.use(PerfectScrollbarPlugin);
app.use(VueApexCharts);
app.use(VueTablerIcons);
app.use(Vue3Marquee);
app.use(Antd);
app.use(i18n);

// app.provide('serverHost', 'http://192.168.0.9:8080/')
app.provide('serverHost', 'http://127.0.0.1:8080/')

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true;
app.config.globalProperties.$http = axios

registerPlugins(app)

app.mount('#app')
