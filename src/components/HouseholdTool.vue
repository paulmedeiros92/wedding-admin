<template>
  <div class="about md-layout">
    <div class="about__input md-layout-item md-size-100 md-layout">
      <Card class="md-layout-item md-size-50 md-small-size-100" title="Contact Info">
        <template v-slot:content><ContactInfoForm v-model="contactInfo" /></template>
      </Card>
      <Card class="md-layout-item md-size-50 md-small-size-100" title="Attendee">
        <template v-slot:content><AttendeeForm @attendee="(event) => addAttendee(event)" /></template>
      </Card>
    </div>
    <Card class="md-layout-item md-size-100" title="Household (Preview)">
      <template v-slot:content>
        <HouseholdContact :hashword="hashword" :email="contactInfo.email" :address="fancyAddress" />
        <GuestList title="Guests" :guestList="attendees" @delete="(index) => deleteAttendee(index)" />
      </template>
    </Card>
    <md-button class="md-raised md-accent finalize">Finalize</md-button>
  </div>
</template>
<script>
import AttendeeForm from '@/components/AttendeeForm.vue';
import GuestList from '@/components/GuestList.vue';
import ContactInfoForm from '@/components/ContactInfoForm.vue';
import Card from '@/components/Card.vue';
import HouseholdContact from '@/components/HouseholdContact.vue';

export default {
  name: 'Tools',
  components: {
    AttendeeForm,
    Card,
    GuestList,
    ContactInfoForm,
    HouseholdContact,
  },
  data: () => ({
    contactInfo: {
      address: '',
      city: '',
      province: '',
      country: '',
      email: 'Email',
    },
    hashword: 'Hashword',
    attendees: [],
  }),
  methods: {
    addAttendee(attendee) {
      console.log('add attendee' + attendee);
      this.attendees.push(attendee);
    },
    deleteAttendee(index) {
      this.attendees.splice(index, 1);
    }
  },
  computed: {
    fancyAddress() {
      return this.contactInfo.address === '' ? 'Address'
        : `${this.contactInfo.address}, ${this.contactInfo.city} ${this.contactInfo.province} ${this.contactInfo.country}`;
    }
  },
};
</script>
<style scoped>
.contact-info__top {
  display: flex;
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

