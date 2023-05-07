import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import DateFormat from '@voidsolutions/vue-dateformat'
import { DateTime } from 'vue-luxon';

const app = createApp(App);

app.use(DateTime);

app.mount('#app')
