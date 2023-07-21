import { createApp } from 'vue';
import App from './App.vue';
import router from './router/baseRouter';
import i18n from './i18n';
import store from '@/store/store'
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
import TextBox from '@/components/base/TextBox.vue';
import TextArea from '@/components/base/TextArea.vue';
import NumberBox from '@/components/base/NumberBox.vue';
import DateBox from '@/components/base/DateBox.vue';
import Checkbox from '@/components/base/Checkbox.vue';
import BaseGrid from '@/components/base/grid/BaseGrid.vue';
import Validate from '@/components/base/Validate.vue';
import SettingLayout from '@/components/layout/SettingLayout.vue';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxStringLengthRule,
  DxRangeRule
} from 'devextreme-vue/validator';

/* add icons to the library */
library.add(faUserSecret)
createApp(App)
.use(i18n)
.use(router)
.use(store)
.component('DxValidator', DxValidator)
.component('DxRequiredRule', DxRequiredRule)
.component('DxCompareRule', DxCompareRule)
.component('DxEmailRule', DxEmailRule)
.component('DxStringLengthRule', DxStringLengthRule)
.component('DxRangeRule', DxRangeRule)
.component('font-awesome-icon', FontAwesomeIcon)
.component('b-button', Button)
.component('b-dropdown', Dropdown)
.component('b-select-box', SelectBox)
.component('b-icon', Icon)
.component('b-tooltip', Tooltip)
.component('b-text-box', TextBox)
.component('b-text-area', TextArea)
.component('b-number-box', NumberBox)
.component('b-date-box', DateBox)
.component('b-check-box', Checkbox)
.component('b-grid', BaseGrid)
.component('b-validate', Validate)
.component('b-setting-layout', SettingLayout)
.mount('#app')
