<template>
  <div class="card m-2">
    <div class="table-responsive">
      <table class="table">
        <tr v-for="(row, rowIndex) in gridMatrix" :key="rowIndex">
          <td
            v-for="(col, colIndex) in row"
            :key="colIndex"
            :class="{
                        startNode: col.type === 'startNode' || col.type === 'tmp_startNode', 
                        targetNode: col.type === 'targetNode' | col.type === 'tmp_targetNode', 
                        wallNode: col.type === 'wallNode',
                        'node-path': col.type ==='node-path',
                        'start-node': col.type ==='start-node',
                        'start-node-path': col.type ==='start-node-path',
                        path: col.type ==='path',
                        'target-node': col.type ==='target-node'}"
            @mousedown.prevent="mouseDown(rowIndex,colIndex)"
            @mouseup="mouseUp()"
            @mouseenter="changeNodePosition(rowIndex,colIndex)"
            @mouseleave="cleareNodePosition(rowIndex,colIndex)"
          ></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { dijkstra, getNodesInShortestPathOrder } from "../algorithmes/Dijkstra";
export default {
  props: {
    startVisualisation: Object
  },
  data: () => {
    return {
      startNodePosition: { col: null, rox: null },
      targetNodePosition: { col: null, row: null },
      changingStartNodePosition: false,
      changingTargetNodePosition: false,
      gridMatrix: [],
      cols: null,
      rows: null,
      isMouseDown: false
    };
  },
  watch: {
    startVisualisation: {
      handler(newVal) {
        if (newVal.startVisualization === true) {
          switch (newVal.selectedAlgorithme) {
            case "Dijkstra's Algorithm": {
              this.runDijkstra();
            }
          }
        }
      }
    }
  },
  methods: {
    calculateDocDimens() {
      this.cols = Math.floor(document.documentElement.clientWidth / 27);
      this.rows = Math.floor(document.documentElement.clientHeight / 35);
    },
    cereateGridMatrix() {
      for (let row = 0; row < this.rows; row++) {
        this.gridMatrix[row] = new Array(this.cols);
      }
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.gridMatrix[row][col] = {
            col: col,
            row: row,
            type: "",
            previousParent: null,
            isVisited: false,
            distance: Infinity
          };
        }
      }
    },
    generateRandomMarkers() {
      this.startNodePosition.col = Math.floor(Math.random() * this.cols);
      this.startNodePosition.row = Math.floor(Math.random() * this.rows);
      this.targetNodePosition.col = Math.floor(Math.random() * this.cols);
      this.targetNodePosition.row = Math.floor(Math.random() * this.rows);
      this.gridMatrix[this.startNodePosition.row][
        this.startNodePosition.col
      ] = {
        col: this.startNodePosition.col,
        row: this.startNodePosition.row,
        type: "startNode",
        previousParent: null,
        isVisited: false,
        distance: Infinity
      };
      this.gridMatrix[this.targetNodePosition.row][
        this.targetNodePosition.col
      ] = {
        col: this.targetNodePosition.col,
        row: this.targetNodePosition.row,
        type: "targetNode",
        previousParent: null,
        isVisited: false,
        distance: Infinity
      };
    },
    changeNodePosition(row, col) {
      if (this.isMouseDown) {
        if (this.changingStartNodePosition || this.changingTargetNodePosition) {
          if (this.changingStartNodePosition) {
            if (
              !(
                col === this.targetNodePosition.col &&
                row === this.targetNodePosition.row
              )
            ) {
              this.startNodePosition.row = row;
              this.startNodePosition.col = col;
              if (this.isWallNode({ col, row })) {
                this.gridMatrix[this.startNodePosition.row][
                  this.startNodePosition.col
                ].type = "tmp_startNode";
              } else {
                this.gridMatrix[this.startNodePosition.row][
                  this.startNodePosition.col
                ].type = "startNode";
              }
            } else {
              return;
            }
          } else {
            if (
              !(
                col === this.startNodePosition.col &&
                row === this.startNodePosition.row
              )
            ) {
              this.targetNodePosition.row = row;
              this.targetNodePosition.col = col;
              if (this.isWallNode({ col, row })) {
                this.gridMatrix[this.targetNodePosition.row][
                  this.targetNodePosition.col
                ].type = "tmp_targetNode";
              } else {
                this.gridMatrix[this.targetNodePosition.row][
                  this.targetNodePosition.col
                ].type = "targetNode";
              }
            } else {
              return;
            }
          }
        } else {
          if (
            (col === this.targetNodePosition.col &&
              row === this.targetNodePosition.row) ||
            (col === this.startNodePosition.col &&
              row === this.startNodePosition.row)
          ) {
            return;
          }
          this.gridMatrix[row][col].type = "wallNode";
        }
        this.$forceUpdate();
      }
    },
    cleareNodePosition(row, col) {
      if (this.changingStartNodePosition || this.changingTargetNodePosition) {
        if (this.isMouseDown) {
          if (this.changingStartNodePosition) {
            if (
              col === this.targetNodePosition.col &&
              row === this.targetNodePosition.row
            ) {
              return;
            }
          } else {
            if (
              col === this.startNodePosition.col &&
              row === this.startNodePosition.row
            ) {
              return;
            }
          }
          if (
            this.gridMatrix[row][col].type === "tmp_startNode" ||
            this.gridMatrix[row][col].type === "tmp_targetNode"
          ) {
            this.gridMatrix[row][col].type = "wallNode";
          } else {
            this.gridMatrix[row][col].type = "";
          }
        }
      }
    },
    mouseDown(r, l) {
      this.isMouseDown = true;
      if (
        l === this.targetNodePosition.col &&
        r === this.targetNodePosition.row
      ) {
        this.changingTargetNodePosition = true;
        this.changingStartNodePosition = false;
      } else if (
        l === this.startNodePosition.col &&
        r === this.startNodePosition.row
      ) {
        this.changingStartNodePosition = true;
        this.changingTargetNodePosition = false;
      } else {
        this.changingStartNodePosition = false;
        this.changingTargetNodePosition = false;
      }
    },
    mouseUp() {
      this.isMouseDown = false;
      this.changingStartNodePosition = false;
      this.changingTargetNodePosition = false;
    },
    isWallNode(node) {
      return this.gridMatrix[node.row][node.col].type === "wallNode";
    },
    runDijkstra() {
      let startNode = this.gridMatrix[this.startNodePosition.row][
        this.startNodePosition.col
      ];
      let targetNode = this.gridMatrix[this.targetNodePosition.row][
        this.targetNodePosition.col
      ];
      let visitedNodesInOrder = dijkstra(
        this.gridMatrix,
        startNode,
        targetNode
      );
      let path = getNodesInShortestPathOrder(targetNode);
      this.animate(visitedNodesInOrder, path);
    },
    animate(nodes, path) {
      for (let i = 0; i < nodes.length - 1; i++) {
        setTimeout(() => {
          if (i === 0) {
            this.gridMatrix[nodes[i].row][nodes[i].col].type = "start-node";
          } else {
            this.gridMatrix[nodes[i].row][nodes[i].col].type = "node-path";
          }
          this.$forceUpdate();
          if (i === nodes.length - 2) {
            for (let i = 0; i < path.length; i++) {
              setTimeout(() => {
                if (i === path.length - 1) {
                  this.gridMatrix[path[i].row][path[i].col].type =
                    "target-node";
                } else if (i === 0) {
                  this.gridMatrix[path[i].row][path[i].col].type =
                    "start-node-path";
                } else {
                  this.gridMatrix[path[i].row][path[i].col].type = "path";
                }
                this.$forceUpdate();
              }, i * 50);
            }
          }
        }, i * 20);
      }
    }
  },

  created() {
    this.calculateDocDimens();
    this.cereateGridMatrix();
    this.generateRandomMarkers();
  }
};
</script>

