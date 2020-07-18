<template>
  <div class="card m-2 p-2">
    <ul class="list-group list-group-flush list-group-horizontal mx-auto">
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="visited d-inline-flex align-middle mr-2"></div>
          <h5>
            visited node:
            <span>{{stats.visitedNodes}} node(s)</span>
          </h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="path mr-2"></div>
          <h5>
            shortest path node:
            <span>{{stats.pathNodes}} node(s)</span>
          </h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="timer mr-2"></div>
          <h5>
            time:
            <span>{{stats.time}} ms</span>
          </h5>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["selectedAlgorithme", "stats"]
};
</script>

<style scoped>
.visited {
  width: 25px;
  height: 25px;
  background-color: rgba(0, 190, 218, 0.75);
}
h5 {
  color: #011627;
}
.path {
  width: 25px;
  height: 25px;
  background-color: #ffff3f;
}
.timer {
  width: 25px;
  height: 25px;
  background-image: url("../assets/timer.svg");
  background-repeat: no-repeat;
  background-position: center;
}
span {
  color: #ff006e;
}
.list-group-item {
  border: none;
}
</style>