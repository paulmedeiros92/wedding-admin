<template>
  <div class="statistics">
    <Stat title="Attending" :value="$store.getters.attendeesAttending" />
    <Stat title="Children" :value="$store.getters.attendeesChild" />
    <Stat title="Viewed" :value="$store.getters.householdsViewed" />
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
