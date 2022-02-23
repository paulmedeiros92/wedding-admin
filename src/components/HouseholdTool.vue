<template>
  <div class="about">
    <h1>Household</h1>
    <ContactInfoForm v-model="contactInfo"/>
    <AttendeeForm />
    <Card title="Household (Preview)">
      <template v-slot:content>
        <div class="contact-info">
          <div class="contact-info__top">
            <md-icon>key</md-icon>
            <span class="md-list-item-text">{{ hashword }}</span>
            <md-icon>email</md-icon>
            <span class="md-list-item-text">{{ contactInfo.email }}</span>
          </div>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">{{ fancyAddress }}</span>
        </div>
        <GuestList title="Guests" :guestList="attendees" />
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

export default {
  name: 'Tools',
  components: {
    AttendeeForm,
    Card,
    GuestList,
    ContactInfoForm
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
  computed: {
    fancyAddress() {
      return this.contactInfo.address === '' ? 'Address'
        : `${this.contactInfo.address}, ${this.contactInfo.city} ${this.contactInfo.province} ${this.contactInfo.country}`;
    }
  },
};
</script>
<style scoped>
.guestForm, .attendeeForm {
  margin: auto;
  margin-bottom: 20px;
}
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

