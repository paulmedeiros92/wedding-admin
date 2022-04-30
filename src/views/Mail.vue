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
    sendMail(index) {
      const newHousehold = this.households[index];
      newHousehold.isMailed = true;
      firebaseService.updateHousehold(newHousehold);
    }
  },
  computed: {
    ...mapState(['attendees']),
    mailingList: function () {
      return this.attendees.map(({hashWord, attendees, address, city, province, country, isMailed}) => ({
        hashWord,
        name: `${attendees[0].firstName} ${attendees[0].lastName}`,
        isMailed,
        address: `${address}, ${city} ${province} ${country}`
      }));
    }
  }
};
</script>
<style scoped>
.guestForm {
  margin: auto;
}
</style>

