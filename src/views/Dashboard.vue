<template>
  <div class="dashboard">
    <Statistics />
    <HouseholdAttendees
      title="Guests"
      :attendees="$store.getters.attendees"
      :isLoading="$store.getters.isLoading" />
    <common-table
      title="Guests"
      :items="attendees"
      :labels="labels"
      currentSort=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue';
import HouseholdAttendees from '@/components/HouseholdAttendees';
import CommonTable from '@/common/Table.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    Statistics,
    HouseholdAttendees,
    CommonTable,
  },
  data: () => ({
    labels: [
      'Hashword', 'First Name', 'Last Name', 'Confirmed?', 'Viewed?', 'Address',
      'Food Selection', 'Child?', 'Notes'
    ]
  }),
  computed: {
    ...mapGetters([
      'attendees',
      'isLoading'
    ])
  }
};
</script>
