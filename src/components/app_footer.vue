<template>
  <div class="card m-2">
    <ul class="list-group list-group-flush list-group-horizontal mx-auto">
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="start mr-2"></div>
          <h5>start node</h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="target d-inline-flex align-middle mr-2"></div>
          <h5>target node</h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="wall d-inline-flex align-middle mr-2"></div>
          <h5>wall node</h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="unvisited d-inline-flex align-middle mr-2"></div>
          <h5>unvisited node</h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="visited d-inline-flex align-middle mr-2"></div>
          <h5>visited node</h5>
        </div>
      </li>
      <li class="list-group-item">
        <div class="d-inline-flex align-middle">
          <div class="path mr-2"></div>
          <h5>shortest path node</h5>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style>
.start {
  width: 25px;
  height: 25px;
  background-image: url("../assets/location_marker.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.target {
  width: 25px;
  height: 25px;
  background-image: url("../assets/target_marker.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.wall {
  width: 25px;
  height: 25px;
  background-color: #011627;
}
.path {
  width: 25px;
  height: 25px;
  background-color: #ffff3f;
}
.unvisited {
  width: 25px;
  height: 25px;
  border: 1px solid #bdd5ea;
}
.visited {
  width: 25px;
  height: 25px;
  background-color: rgba(0, 190, 218, 0.75);
}
.list-group-item {
  border: none;
}
h5 {
  color: #011627;
}
</style>