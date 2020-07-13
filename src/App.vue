<template>
  <div id="app">
      <appHeader @algorithmeSelected='selectedAlgorithme = $event'></appHeader>
      <info :selectedAlgorithme="selectedAlgorithme"></info>
      <appGrid :selectedAlgorithme="selectedAlgorithme"></appGrid>
  </div>
</template>

<script>
import appHeader from './components/header'
import appGrid from './components/grid'
import info from './components/info'
export default {
  name: 'App',
  components: {
   appHeader,
   appGrid,
   info
  },
  data: () => {
    return{
      selectedAlgorithme: ''
    }
  }
}
</script>

<style>
  body{
    background-color: #edf3ff;
  }
</style>
