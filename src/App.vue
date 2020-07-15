<template>
  <div id="app">
    <app-header
      @algorithmeSelected="selectedAlgorithme = $event"
      @startVisualization="startVisualization = true"
      @clearWalls="clearWalls = true"
      @clearPath="clearPath = true"
    ></app-header>
    <app-info :selectedAlgorithme="selectedAlgorithme"></app-info>
    <appGrid
      :startVisualisation="{
        selectedAlgorithme: selectedAlgorithme,
        startVisualization: startVisualization,
        clearWalls: clearWalls,
        clearPath: clearPath
        }"
      @visualisationIsDone="startVisualization = false"
      @wallsCleaned="clearWalls = false"
      @pathCleaned="clearPath = false"
    ></appGrid>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./components/app_header";
import appGrid from "./components/app_grid";
import appInfo from "./components/app_info";
import appFooter from "./components/app_footer";
export default {
  name: "App",
  components: {
    appHeader,
    appGrid,
    appInfo,
    appFooter
  },
  data: () => {
    return {
      selectedAlgorithme: "",
      startVisualization: false,
      clearWalls: false,
      clearPath: false
    };
  }
};
</script>

<style>
body {
  background-color: #edf3ff;
}
</style>
