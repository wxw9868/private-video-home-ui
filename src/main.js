/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import '@/styles/style.scss';
// import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';

// google-fonts
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/700.css';

// import '@fontsource/inter/400.css';
// import '@fontsource/inter/500.css';
// import '@fontsource/inter/600.css';
// import '@fontsource/inter/700.css';

// import '@fontsource/poppins/400.css';
// import '@fontsource/poppins/500.css';
// import '@fontsource/poppins/600.css';
// import '@fontsource/poppins/700.css';

// import '@fontsource/public-sans/400.css';
// import '@fontsource/public-sans/500.css';
// import '@fontsource/public-sans/600.css';

// Composables
import { createApp } from 'vue'

// axios
import axios from 'axios'

const app = createApp(App)

// app.use(PerfectScrollbarPlugin);
// app.use(Antd);

app.provide('serverHost', 'http://192.168.0.9:8080/')
// app.provide('serverHost', 'http://127.0.0.1:8081/')

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = 'application/json'
app.config.globalProperties.$http = axios

registerPlugins(app)

app.mount('#app')
