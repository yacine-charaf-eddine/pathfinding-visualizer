<template>
  <div class="card m-2">
      <div class="table-responsive">
          <table class="table">
                <tr v-for="(row, rowIndex) in gridMatrix" :key="rowIndex">          
                    <td  
                    v-for="(col, colIndex) in row" :key="colIndex"
                    :class="{
                        startNode: col.type === 'startNode' || col.type === 'tmp_startNode', 
                        targetNode: col.type === 'targetNode' | col.type === 'tmp_targetNode', 
                        wallNode: col.type === 'wallNode'}" 
                    @mousedown.prevent="mouseDown(rowIndex,colIndex)"
                    @mouseup="mouseUp()"
                    @mouseenter="changeNodePosition(rowIndex,colIndex)"
                    @mouseleave="cleareNodePosition(rowIndex,colIndex)"></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

export default {
    data: () => {
        return{
            startNodePosition: {x:null, y:null},
            targetNodePosition: { x: null, y: null},
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
            this.cols = Math.floor((document.documentElement.clientWidth / 26 ));
            this.rows = Math.floor((document.documentElement.clientHeight / 28 ));
        },
        cereateGridMatrix(){
            for(let row = 0; row < this.rows; row++){
                this.gridMatrix[row] = new Array(this.cols);
            }
            for(let row = 0; row < this.rows; row++){
                   for(let col = 0; col < this.cols; col++){
                    this.gridMatrix[row][col] = {type:''};
                }
            }
        },
        generateRandomMarkers(){
            this.startNodePosition.x = (Math.floor(Math.random() * this.cols));
            this.startNodePosition.y = (Math.floor(Math.random() * this.rows));
            this.targetNodePosition.x = (Math.floor(Math.random() * this.cols));
            this.targetNodePosition.y = (Math.floor(Math.random() * this.rows));
            this.gridMatrix[this.startNodePosition.y][this.startNodePosition.x] = {type: 'startNode'} 
            this.gridMatrix[this.targetNodePosition.y][this.targetNodePosition.x] = {type: 'targetNode'}

        },
        changeNodePosition(row,col){
            if(this.isMouseDown){
                if(this.changingStartNodePosition || this.changingTargetNodePosition){                
                    if(this.changingStartNodePosition){                      
                        if(!(col === this.targetNodePosition.x && row === this.targetNodePosition.y)){
                            //let currentNodeIndex = ((this.cols * r) + l);                
                            this.startNodePosition.y = row;
                            this.startNodePosition.x = col;
                            if(this.isWallNode({col,row})){
                                this.gridMatrix[this.startNodePosition.y][this.startNodePosition.x] = {type: 'tmp_startNode'} 
                            }else{
                                this.gridMatrix[this.startNodePosition.y][this.startNodePosition.x] = {type: 'startNode'} 
                            }
                            
                        }else{
                            return
                        }             
                    }else{
                        if(!(col === this.startNodePosition.x && row === this.startNodePosition.y)){
                            //let currentNodeIndex = ((this.cols * r) + l);                
                            this.targetNodePosition.y = row;
                            this.targetNodePosition.x = col;
                            if(this.isWallNode({col,row})){
                                this.gridMatrix[this.targetNodePosition.y][this.targetNodePosition.x] = {type: 'tmp_targetNode'}
                            }else{
                                this.gridMatrix[this.targetNodePosition.y][this.targetNodePosition.x] = {type: 'targetNode'} 
                            }
                            
                        }else{
                            return
                        }       
                    }
                }else{
                    if((col === this.targetNodePosition.x && row === this.targetNodePosition.y) || (col === this.startNodePosition.x && row === this.startNodePosition.y)){
                        return
                    }
                    //let currentNodeIndex = ((this.cols * r) + l);                
                    this.gridMatrix[row][col] = {type: 'wallNode'} 
                }
                this.$forceUpdate();
            }
        },
        cleareNodePosition(row,col){
            if(this.changingStartNodePosition || this.changingTargetNodePosition){
                if(this.isMouseDown){
                    if(this.changingStartNodePosition ){
                         if(col === this.targetNodePosition.x && row === this.targetNodePosition.y){
                            return
                        }
                    }else{
                        if(col === this.startNodePosition.x && row === this.startNodePosition.y){
                            return
                        }
                    }             
                   // let currentNodeIndex = ((this.cols * r) + l);           
                    if(this.gridMatrix[row][col].type === 'tmp_startNode' || this.gridMatrix[row][col].type === 'tmp_targetNode'){
                       this.gridMatrix[row][col] = {type: 'wallNode'} 
                    }else{
                        this.gridMatrix[row][col] = {type: ''} 
                    }
                }
            }
        },
        mouseDown(r,l){
            this.isMouseDown = true
            if(l === this.targetNodePosition.x && r === this.targetNodePosition.y){
                this.changingTargetNodePosition = true;
                this.changingStartNodePosition = false;
            }else if(l === this.startNodePosition.x && r === this.startNodePosition.y){
                this.changingStartNodePosition = true;
                this.changingTargetNodePosition = false;
            }else{
                this.changingStartNodePosition = false;
                this.changingTargetNodePosition = false;
            }
        },
        mouseUp(){
            this.isMouseDown = false;
            this.changingStartNodePosition = false;
            this.changingTargetNodePosition = false;
        },
        isWallNode(node){
           return this.gridMatrix[node.row][node.col].type === 'wallNode';
        }
    },

    created(){
        this.calculateDocDimens();
        this.cereateGridMatrix();
        this.generateRandomMarkers();
    },
}
</script>

<style>
    td{
       border: 1px solid #bdd5ea;
    }
    .table{
        margin-bottom: 0px;
    }
    .startNode{
        background-color: blue;
    }
    .targetNode{
        background-color: green;
    }
    .wallNode{
        background-color: #003049;
    }
    .simpleNode{
        background-color: white;
    }
</style>