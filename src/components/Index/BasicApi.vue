<template>
    <div>
        <el-button type="primary" @click="openUrl" size="mini">打开electron文档</el-button>
        <el-button type="primary" @click="showMessage" size="mini">桌面通知</el-button>
    </div>
</template>
<script>
    export default {
        name:'BasicApi',
        data(){
            return {}
        },
        methods:{
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