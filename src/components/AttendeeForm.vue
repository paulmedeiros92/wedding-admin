<template>
  <div class="attendeeForm">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="md-layout-item md-size-100 md-layout md-gutter">
        <div class="md-layout-item md-small-size-50">
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">First Name</label>
            <md-input name="first-name" id="first-name" autocomplete="given-name"
              v-model="form.firstName" :disabled="sending" @keyup.enter="validateUser" />
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-50">
          <md-field :class="getValidationClass('lastName')">
            <label for="last-name">Last Name</label>
            <md-input name="last-name" id="last-name" autocomplete="family-name"
              v-model="form.lastName" :disabled="sending" @keyup.enter="validateUser" />
            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
          </md-field>
        </div>
      </div>

      <div class="md-layout-item md-size-100 md-layout md-gutter">
        <div class="md-layout-item md-small-size-50">
          <md-checkbox v-model="form.isChild">Kidz meal (0-10 yrs)</md-checkbox>
        </div>
        <div class="md-layout-item md-small-size-50">
          <md-field v-if="!form.isChild" :class="getValidationClass('food')">
            <label for="food">Entrees</label>
            <md-select name="food" id="food" v-model="form.food" md-dense :disabled="sending">
              <md-option v-for="food in adultFood" :value="food" :key="food">{{food}}</md-option>
            </md-select>
            <span class="md-error" v-if="$v.form.food.required">The food is required</span>
          </md-field>
        </div>
      </div>

      <div class="md-layout-item md-size-100 md-layout md-gutter">
        <md-field>
          <label for="notes">Notes</label>
          <md-textarea name="notes" id="notes" v-model="form.notes" :disabled="sending"
                @keydown.enter.exact.prevent @keyup.enter.exact="validateUser" md-autogrow></md-textarea>
        </md-field>
      </div>
      <md-button type="submit" class="md-raised md-primary" :disabled="sending">Add</md-button>
    </form>
  </div>
</template>

<script>
import { vuelidateMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AttendeeForm',
  mixins: vuelidateMixin,
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      isChild: false,
      food: null,
      notes: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    adultFood: ["No Selection", "Chicken", "Lobster", "Vegetarian"],
  }),
  props: {
    attendee: Object,
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      isChild: {
        required,
      },
      food: {
        required,
      },
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return { 'md-invalid': field.$invalid && field.$dirty };
      }
    },
    clearForm () {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.isChild = false;
      this.form.food = null;
      this.form.notes = null;
    },
    validateUser () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('attendee', {...this.form});
        this.clearForm();
      }
    }
  },
  watch: {
    attendee: {
      handler(attendee) {
        if (attendee) {
          this.form = { ...attendee };
        }
      },
      immediate: true,
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout {
  justify-content: center;
}
</style>
