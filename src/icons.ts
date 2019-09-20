import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faSadTear, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
  library.add(faBomb);
  library.add(faSadTear);
  library.add(faFlag);

  Vue.component('font-awesome-icon', FontAwesomeIcon);
};
