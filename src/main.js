import { createApp } from 'vue';
import App from './App.vue';
import router from './router/baseRouter';
import i18n from './i18n';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

import 'devextreme/dist/css/dx.light.css';

/* Base Components  */
import Button from '@/components/base/Button.vue';
import Dropdown from '@/components/base/Dropdown.vue';
import SelectBox from '@/components/base/SelectBox.vue';
import Icon from '@/components/base/Icon.vue';
import Tooltip from '@/components/base/Tooltip.vue';

/* add icons to the library */
library.add(faUserSecret)
createApp(App)
.use(i18n)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.component('b-button', Button)
.component('b-dropdown', Dropdown)
.component('b-select-box', SelectBox)
.component('b-icon', Icon)
.component('b-tooltip', Tooltip)
.mount('#app')
