<template>
  <div class="contact-info-form">
    <form novalidate class="md-layout">
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
            <md-input type="city" name="city" id="city" autocomplete="home city" v-model="form.city" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.city.required">The city is required</span>
            <span class="md-error" v-else-if="!$v.form.city.city">Invalid city</span>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('province')">
            <label for="province">State/Province</label>
            <md-input type="province" name="province" id="province" autocomplete="address-level1" v-model="form.province" :disabled="sending" />
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
        <span class="md-error" v-if="!$v.form.email.email">Invalid email</span>
      </md-field>
    </form>
  </div>
</template>

<script>

export default {
  name: 'ContactInfoForm',
  inject: ['$v'],
  model: {
    prop: 'form',
  },
  props: {
    form: Object,
    sending: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return { 'md-invalid': field.$invalid && field.$dirty };
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout {
  justify-content: center;
}
</style>
