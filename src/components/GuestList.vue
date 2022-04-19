<template>
  <div class="guestList">
    <md-table v-model="guestList" md-sort="firstName" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{title}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item, index }">
        <md-table-cell md-label="First Name" md-sort-by="firstName">{{ item.firstName }}</md-table-cell>
        <md-table-cell md-label="Last Name" md-sort-by="lastName">{{ item.lastName }}</md-table-cell>
        <md-table-cell md-label="Food Selection" md-sort-by="food">{{ item.food }}</md-table-cell>
        <md-table-cell md-label="Child?">{{ item.isChild }}</md-table-cell>
        <md-table-cell md-label="Notes" md-sort-by="notes">{{ item.notes }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-raised md-accent" @click="$emit('delete', index)">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised md-accent" @click="$emit('edit', index)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'GuestList',
  props: {
    title: String,
    isLoading: {
      type: Boolean,
      default: false,
    },
    guestList: Array
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
