<template>
  <div class="statistics">
    <Stat title="Attending" :value="attendeesAttending.length" />
    <Stat title="Children" :value="attendeesChildren.length" />
    <Stat title="Viewed" :value="attendeesViewed.length" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stat from './Stat.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Stat
  },
  computed: {
    ...mapGetters(['attendeesAttending', 'attendeesChildren', 'attendeesViewed'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics {
  display: flex;
}
</style>
