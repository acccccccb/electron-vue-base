<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
      Index
  }
}
</script>

<style>
  html,body {
    overflow:hidden;
  }
  html,body,#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    cursor:default;
    height:100%;
    width:100%;
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  body {
    border:1px solid #000;
    border-radius: 6px;
    overflow-x:hidden;
  }
  #app {
    background:#fff;
    user-select:none;
  }
</style>
