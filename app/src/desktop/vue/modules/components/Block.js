
export default {
		template: '<div class="filter__block" v-show="blocking"></div>',
  name  : 'block',
  data(){
    return {
      blocking : false,
    }
  }
}
