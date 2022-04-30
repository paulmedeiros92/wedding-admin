<template>
  <div class="dashboard">
    <Statistics />
    <HouseholdAttendees
      title="Guests"
      :attendees="attendees"
      :isLoading="isLoading" />
  </div>
</template>

<script>
import Statistics from '@/components/Statistics.vue';
import HouseholdAttendees from '@/components/HouseholdAttendees';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    Statistics,
    HouseholdAttendees,
  },
  mounted() {
    this.$store.dispatch('getAttendees');
  },
  computed: {
    ...mapState(['attendees', 'isLoading'])
  }
};
</script>
