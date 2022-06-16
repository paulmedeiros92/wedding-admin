<template>
  <div class="statistics">
    <Stat title="Attending" :value="attendeesAttending.length" />
    <Stat title="Viewed" :value="attendeesViewed.length" />
    <Stat title="Total" :value="attendees.length" />
    <Stat title="Children" :value="attendeesChildren.length" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Stat from "./Stat.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Stat,
  },
  computed: {
    ...mapGetters([
      "attendeesAttending",
      "attendeesChildren",
      "attendeesViewed",
    ]),
    ...mapState(["attendees"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics {
  display: flex;
}
</style>
