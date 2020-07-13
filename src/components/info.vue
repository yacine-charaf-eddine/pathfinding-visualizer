<template>
  <div class="card m-2 p-3">
      <h4>visualizing: {{selectedAlgorithme}}</h4>
      <button type="button" class="btn myBtn">Start</button>
  </div>
</template>

<script>

export default {
  props: ['selectedAlgorithme']
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