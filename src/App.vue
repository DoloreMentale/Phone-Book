<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js/dist/esm/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

export default {
  mounted() {
   this.$store.dispatch('isLoggedLS')
    this.$store.dispatch('contactsListLS')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

section {
  min-height: 100vh;
  width: 100%;
}
</style>
