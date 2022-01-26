<template>
  <div class="statistics">
    <Stat title="Attending" :value="$store.getters.guestsAttending" />
    <Stat title="Children" :value="$store.getters.guestsChild" />
    <Stat title="Viewed" :value="$store.getters.guestsViewed" />    
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