<style scoped>
td {
  border: 1px solid #bdd5ea;
}
.table {
  margin-bottom: 0px;
}
.startNode {
  background-image: url("../assets/location_marker.svg");
  background-position: center;
  background-repeat: no-repeat;
}
.targetNode {
  background-image: url("../assets/target_marker.svg");
  background-position: center;
  background-repeat: no-repeat;
}
.wallNode {
  background-color: #011627;
}
.simpleNode {
  background-color: white;
}
.start-node {
  animation-name: startNode;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes startNode {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  75% {
    transform: scale(1);
    background-color: rgba(0, 217, 159, 0.75);
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }
}
.node-path {
  animation-name: nodePath;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes nodePath {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
  }
}
.path {
  animation-name: path;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes path {
  0% {
    transform: scale(0.6);
    background-color: #ffff3f;
  }

  100% {
    transform: scale(1);
    background-color: #ffff3f;
  }
}
.target-node {
  animation-name: targetNode;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes targetNode {
  0% {
    transform: scale(0.6);
    background-color: #ffff3f;
    background-image: url("../assets/target_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  100% {
    transform: scale(1);
    background-color: #ffff3f;
    background-image: url("../assets/target_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }
}
.start-node-path {
  animation-name: StartNodePath;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes StartNodePath {
  0% {
    transform: scale(0.6);
    background-color: #ffff3f;
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }

  100% {
    transform: scale(1);
    background-color: #ffff3f;
    background-image: url("../assets/location_marker.svg");
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>