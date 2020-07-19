<template>
  <div id="app">
    <transition appear enter-active-class="animate__animated animate__fadeInDown">
      <app-header
        :visualizing="visualizating"
        @algorithmeSelected="selectedAlgorithme = $event"
        @startVisualization="visualizating = true"
        @clearWalls="clearWalls = true"
        @clearPath="clearPath = true"
        @speedSelected="speed = $event"
      ></app-header>
    </transition>
    <transition appear enter-active-class="animate__animated animate__fadeInRight">
      <app-footer></app-footer>
    </transition>

    <transition appear enter-active-class="animate__animated animate__fadeIn">
      <appGrid
        :startVisualisation="{
        selectedAlgorithme: selectedAlgorithme,
        visualizating: visualizating,
        clearWalls: clearWalls,
        clearPath: clearPath,
        speed: speed
        }"
        @visualisationIsDone="visualizating = false"
        @wallsCleaned="clearWalls = false"
        @pathCleaned="clearPath = false"
        @executionStats="stats = $event"
      ></appGrid>
    </transition>
    <transition mode="in-out" enter-active-class="animate__animated animate__zoomIn">
      <app-info :selectedAlgorithme="selectedAlgorithme" :stats="stats" v-if="stats.time !== null"></app-info>
    </transition>
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
      visualizating: false,
      clearWalls: false,
      clearPath: false,
      speed: {
        name: "medium",
        nodesSpeed: 30,
        pathSpeed: 50
      },
      stats: {
        time: null,
        visitedNodes: null,
        pathNodes: null
      }
    };
  }
};
</script>

<style>
body {
  background-color: #edf3ff;
}
</style>
