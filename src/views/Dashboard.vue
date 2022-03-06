<template>
  <div class="dashboard">
    <Statistics />
    <HouseholdAttendees
      title="Guests"
      :attendees="$store.getters.attendees"
      :isLoading="$store.getters.isLoading" />
  </div>
</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue';
import HouseholdAttendees from '@/components/HouseholdAttendees';

export default {
  name: 'dashboard',
  components: {
    Statistics,
    HouseholdAttendees,
  }
};
</script>
