<template>
  <div class="guestList">
    <md-table
      v-model="attendees"
      :md-sort="currentSort"
      @update:mdSort="(value) => currentSort = value"
      :md-sort-order="currentSortOrder"
      @update:mdSortOrder="(value) => currentSortOrder = value"
      :md-sort-fn="customSort"
      md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{title}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Hashword" md-sort-by="hashWord">{{ item.hashWord }}</md-table-cell>
        <md-table-cell md-label="First Name" md-sort-by="firstName">{{ item.firstName }}</md-table-cell>
        <md-table-cell md-label="Last Name" md-sort-by="lastName">{{ item.lastName }}</md-table-cell>
        <md-table-cell md-label="Confirmed?" md-sort-by="isAttending">
          <md-icon v-if="item.isAttending" style="color:green">check</md-icon>
          <md-icon v-else style="color:red">close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Viewed?" md-sort-by="hasViewed">
          <md-icon v-if="item.hasViewed" style="color:green">check</md-icon>
          <md-icon v-else style="color:red">close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Food Selection" md-sort-by="food">{{ item.food }}</md-table-cell>
        <md-table-cell md-label="Child?">
          <md-icon v-if="item.hasViewed" style="color:green">check</md-icon>
          <md-icon v-else style="color:red">close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Notes" md-sort-by="notes">{{ item.notes }}</md-table-cell>
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
    attendees: {
      type: Array,
      default: () => [],
    }
  },
  data: () => ({
    currentSort: 'isAttending',
    currentSortOrder: 'asc',
  }),
  methods: {
    customSort (value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;

        if (this.currentSortOrder === 'desc') {
          return a[sortBy].localeCompare ?
            a[sortBy].localeCompare(b[sortBy])
            : +a[sortBy] - +b[sortBy];
        }

        return b[sortBy].localeCompare ?
          b[sortBy].localeCompare(a[sortBy])
          : +b[sortBy] - +a[sortBy];
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
