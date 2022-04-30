<template>
  <div class="mail">
    <MailingList
      title="Mailing List"
      :list="mailingList"
      @send="sendMail"/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import MailingList from '@/components/MailingList.vue';
import firebaseService from '@/services/firebase-service.js';

export default {
  name: 'Mail',
  components: {
    MailingList
  },
  methods: {
    async sendMail(selectedAttendee) {
      const mailedAttendees = this.attendees.filter((attendee) => (
        attendee.address === selectedAttendee.address &&
        attendee.city === selectedAttendee.city &&
        attendee.province === selectedAttendee.province &&
        attendee.country === selectedAttendee.country
      )).map((attendee) => ({...attendee, isMailed: !attendee.isMailed}));
      await firebaseService.postAttendees(mailedAttendees);
      this.$store.dispatch('getAttendees');
    }
  },
  computed: {
    ...mapState(['attendees']),
    mailingList: function () {
      const householdSet = {};
      this.attendees.forEach(({firstName, lastName, address, city, province, country, isMailed}) => {
        householdSet[`${address}, ${city} ${province} ${country}`] = {
          nameString: `${firstName} ${lastName}`,
          isMailed,
          addressString: `${address}, ${city} ${province} ${country}`,
          address,
          city,
          province,
          country
        };
      });
      return Object.values(householdSet);
    }
  }
};
</script>
<style scoped>
.guestForm {
  margin: auto;
}
</style>

