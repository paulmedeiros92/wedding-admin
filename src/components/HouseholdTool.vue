<template>
  <div class="about">
    <h1>Household</h1>
    <GuestForm v-on:invitee="addInvitee"/>
    <GuestList title="Household" :guestList="household" />
    <md-button class="md-raised md-accent finalize">Finalize</md-button>
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
  margin-bottom: 20px;
}
.guestList {
  margin: auto;
}
.finalize {
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 50px;
  width: 150px;
}
</style>

