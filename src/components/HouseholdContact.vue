<template>
  <div class="household-contact md-layout">
    <div class="item md-layout-item md-small-size-33 md-large-size-50">
      <md-icon>home</md-icon>
      <span>{{ address }}</span>
    </div>
    <div class="item md-layout-item md-small-size-33 md-large-size-50">
      <md-icon>email</md-icon>
      <span>{{ email }}</span>
    </div>
    <div class="item md-layout-item md-small-size-33 md-large-size-50">
      <md-icon>key</md-icon>
      <span>{{ hashword }}</span>
    </div>
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
<style lang="scss" scoped>
.item {
  text-align: left;
  span {
    margin-left: 10px;
  }
}
</style>

