import './assets/main.scss';

import { createApp } from 'vue';
import pinia from './plugins/pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap';
// import 'vue-skeletor/dist/vue-skeletor.css';

const initialize = async () => {
    const app = createApp(App);
    
    app.use(pinia);

    app.use(router);
  
    await router.isReady();
  
    app.mount('#app');
  };
  
initialize();
