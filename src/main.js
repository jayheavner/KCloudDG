import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueI18n from 'vue-i18n'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'
import router from './router';

import * as en from './Localization/en-US.json'
import * as es from './Localization/es-ES.json'

import './index.css';
import './components/Admin/Admin.css';

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAVOq4C-rf7JVeHt6ws9vsf-KHIRpueASg',
  }
});
Vue.use(VueI18n);
Vue.use(VueScrollTo, {
  duration: 1000,
  easing: 'ease-in-out',
});

let i18n = new VueI18n({
  locale: 'en-US',
  messages: {
    'en-US': en,
    'es-ES': es,
  },
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
