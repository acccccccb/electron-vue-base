<template>
  <div>
    <div class="titlebar">
      <div class="title">{{config.name}} - {{config.version}}</div>
      <div class="titlebarBtnGroup">
        <el-button @click="exit" type="danger" size="mini" style="padding:4px 8px;"><span class="fas fa-times"></span></el-button>
      </div>
    </div>
    <el-row :gutter="20" class="main">
      <el-col :span="24">
        <el-tabs v-model="activeName">
          <el-tab-pane label="exec">
            <NetWork></NetWork>
          </el-tab-pane>
          <el-tab-pane label="基本信息">
            <SystemInfo></SystemInfo>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let config = require('../../package.json');
  import SystemInfo from '../components/Index/SystemInfo'
  import NetWork from '../components/Index/NetWork'
    export default {
      name: 'Index',
        components:{
            SystemInfo,NetWork,
        },
        data(){
          return {
              config:config,

              activeName:'0',
          }
        },
        created(){
            ipcRenderer.on('closeAllReplay', (event, arg) => {
                if(arg.response===0) {
                    electron.webFrame.context.close();
                }
            })
        },
        methods:{
            exit(){
                ipcRenderer.send('closeAllMessage', 'closeAll');

                // this.$confirm('即将关闭应用程序，是否继续?', '提示', {
                //     confirmButtonText: '关闭',
                //     cancelButtonText: '取消',
                //     type: 'warning',
                //     closeOnClickModal:false,
                //     closeOnPressEscape:false,
                //     showClose:false,
                // }).then(() => {
                //     ipcRenderer.on('asynchronous-reply', (event, arg) => {
                //         console.log(arg) // prints "pong"
                //     })
                //     // electron.webFrame.context.close();
                // }).catch(() => {});
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    box-sizing: border-box;
    width:100%;
    padding:0;
    margin-left:0!important;
    margin-right:0!important;
  }
  .titlebar {
    box-sizing: border-box;
    width:100%;
    height:34px;
    background:dodgerblue;
    color:#fff;
    line-height:34px;
    padding-left:10px;
    padding-right:10px;

  }
  .titlebar .title {
    float:left;
    text-shadow: 1px 1px rgba(0,0,0,.3);
    -webkit-app-region: drag;
    -webkit-user-select: none;
    width:700px;
  }
  .titlebar .titlebarBtnGroup {
    float:right;
  }
</style>
