<template>
  <div class="dashboard">
    <Statistics/>
    <GuestList/>
  </div>
</template>

<script>
// @ is an alias to /src
import Statistics from '@/components/Statistics.vue'
import GuestList from '@/components/GuestList.vue'

export default {
  name: 'dashboard',
  components: {
    Statistics,
    GuestList
  }
}
</script>
