<template>
  <div class="household-attendees">
    <md-table
      v-model="items"
      :md-sort="currentSort"
      @update:mdSort="(value) => currentSort = value"
      :md-sort-order="currentSortOrder"
      @update:mdSortOrder="(value) => currentSortOrder = value"
      :md-sort-fn="customSort"
      @md-selected="onSelect"
      md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">{{title}}</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="Nothing to see here..."
        :md-description="`Nothing found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
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
  name: 'HouseholdAttendees',
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
    search: null,
    items: [],
  }),
  created() {
    this.items = this.attendees;
  },
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
    },
    searchOnTable () {
      if (this.search) {
        this.items = this.attendees.filter((attendee) => JSON.stringify(attendee).toLowerCase().includes(this.search.toLowerCase()));
      } else {
        this.items = this.attendees;
      }
    },
    onSelect(item) {
      this.$router.push({ path: `/tools/${item.hashWord}`});
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
