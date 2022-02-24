<template>
  <div class="contact-info-form">
    <form novalidate class="md-layout">
      <md-field :class="getValidationClass('address')">
        <label for="address">Address</label>
        <md-input type="address" name="address" id="address" autocomplete="address" 
          :value="form.address" @input="validateUser()" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.address.required">The address is required</span>
        <span class="md-error" v-else-if="!$v.form.address.address">Invalid address</span>
      </md-field>
      
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('city')">
            <label for="city">City</label>
            <md-input type="city" name="city" id="city" autocomplete="home city"
              :value="form.city" @input="validateUser()" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.city.required">The city is required</span>
            <span class="md-error" v-else-if="!$v.form.city.city">Invalid city</span>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('province')">
            <label for="province">State/Province</label>
            <md-input type="province" name="province" id="province" autocomplete="province"
              :value="form.province" @input="validateUser()" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.province.required">The province is required</span>
            <span class="md-error" v-else-if="!$v.form.province.province">Invalid province</span>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('country')">
            <label for="country">Country</label>
            <md-input type="country" name="country" id="country" autocomplete="country"
              :value="form.country" @input="validateUser()" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.country.required">The country is required</span>
            <span class="md-error" v-else-if="!$v.form.country.country">Invalid country</span>
          </md-field>
        </div>
      </div>

      <md-field :class="getValidationClass('email')">
        <label for="email">Email</label>
        <md-input type="email" name="email" id="email" autocomplete="email"
          :value="form.email" @input="validateUser()" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
      </md-field>
    </form>
  </div>
</template>

<script>
import { vuelidateMixin } from 'vuelidate';
import {
  required, email, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'ContactInfoForm',
  mixins: vuelidateMixin,
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: Object
  },
  data: () => ({
    sending: false,
  }),
  validations: {
    form: {
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
      console.log(`${fieldName} validating...`);
      const field = this.$v.form[fieldName];
      if (field) {
        console.log(`invalid?:${field.$invalid}`);
        console.log(`formInvalid?:${this.$v.$invalid}`);
        return { 'md-invalid': field.$invalid && field.$dirty };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.address = null;
      this.form.city = null;
      this.form.province = null;
      this.form.country = null;
      this.form.email = null;
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log('change event');
        this.$emit('input', {...this.form});
        this.clearForm();
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout {
  justify-content: center;
}
</style>
