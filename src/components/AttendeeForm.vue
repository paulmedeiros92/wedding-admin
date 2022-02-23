<template>
  <div class="attendeeForm">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Attendee</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="form.isChild">Child meal (0-10 yrs)</md-checkbox>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('food')">
                <label for="food">Food</label>
                <md-select name="food" id="food" v-model="form.food" md-dense :disabled="sending">
                  <md-option v-for="food in foods" :value="food" :key="food">{{food}}</md-option>
                </md-select>
                <span class="md-error" v-if="$v.form.food.required">The food is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="sending">Add</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { vuelidateMixin } from 'vuelidate';
import {
  required, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'AttendeeForm',
  mixins: vuelidateMixin,
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      isChild: false,
      food: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    adultFood: ["Chicken", "Fish", "Beef", "Vegetarian"],
    childFood: ["Chicken Nugzz", "Grilled Cheezze"],
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
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
    },
    validateUser () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('invitee', {...this.form});
        this.clearForm();
      }
    }
  },
  computed: {
    foods: function () {
      return this.form.isChild ? this.childFood : this.adultFood;
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
