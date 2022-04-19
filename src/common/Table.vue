<template>
  <div class="common-table">
    <md-table
      v-model="searchedItems"
      :md-sort="currentSort"
      @update:mdSort="(value) => currentSort = value"
      :md-sort-order="currentSortOrder"
      @update:mdSortOrder="(value) => currentSortOrder = value"
      :md-sort-fn="customSort"
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
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          v-for="(column, index) of columns"
          :key="column.label"
          :md-label="labels[index]"
          :md-sort-by="column.key">
          <md-icon
            v-if="column.isBoolean"
            :class="{ green: item[column.key], boolean}">
            {{item[column.key] ? "check" : "close"}}
          </md-icon>
          <span v-else>{{ item[column.key] }}</span>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    title: String,
    isLoading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      required: true,
    },
    currentSort: {
      type: String,
      required: true,
    },
    currentSortOrder: {
      type: String,
      validator: function(value) {
        return ['asc', 'desc'].includes(value);
      },
      default: 'asc',
    }
  },
  data: () => ({
    search: null,
    searchedItems: [],
  }),
  created() {
    this.searchedItems = this.items;
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
        this.searchedItems = this.items.filter((attendee) => JSON.stringify(attendee).toLowerCase().includes(this.search.toLowerCase()));
      } else {
        this.searchedItems = this.items;
      }
    }
  },
  computed: {
    columns() {
      const item = this.items[0];
      return Object.keys(item).map((key) => {
        item[key]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-toolbar-section-end {
  flex: 0;
}
.boolean {
  color: red;
}
.green {
  color: green;
}
</style>
