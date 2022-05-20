<template>
  <div class="about md-layout">
    <div class="about__input md-layout-item md-size-100 md-layout">
      <Card
        class="md-layout-item md-size-50 md-small-size-100"
        title="Contact Info"
      >
        <template v-slot:content><ContactInfoForm v-model="form" /></template>
      </Card>
      <Card
        class="md-layout-item md-size-50 md-small-size-100"
        title="Attendee"
      >
        <template v-slot:content
          ><AttendeeForm
            :attendee="attendeeForEdit"
            @attendee="(event) => addAttendee(event)"
        /></template>
      </Card>
    </div>
    <Card class="md-layout-item md-size-100" title="Household (Preview)">
      <template v-slot:content>
        <HouseholdContact
          hashword="N/A"
          :email="fancyEmail"
          :address="fancyAddress"
        />
        <GuestList
          title="Guests"
          :guestList="attendees"
          @delete="deleteAttendee"
          @edit="editAttendee"
        />
      </template>
    </Card>
    <md-button class="md-raised md-accent finalize" @click="validateUser"
      >Finalize</md-button
    >
    <md-snackbar
      md-position="center"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ snackText }}</span>
    </md-snackbar>
  </div>
</template>
<script>
import { vuelidateMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import firebaseService from "@/services/firebase-service.js";
import AttendeeForm from "@/components/AttendeeForm.vue";
import GuestList from "@/components/GuestList.vue";
import ContactInfoForm from "@/components/ContactInfoForm.vue";
import Card from "@/components/Card.vue";
import HouseholdContact from "@/components/HouseholdContact.vue";

export default {
  name: "HouseholdTool",
  mixins: vuelidateMixin,
  components: {
    AttendeeForm,
    Card,
    GuestList,
    ContactInfoForm,
    HouseholdContact,
  },
  provide() {
    return { $v: this.$v };
  },
  data: () => ({
    form: {
      address: "",
      city: "",
      province: "",
      country: "",
      email: "",
    },
    attendees: [],
    snackText: "Add a tasty description!",
    showSnackbar: false,
    duration: 4000,
    isInfinity: false,
    household: null,
    attendeeForEdit: null,
  }),
  async created() {
    const attendeeId = this.$route.params.id;
    if (attendeeId) {
      this.attendees = (
        await firebaseService.getHouseholdByMemberId(attendeeId)
      ).data.data;
      const attendeeRef = this.attendees[0];
      this.form = {
        address: attendeeRef.address,
        city: attendeeRef.city,
        province: attendeeRef.province,
        country: attendeeRef.country,
        email: attendeeRef.email,
      };
    }
  },
  methods: {
    addAttendee(attendee) {
      this.attendees = [...this.attendees, attendee];
      this.snackText = `Added ${attendee.firstName} ${attendee.lastName} to the list.`;
      this.showSnackbar = true;
    },
    deleteAttendee(index) {
      const removed = this.attendees.splice(index, 1)[0];
      this.showSnackbar = true;
      this.snackText = `Removed ${removed.firstName} ${removed.lastName} from the list.`;
    },
    editAttendee(index) {
      this.attendeeForEdit = this.attendees.splice(index, 1)[0];
    },
    clearForm() {
      this.$v.$reset();
      this.form.address = null;
      this.form.city = null;
      this.form.province = null;
      this.form.country = null;
      this.form.email = null;
      this.attendees = [];
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const attendees = this.attendees.map((attendee) => ({
          ...attendee,
          isAttending: false,
          ...this.form,
        }));
        firebaseService
          .postAttendees(attendees)
          .then(() => {
            this.showSnackbar = true;
            this.snackText = `Added ${this.form.email}'s attendees to database.`;
            this.clearForm();
          })
          .catch(() => {
            this.showSnackbar = true;
            this.snackText = `Failed to add ${this.form.email}'s attendees to database.`;
          });
      } else {
        this.showSnackbar = true;
        this.snackText = `Invalid form`;
      }
    },
  },
  computed: {
    fancyAddress() {
      return !this.form.address
        ? "Address"
        : `${this.form.address}, ${this.form.city} ${this.form.province} ${this.form.country}`;
    },
    fancyEmail() {
      return !this.form.email ? "test@testerton.com" : this.form.email;
    },
  },
  validations: {
    form: {
      address: {
        required,
        maxLength: minLength(3),
      },
      city: {
        required,
        maxLength: minLength(3),
      },
      province: {
        required,
        maxLength: minLength(2),
      },
      country: {
        required,
        maxLength: minLength(2),
      },
      email: {
        email,
      },
    },
  },
};
</script>
<style scoped>
.contact-info__top {
  display: flex;
}
.household-contact {
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
  z-index: 2;
}
</style>
