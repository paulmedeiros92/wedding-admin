<template>
  <div id="app">
    <md-toolbar class="md-title" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Wedding Dashboard</h3>
      <md-button @click="() => $router.push({name: 'dashboard'})">
        Dashboard
      </md-button>
      <md-button @click="() => $router.push({name: 'tools'})">
        Tools
      </md-button>
      <md-button @click="() => $router.push({name: 'mail'})">
        Mail
      </md-button>
    </md-toolbar>
    <router-view/>
    
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-title {
  text-align: left;
}
.md-table-cell-container {
  text-align: left;
}
</style>
