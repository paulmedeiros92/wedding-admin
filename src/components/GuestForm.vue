<template>
  <div class="guestForm">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Invite</div>
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
              <md-checkbox v-model="form.isChild">Child meal (ages 0-10)</md-checkbox>
            </div>
            <div class="md-layout-item md-small-size-100" v-if="!form.isChild">
              <md-field :class="getValidationClass('food')">
                <label for="food">Food</label>
                <md-select name="food" id="food" v-model="form.food" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="Yum">Yum</md-option>
                  <md-option value="Dum">Dum</md-option>
                </md-select>
                <span class="md-error">The food is required</span>
              </md-field>
            </div>
          </div>


          <md-field :class="getValidationClass('address')">
            <label for="address">Address</label>
            <md-input type="address" name="address" id="address" autocomplete="address" v-model="form.address" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.address.required">The address is required</span>
            <span class="md-error" v-else-if="!$v.form.address.address">Invalid address</span>
          </md-field>
          
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('city')">
                <label for="city">City</label>
                <md-input type="city" name="city" id="city" autocomplete="city" v-model="form.city" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.city.required">The city is required</span>
                <span class="md-error" v-else-if="!$v.form.city.city">Invalid city</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('province')">
                <label for="province">State/Province</label>
                <md-input type="province" name="province" id="province" autocomplete="province" v-model="form.province" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.province.required">The province is required</span>
                <span class="md-error" v-else-if="!$v.form.province.province">Invalid province</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('country')">
                <label for="country">Country</label>
                <md-input type="country" name="country" id="country" autocomplete="country" v-model="form.country" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.country.required">The country is required</span>
                <span class="md-error" v-else-if="!$v.form.country.country">Invalid country</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Add household member</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { vuelidateMixin } from 'vuelidate';
import {
  required, email, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'GuestForm',
  mixins: vuelidateMixin,
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      isChild: null,
      food: null,
      address: null,
      city: null,
      province: null,
      country: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
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
      address: {
        required,
        maxLength: minLength(3)
      },
      city: {
        required,
        maxLength: minLength(3)
      },
      province: {
        required,
        maxLength: minLength(2)
      },
      country: {
        required,
        maxLength: minLength(2)
      },
      email: {
        required,
        email
      }
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
      this.form.isChild = null;
      this.form.food = null;
      this.form.address = null;
      this.form.city = null;
      this.form.province = null;
      this.form.country = null;
      this.form.email = null;
    },
    validateUser () {
      this.$v.$touch();
      console.log(`form validation isInvalid:${this.$v.$invalid}`);
      if (!this.$v.$invalid) {
        console.log('valid form being added');
        this.$emit('invitee', this.form);
        this.clearForm();
      }
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
