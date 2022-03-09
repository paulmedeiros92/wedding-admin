<template>
  <div class="mailing-list">
    <md-table
      v-model="list"
      :md-sort="currentSort"
      @update:mdSort="(value) => currentSort = value"
      :md-sort-order="currentSortOrder"
      @update:mdSortOrder="(value) => currentSortOrder = value"
      :md-sort-fn="customSort"
      md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{title}}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item, index }">
        <md-table-cell md-label="Hashword" md-sort-by="hashWord">{{ item.hashWord }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Mailed?" md-sort-by="isMailed">
          <md-icon v-if="item.isMailed" style="color:green">check</md-icon>
          <md-icon v-else style="color:red">close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Mark Mailed">
          <md-button class="md-icon-button md-raised md-primary" @click="() => deleteEvent(index)">
            <md-icon>send</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'mailing-list',
  props: {
    title: String,
    isLoading: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    }
  },
  data: () => ({
    currentSort: 'isMailed',
    currentSortOrder: 'desc',
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
    },
    deleteEvent(index) {
      this.$emit('send', index);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
