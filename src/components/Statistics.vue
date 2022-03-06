<template>
  <div class="statistics">
    <Stat title="Attending" :value="$store.getters.attendeesAttending.length" />
    <Stat title="Children" :value="$store.getters.attendeesChildren.length" />
    <Stat title="Viewed" :value="$store.getters.attendeesViewed.length" />
  </div>
</template>

<script>
import Stat from './Stat.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Stat
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics {
  display: flex;
}
</style>
