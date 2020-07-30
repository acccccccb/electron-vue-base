<template>
  <div>
    <div class="titlebar">
      <div class="title">{{config.name}} - {{config.version}}</div>
      <div class="titlebarBtnGroup">
        <el-button @click="top" :type="isTop?'danger':'primary'" size="mini" style="padding:4px 8px;"><span class="fas fa-thumbtack"></span></el-button>
        <el-button @click="hide" type="primary" size="mini" style="padding:4px 8px;"><span class="fas fa-angle-down"></span></el-button>
        <el-button @click="quit" type="primary" size="mini" style="padding:4px 8px;"><span class="fas fa-times"></span></el-button>
      </div>
    </div>
    <el-row :gutter="20" class="main">
      <el-col :span="24">
        <el-tabs v-model="activeName">
          <el-tab-pane label="爬虫">
            <Spider></Spider>
          </el-tab-pane>
          <el-tab-pane label="基础API">
            <BasicApi></BasicApi>
          </el-tab-pane>
          <el-tab-pane label="CMD命令">
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
  import BasicApi from '../components/Index/BasicApi'
  import Spider from '../components/Index/Spider'
    export default {
      name: 'Index',
        components:{
            SystemInfo,NetWork,BasicApi,Spider,
        },
        data(){
          return {
              config:config,
              activeName:'0',
              isTop:false,
          }
        },
        created(){
            ipcRenderer.on('windowReplay', (event, arg) => {
                if(arg === 'isTop') {
                    this.isTop = true;
                }
                if(arg === 'isNotTop') {
                    this.isTop = false;
                }
            })
        },
        methods:{
          top:function(){
              ipcRenderer.send('window', 'top');
          },
          hide:function(){
              ipcRenderer.send('window', 'hide');
              let option = {
                  title: "最小化至托盘图标",
                  body: "应用程序已经最小化至托盘图标，双击即可显示。",
                  silent:true,
                  timeoutType:'normal',
              };
              // 创建通知并保存
              let Notification = new electron.remote.Notification(option);
              Notification.show();
          },
          quit:function(){
              ipcRenderer.send('window', 'quit');
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
    width:650px;
  }
  .titlebar .titlebarBtnGroup {
    float:right;
  }
</style>
