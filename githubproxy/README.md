# 搭建github镜像站 所有https://github.com开头的网址均可替换为本项目地址

把本目录的文件全部上传到glitch.com中的nodejs项目

https://test.glitch.me/samllfawn/glitch-ghproxy

https://test.glitch.me是你分配的域名

托管防休眠
``````
 {
    "refreshStatus":false,//防止休眠开关 必填
    "glitchAppUrl":"https://demo.glitch.me",//项目地址 必填
    "refreshTime":300000//刷新时间 建议默认
}
``````