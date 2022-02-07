<template>
  <div class="dashboard">
    <Statistics />
    <GuestList :title="Invitees" :isLoading="isLoading" :guestList="guestList" />
  </div>
</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue';
import GuestList from '@/components/GuestList.vue';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    Statistics,
    GuestList
  },
  computed: mapState({
    isLoading: state => state.isLoading,
    guestList: state => state.guestList,
  })
};
</script>
