<template>
  <div id="app">
      <appHeader @algorithmeSelected='selectedAlgorithme = $event'></appHeader>
      <info :selectedAlgorithme="selectedAlgorithme" @startVisualization="startVisualization = true"></info>
      <appGrid :startVisualisation="{
        selectedAlgorithme: selectedAlgorithme,
        startVisualization: startVisualization
        }"></appGrid>
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
      selectedAlgorithme: '',
      startVisualization: false
    }
  }
}
</script>

<style>
  body{
    background-color: #edf3ff;
  }
</style>
