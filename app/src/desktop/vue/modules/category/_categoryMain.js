
import components from '../components/Components';

export const vm = new Vue({
  components,
  data: {
    loading     : true,
  }
});

Vue.config.devtools = true