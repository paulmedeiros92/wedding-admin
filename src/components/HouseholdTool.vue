<template>
  <div class="about">
    <h1>Household</h1>
    <GuestList :guestList="household" />
    <GuestForm v-on:invitee="addInvitee"/>
  </div>
</template>
<script>
import GuestList from '@/components/GuestList.vue';
import GuestForm from '@/components/GuestForm.vue';

export default {
  name: 'Tools',
  components: {
    GuestList,
    GuestForm
  },
  data: () => ({
    household: []
  }),
  methods: {
    addInvitee(invitee) {
      this.household.push(invitee);
    }
  }
};
</script>
<style scoped>
.guestForm {
  margin: auto;
}
</style>

