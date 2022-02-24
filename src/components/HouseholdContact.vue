<template>
  <div class="household-contact">
    <div class="household-contact__top">
      <md-icon>key</md-icon>
      <span class="md-list-item-text">{{ hashword }}</span>
      <md-icon>email</md-icon>
      <span class="md-list-item-text">{{ email }}</span>
    </div>
    <md-icon>home</md-icon>
    <span class="md-list-item-text">{{ fancyAddress }}</span>
  </div>
</template>
<script>
export default {
  name: 'HouseholdContact',
  components: {},
  props: {
    hashword: String,
    email: String,
    address: String,
  }
};
</script>
<style scoped>
.household-contact__top {
  display: flex;
}
</style>

