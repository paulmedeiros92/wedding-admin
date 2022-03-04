<template>
  <div class="dashboard">
    <Statistics />
  </div>
</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    Statistics,
  },
  computed: mapState({
    isLoading: state => state.isLoading,
    households: state => state.households,
  })
};
</script>
