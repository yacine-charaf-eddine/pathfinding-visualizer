<template>
  <div class="m-2 .table-responsive">
      <table class="table table-bordered">
        <tr v-for="(row, rowIndex) in gridMatrix" :key="rowIndex">
            <td  
            class="border-primary" 
            v-for="(line, lineIndex) in row" :key="lineIndex"
            @mouseover="changeNodePosition(rowIndex,lineIndex)"
            @mousedown.prevent="mouseDown(rowIndex,lineIndex)"
            @mouseup="mouseUp()"
            @mouseenter="changeNodePosition(rowIndex,lineIndex)"
            @mouseleave="cleareNodePosition(rowIndex,lineIndex)"></td>
        </tr>
      </table>
  </div>
</template>

<script>

export default {
    data: () => {
        return{
            startNodePosition: new Array(2),
            targetNodePosition: new Array(2),
            changingStartNodePosition: false,
            changingTargetNodePosition: false,
            gridMatrix: [],
            cols: null,
            rows: null,
            isMouseDown: false
        }
    },
    methods: {
        calculateDocDimens(){
            this.cols = Math.floor((document.documentElement.clientWidth / 25 ));
            this.rows = Math.floor((document.documentElement.clientHeight / 28 ));
        },
        cereateGridMatrix(){
            for(let row = 0; row < this.rows; row++){
                this.gridMatrix[row] = new Array(this.cols);
            }
        },
        drawRandomMarkers(){
            this.startNodePosition[0] = (Math.floor(Math.random() * this.cols));
            this.startNodePosition[1] = (Math.floor(Math.random() * this.rows));
            this.targetNodePosition[0] = (Math.floor(Math.random() * this.cols));
            this.targetNodePosition[1] = (Math.floor(Math.random() * this.rows));

            let startNodeIndex = ((this.startNodePosition[1] * this.cols) + this.startNodePosition[0]); 
            document.getElementsByTagName('td')[startNodeIndex].style.backgroundColor = 'red'

            let targetNodeIndex = ((this.targetNodePosition[1] * this.cols) + this.targetNodePosition[0]); 
            document.getElementsByTagName('td')[targetNodeIndex].style.backgroundColor = 'blue'

        },
        changeNodePosition(r,l){
            if(this.changingStartNodePosition || this.changingTargetNodePosition){
                if(this.changingStartNodePosition){
                    if(this.isMouseDown){
                    let currentNodeIndex = ((this.cols * r) + l);                
                    let currentNode = document.getElementsByTagName('td')[currentNodeIndex];
                    currentNode.style.backgroundColor = 'red'
                    this.startNodePosition[1] = r;
                    this.startNodePosition[0] = l;
                }
                }else{
                    if(this.isMouseDown){
                    let currentNodeIndex = ((this.cols * r) + l);                
                    let currentNode = document.getElementsByTagName('td')[currentNodeIndex];
                    currentNode.style.backgroundColor = 'blue'
                    this.targetNodePosition[1] = r;
                    this.targetNodePosition[0] = l;
                }

            }
            }
        },
        cleareNodePosition(r,l){
            if(this.changingStartNodePosition || this.changingTargetNodePosition){
                if(this.isMouseDown){
                    let currentNodeIndex = ((this.cols * r) + l);           
                    let currentNode = document.getElementsByTagName('td')[currentNodeIndex];
                    currentNode.style.backgroundColor = 'white'
                }
            }
        },
        mouseDown(r,l){
            this.isMouseDown = true
            if(l === this.targetNodePosition[0] && r === this.targetNodePosition[1]){
                this.changingTargetNodePosition = true;
                this.changingStartNodePosition = false;
            }else if(l === this.startNodePosition[0] && r === this.startNodePosition[1]){
                this.changingStartNodePosition = true;
                this.changingTargetNodePosition = false;
            }else{
                this.changingStartNodePosition = false;
                this.changingTargetNodePosition = false;
            }
        },
        mouseUp(){
            this.isMouseDown = true
            this.changingStartNodePosition = false;
            this.changingTargetNodePosition = false;
        }
    },

    created(){
        this.calculateDocDimens();
    },
    beforeMount(){
        this.cereateGridMatrix();
    },
    mounted(){     
        this.$nextTick(function () {
            this.drawRandomMarkers();
        })
    },
}
</script>

<style>
</style>