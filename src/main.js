/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// axios
import axios from 'axios'

const app = createApp(App)

// app.provide('serverHost', 'http://192.168.0.4:80/')
app.provide('serverHost', 'http://192.168.0.6:80/')
// app.provide('serverHost', 'http://127.0.0.1:8081/')

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = 'application/json'
app.config.globalProperties.$http = axios

registerPlugins(app)

app.mount('#app')
