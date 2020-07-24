<template>
    <div>
        <el-form size="mini" :inline="true">
            <el-form-item>
                <el-input style="width:700px;" size="mini" clearable v-model="shellCmd" placeholder="执行cmd命令">
                    <i slot="prefix" class="fas fa-laptop-code"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!shellCmd" @click="execShell" size="mini">执行</el-button>
            </el-form-item>
            <el-form-item>
                <el-input style="width:700px;" size="mini" clearable v-model="url" placeholder="发送请求">
                    <i slot="prefix" class="fas fa-laptop-code"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!url" @click="getUrl" size="mini">请求</el-button>
            </el-form-item>
        </el-form>
        <div>
            <pre>
                {{fileList}}
            </pre>
        </div>
    </div>
</template>
<script>
    export default {
        name:'NetWork',
        data(){
            return {
                shellCmd:'',
                url:'',
                fileList:[],
            }
        },
        methods:{
            getUrl:function(){
                console.log(this.url);
            },
            execShell:function(){
                let binaryEncoding = 'binary';
                let encoding = 'cp936';
                let options = {
                    encoding: binaryEncoding,
                    windowsHide:false,
                };
                child_process.exec(this.shellCmd, options, (err, stdout, stderr)=>{
                    console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding));
                    this.fileList = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
                    this.$forceUpdate();
                });
            },
        },
    }
</script>