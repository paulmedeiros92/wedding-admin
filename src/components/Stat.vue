<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{ title }}</div>
      </md-card-header>
      <md-card-content>{{ value }}</md-card-content>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    value: Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
