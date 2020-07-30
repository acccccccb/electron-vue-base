<template>
    <div>
        <el-form size="mini" :inline="true">
            <el-form-item>
                <el-select
                        style="width:700px;"
                        v-model="command"
                        filterable
                        clearable
                        allow-create
                        default-first-option
                        placeholder="执行cmd命令">
                    <i slot="prefix" class="fas fa-laptop-code"></i>
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!command" @click="execShell" size="mini">执行</el-button>
            </el-form-item>
        </el-form>
        <div class="resultBox fixScrollY">
            <pre v-if="result">{{result}}</pre>
            <div class="emptyResult" v-else>
                返回结果
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'NetWork',
        data(){
            return {
                command:'',
                result:'',
                options:[
                    {
                        label:'查看网络配置',
                        value:'ipconfig -all',
                    },
                    {
                        label:'ping百度',
                        value:'ping baidu.com',
                    },{
                        label:'列出所有进程',
                        value:'tasklist',
                    },{
                        label:'查看网络连接、状态以及对应的进程id',
                        value:'netstat -ano',
                    },{
                        label:'路由追踪',
                        value:'tracert baidu.com',
                    },{
                        label:'打开组策略',
                        value:'gpedit.msc',
                    },{
                        label:'打开注册表',
                        value:'regedit',
                    },
                ],
            }
        },
        methods:{
            execShell:function(){
                let _this = this;
                let command = this.command;
                this.command = '';
                this.result = '正在执行命令:'+ command;
                let binaryEncoding = 'binary';
                let encoding = 'cp936';
                let options = {
                    encoding: binaryEncoding,
                    windowsHide:false,
                };
                console.log(command);
                let workerProcess = child_process.exec(command, options, (err, stdout, stderr)=>{});
                if(workerProcess.stdout) {
                    workerProcess.stdout.on('data', function (data) {
                        _this.result = iconv.decode(new Buffer(data, binaryEncoding), encoding);
                    });
                }

                if(workerProcess.err) {
                    workerProcess.err.on('data', function (data) {
                        _this.result = iconv.decode(new Buffer(data.toString(), binaryEncoding), encoding);
                    });
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
    .resultBox {
        height:450px;
        overflow-y:scroll;
        pre {
            margin:0;
        }
        .emptyResult {
            color:#5f5f5f;
            font-size:12px;
        }
    }
</style>