<template>
  <div class="card">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">{{ title }}</div>
        </md-card-header>
        <md-card-content>
          <slot name="content">Put some content!</slot>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <slot name="actions"></slot>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Card',
    props: {
      title: String,
      sending: {
        type: Boolean,
        default: false,
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout {
  justify-content: center;
}
</style>
