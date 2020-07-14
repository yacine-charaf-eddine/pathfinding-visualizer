<template>
  <div class="card m-2 p-3">
      <h4>visualizing: {{selectedAlgorithme}}</h4>
      <button @click="startVisualization()" type="button" class="btn myBtn">Start</button>
  </div>
</template>

<script>

export default {
  props: ['selectedAlgorithme'],
  methods:{
    startVisualization(){
      this.$emit('startVisualization');
    }
  }
}
</script>

<style>
    .myBtn{
        background-color: #02c39a;
        color: #fff;
    }
    .myBtn:hover{
        background-color: #06d6a0;
        color: #fff;
    }
</style>