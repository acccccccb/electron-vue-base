<template>
    <div>
        <div class="systemInfoList">
            <div>计算机名：{{systemInfo.hostname}} 操作系统：{{systemInfo.type}}-{{systemInfo.arch}}位 版本：{{systemInfo.release}} - 空闲内存：{{(systemInfo.freemem/1000/1000/1000).toFixed(1)}}GB</div>
        </div>
        <el-table size="mini" border :data="[systemInfo.userInfo]">
            <el-table-column label="用户信息" align="center">
                <el-table-column label="uid" prop="uid" width="50" align="center"></el-table-column>
                <el-table-column label="gid" prop="gid" width="50" align="center"></el-table-column>
                <el-table-column label="username" prop="username" align="center"></el-table-column>
                <el-table-column label="homedir" prop="homedir" align="center"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table size="mini" :data="systemInfo.cpus" border>
            <el-table-column label="处理器" align="center">
                <el-table-column label="#" align="center" width="50" type="index"></el-table-column>
                <el-table-column label="型号" align="center" prop="model"></el-table-column>
                <el-table-column label="频率" align="center" prop="speed" width="100"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table size="mini" :data="systemInfo.networkInterfaces['本地连接']" border>
            <el-table-column label="本地连接" align="center">
                <el-table-column label="#" align="center" width="50" type="index"></el-table-column>
                <el-table-column label="address" align="center" prop="address"></el-table-column>
                <el-table-column label="family" align="center" prop="family"></el-table-column>
                <el-table-column label="mac" align="center" prop="mac"></el-table-column>
                <el-table-column label="netmask" align="center" prop="netmask"></el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name:'SystemInfo',
        data(){
            return {
                systemInfo:{},
                systemInfoList:[],
            }
        },
        created(){
            this.getSystemInfo();
        },
        methods:{
            getSystemInfo(){
                this.systemInfo.arch = os.arch();
                this.systemInfo.cpus = os.cpus();
                this.systemInfo.networkInterfaces = os.networkInterfaces();
                this.systemInfo.endianness = os.endianness();
                this.systemInfo.freemem = os.freemem();
                this.systemInfo.getPriority = os.getPriority();
                this.systemInfo.homedir = os.homedir();
                this.systemInfo.loadavg = os.loadavg();
                this.systemInfo.release = os.release();
                this.systemInfo.tmpdir = os.tmpdir();
                this.systemInfo.type = os.type();
                this.systemInfo.uptime = os.uptime();
                this.systemInfo.hostname = os.hostname();
                this.systemInfo.platform = os.platform();
                this.systemInfo.userInfo = os.userInfo();
                console.log(os);
                console.log(this.systemInfo);
                for(let item in this.systemInfo) {
                    this.systemInfoList.push({
                        prop:item,
                        value:this.systemInfo[item]
                    });
                }
            },
        }
    }
</script>
<style scoped>
    .systemInfoList {
        font-size:12px;
        line-height:200%;
    }
</style>