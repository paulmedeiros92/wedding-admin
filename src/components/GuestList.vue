<template>
  <div class="guestList">
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>Hashword</md-table-head>
        <md-table-head>First Name</md-table-head>
        <md-table-head>Last Name</md-table-head>
        <md-table-head>Address</md-table-head>
        <md-table-head>Attending?</md-table-head>
        <md-table-head>Food</md-table-head>
        <md-table-head>Child?</md-table-head>
        <md-table-head>Notes</md-table-head>
      </md-table-row>

      <md-table-row v-for="guest in guestList" :key="guest.firstName + guest.lastName">
        <md-table-cell md-numeric>1111111111111</md-table-cell>
        <md-table-cell>{{ guest.firstName }}</md-table-cell>
        <md-table-cell>{{ guest.lastName }}</md-table-cell>
        <md-table-cell>{{ guest.address }}</md-table-cell>
        <md-table-cell>{{ guest.isAttending }}</md-table-cell>
        <md-table-cell>{{ guest.food }}</md-table-cell>
        <md-table-cell>{{ guest.isChild }}</md-table-cell>
        <md-table-cell>{{ guest.notes }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GuestList',
  props: {
    msg: String
  },
  computed: mapState({
    isLoading: state => state.isLoading,
    guestList: state => state.guestList,
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
