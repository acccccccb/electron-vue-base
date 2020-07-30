<template>
    <div>
        <el-button type="primary" @click="openUrl" size="mini">打开electron文档</el-button>
        <el-button type="primary" @click="showMessage" size="mini">桌面通知</el-button>
        <el-button type="primary" @click="getUrl" size="mini">网络请求</el-button>
    </div>
</template>
<script>
    export default {
        name:'BasicApi',
        data(){
            return {}
        },
        methods:{
            getUrl:function(){
                console.log('connect to https://www.baidu.com/');
                fetch('https://www.baidu.com/',{
                    method: 'get',
                    headers: {
                        UserAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
                    },
                }).then(res => res.text())
                  .then(body => console.log(body));
            },
            openUrl:function(){
                electron.shell.openExternal('https://www.electronjs.org/docs')
            },
            showMessage:function(){
                let option = {
                    title: "创建OS(操作系统)桌面通知",
                    body: "当通知向用户显示时触发, 请注意, 这可能会多次触发, 因为「通知」可以通过 show() 方法多次显示。",
                    href: 'https://www.electronjs.org/docs/api/notification#notificationshow',
                    silent:true,
                    timeoutType:'naver',
                };
                // 创建通知并保存
                let Notification = new electron.remote.Notification(option);
                // 当通知被点击时, 用默认浏览器打开链接
                Notification.on('click',function(){
                    electron.shell.openExternal(option.href)
                });
                Notification.show();
            },
        },
    }
</script>
<style lang="scss" scoped>

</style>