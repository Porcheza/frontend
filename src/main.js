import './assets/main.scss';

import { createApp } from 'vue';
import pinia from './plugins/pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { registerFontAwesomIcon } from './plugins/font-awesome';
import { registerDayJs } from './plugins/day';

const initialize = async () => {
    const app = createApp(App);
    
    app.use(pinia);

    registerFontAwesomIcon();

    registerDayJs();

    app.use(router);
  
    await router.isReady();
  
    app.mount('#app');
  };
  
initialize();
