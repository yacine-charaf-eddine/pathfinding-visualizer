<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" id="brand" href="#">Pathfinding Visualizer</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Algorithm
                </button>
                <div class="dropdown-menu mt-2 p-2" aria-labelledby="navbarDropdown">
                  <button @click="selectedAlgorithme(algo)" class="dropdown-item" v-for="algo in algorithmes" :key="algo">{{algo}}</button>
                </div>
              </li>
            </ul>
          </div>
    </nav>
  </div>
</template>

<script>

export default {
  data: () => {
    return{
      algorithmes: ["Dijkstra's Algorithm","A* Search"],
      Algorithme: ''
    }
  },
  methods: {
    selectedAlgorithme(algo){
      this.algorithme = algo;
      this.$emit('algorithmeSelected',this.algorithme);
    }
  }
}
</script>

<style>
    #brand{
      color: #02c39a;
    }
    .navbar{
        background-color: #fff;
    }
    #navbarDropdown:hover{
      color: #02c39a;
    }
    #navbarDropdown:focus{
      color: #02c39a;
      background-color: #edf3ff;
      box-shadow: none;
    }
    #navbarDropdown{
      color: #525c65;
      border-radius: 0px;
    }
    .dropdown-menu{
      background-color: #edf3ff;
      border-radius: 4px;
    }
    .dropdown-item{
      color: #525c65;
      border-radius: 4px;
    }
    .dropdown-item:hover{
     background-color: #fff;
     color: #02c39a;
    }
</style>
