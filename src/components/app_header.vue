<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" id="brand" href="#">Pathfinding Visualizer</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="dropdown">
            <button
              class="btn btn-lg dropdown-toggle"
              type="button"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Algorithm</button>
            <div class="dropdown-menu mt-2 p-2" aria-labelledby="navbarDropdown">
              <button
                @click="selectedAlgorithme(algo)"
                class="dropdown-item"
                v-for="algo in algorithmes"
                :key="algo"
              >{{algo}}</button>
            </div>
          </li>
          <li class="dropdown">
            <button
              class="btn btn-lg dropdown-toggle"
              type="button"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Maze</button>
            <div class="dropdown-menu mt-2 p-2" aria-labelledby="navbarDropdown">
              <button
                @click="selectedMaze(maze)"
                class="dropdown-item"
                v-for="maze in mazes"
                :key="maze"
              >{{maze}}</button>
            </div>
          </li>
          <li class="dropdown">
            <button
              class="btn btn-lg dropdown-toggle"
              type="button"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Speed: {{speed.name}}</button>
            <div class="dropdown-menu mt-2 p-2" aria-labelledby="navbarDropdown">
              <button
                @click="selectedSpeed(speedItem)"
                class="dropdown-item"
                v-for="speedItem in speedList"
                :key="speedItem"
              >{{speedItem}}</button>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto ml-auto w-25">
          <li class="nav-item w-100">
            <button
              v-if="algorithme === null"
              class="btn btn-secondary btn-block"
              disabled
            >Select an Algorithme</button>
            <button
              v-else
              @click="startVisualization()"
              class="btn startBtn btn-block"
            >Visualize {{algorithme}}</button>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <button @click="clearWalls()" class="btn btn-lg navbarBtn">Clear Walls</button>
          </li>
          <li class="nav-item">
            <button @click="clearPath()" class="btn btn-lg navbarBtn">Clear Path</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      algorithmes: ["Dijkstra's Algorithm", "A* Search"],
      mazes: ["Recursive Division", "Basic Random Maze"],
      speedList: ["fast", "medium", "slow"],
      algorithme: null,
      maze: null,
      speed: {
        name: "medium",
        nodesSpeed: 30,
        pathSpeed: 50
      }
    };
  },
  methods: {
    selectedAlgorithme(algo) {
      this.algorithme = algo;
      this.$emit("algorithmeSelected", this.algorithme);
    },
    selectedMaze(maze) {
      this.maze = maze;
      this.$emit("mazeSelected", this.maze);
    },
    selectedSpeed(speed) {
      this.speed.name = speed;
      if (speed === "medium") {
        this.speed.nodesSpeed = 30;
        this.speed.pathSpeed = 50;
      } else if (speed === "fast") {
        this.speed.nodesSpeed = 15;
        this.speed.pathSpeed = 25;
      } else {
        this.speed.nodesSpeed = 45;
        this.speed.pathSpeed = 75;
      }
      this.$emit("speedSelected", this.speed);
    },
    startVisualization() {
      this.$emit("startVisualization");
    },
    clearWalls() {
      this.$emit("clearWalls");
    },
    clearPath() {
      this.$emit("clearPath");
    }
  }
};
</script>

<style>
#brand {
  color: #00a8e8;
}
.navbar {
  background-color: #fff;
}
#navbarDropdown:hover {
  color: #00a8e8;
  background-color: #edf3ff;
}
.navbarBtn {
  color: #011627;
  box-shadow: none;
}
.navbarBtn:hover {
  color: #00a8e8;
  background-color: #edf3ff;
  box-shadow: none;
}
.navbarBtn:focus {
  box-shadow: none;
}
#navbarDropdown:focus {
  box-shadow: none;
}
#navbarDropdown {
  color: #011627;
  border-radius: 0px;
}
.dropdown-menu {
  background-color: #edf3ff;
  border-radius: 4px;
}
.dropdown-item {
  color: #011627;
  border-radius: 4px;
}
.dropdown-item:hover {
  background-color: #fff;
  color: #00a8e8;
}
.dropdown-item:focus {
  outline: none;
}
.startBtn {
  background-color: #00b4d8;
  color: #fff;
}
.startBtn:hover {
  background-color: #00bbf9;
  color: #fff;
}
</style>
