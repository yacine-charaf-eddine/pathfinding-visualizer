<template>
  <div id="app">
      <appHeader></appHeader>
      <appGrid></appGrid>
  </div>
</template>

<script>
import appHeader from './components/header'
import appGrid from './components/Grid'
export default {
  name: 'App',
  components: {
   appHeader,
   appGrid
  }
}
</script>

<style>
</style>
