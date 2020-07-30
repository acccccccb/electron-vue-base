<template>
    <div class="spiderBox fixScrollY">
        <el-form :model="form" size="mini" label-position="left" label-width="60px">
            <el-form-item label="网址：">
                <el-input :readonly="loading" placeholder="请输入网址" v-model="form.url" class="input-with-select">
                    <el-select style="width:80px;" v-model="form.method" slot="prepend" placeholder="请选择">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                    </el-select>
                    <el-button v-if="!loading" style="background:#409EFF;color:#fff;border-radius: 0 3px 3px 0;border:1px solid #409EFF;" @click="getUrl" slot="append">请求</el-button>
                    <el-button v-if="loading" style="background:#F56C6C;color:#fff;border-radius: 0 3px 3px 0;border:1px solid #F56C6C;" @click="cancel" slot="append">取消</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="端口：">
                <el-input :readonly="loading" v-model.number="form.port" placeholder="80"></el-input>
            </el-form-item>
            <el-form-item label="结果：" v-show="false" v-loading="loading" :element-loading-text="loadingText">
                <el-input clearable readonly v-model="result" :autosize="{ minRows: 18, maxRows: 18 }" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="图片：" v-loading="loading" :element-loading-text="loadingText">
                <el-input v-model="imgSrc"></el-input>
                <img v-if="img" :src="img" alt="图片">
                <div v-if="true">
                    <el-image style="width: 100px; height: 100px" v-for="item in imgList" :preview-src-list="imgList" :src="item" fit="cover"></el-image>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getImg(imgSrc)" size="mini" v-if="!loading">请求</el-button>
                <el-button type="danger" @click="cancel" size="mini" v-if="loading">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import http from 'http'
    export default {
        name:'Spider',
        data(){
            return {
                loading:false,
                loadingText:'发起请求',
                imgSrc:'https://www.socwall.com/images/wallpapers/88625-2560x1600.jpg',
                form:{
                    url:'http://www.netbian.com/fengjing/index_2.htm',
                    method:'GET',
                    port:null
                },
                result:'',
                imgList:[],
                img:''
            }
        },
        methods:{
            cancel:function(){
                this.loading=false;
            },
            getImg:function(src){
                let _this = this;
                console.log('请求图片',src);
                let header= {
                    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Accept-Language":"zh-CN,zh;q=0.9",
                    "Cache-Control":"no-cache",
                    "Connection":"keep-alive",
                    "referer":"http://www.netbian.com",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
                };
                let chunks = [];
                let size = 0;
                const request = new electron.remote.net.request({
                    url:src,
                    method:'GET',
                    header:header,
                    agent: false
                });
                // request.setHeader('referer',url);
                request.on('response', (response) => {
                    if(response.statusCode!==200) {
                        _this.$message.warning('请求错误');
                    }
                    response.on('data', (chunk) => {
                        size += chunk.length;
                        chunks.push(chunk);
                    });
                    response.on('end', () => {
                        console.warn('end');
                        let base64Img = 'data:image/jpg;base64,';
                        chunks.forEach((item)=>{
                            console.log('isBuffer:',Buffer.isBuffer(item));
                            base64Img += item.toString('base64');
                        });
                        console.log(chunks);
                        console.log(typeof chunks[0]);
                        // let buf = Buffer.concat(chunks,size);
                        // let base64Img = 'data:image/jpg;base64,' +  iconv.decode(buf,'base64');
                        // let base64Img = 'data:image/jpg;base64,' + iconv.decode(chunks,'base64');
                        _this.img = base64Img;
                    });
                    response.on('error', (error) => {
                        console.log(`ERROR: ${JSON.stringify(error)}`)
                    })
                });
                request.end();
            },
            getUrl:function(){
                let _this = this;
                let port = this.form.port;
                this.result = '';
                this.imgList = [];
                let url = port?(this.form.url+':'+port):this.form.url;
                if(url.indexOf('https://')<0 && url.indexOf('http://')<0) {
                    url = 'https://' + url;
                }
                let header= {
                    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Accept-Language":"zh-CN,zh;q=0.9",
                    "Cache-Control":"no-cache",
                    "Connection":"keep-alive",
                    "referer":url,
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
                };
                _this.loading = true;
                const request = new electron.remote.net.request({
                    url:url,
                    method:_this.form.method,
                    port:_this.form.port,
                    header:header,
                    agent: false
                });
                let chunks = [];
                let size = 0;
                // request.setHeader('referer',url);
                request.on('response', (response) => {
                    _this.loading = false;
                    if(response.statusCode!==200) {
                        _this.$message.warning('请求错误');
                    }
                    response.on('data', (chunk) => {
                        chunks.push(chunk);
                        size += chunk.length;
                    });
                    response.on('end', () => {
                        let imgReg = /<img.*?(?:>|\/>)/gi;
                        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                        let arr = chunks.toString().match(imgReg);
                        arr.forEach((item)=>{
                            let src = item.match(srcReg);
                            _this.imgList.push(src[1]);
                        });
                        _this.result = chunks.toString();
                        _this.getImg(_this.imgList[0]);
                        _this.$message.warning('图片列表获取完成');
                    });
                    response.on('error', (error) => {
                        console.log(`ERROR: ${JSON.stringify(error)}`)
                    })
                });
                request.end();
            },
        },
    }
</script>
<style lang="scss" scoped>
    .spiderBox {
        overflow-y:scroll;
        height:500px;
    }
</style>