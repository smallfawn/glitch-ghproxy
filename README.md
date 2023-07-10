# glitch-ghproxy
 基于glitch提供的nodejs托管创建的github反代或加速服务
# 教程:
 创建nodejs服务 导入本仓库

 配置保活定时 config.json 
 ``````
 {
    "refreshStatus":false,//防止休眠开关 必填
    "glitchAppUrl":"https://demo.glitch.me",//项目地址 必填
    "refreshTime":300000//刷新时间 建议默认
}
``````
创建github镜像站看githubproxy目录

https://github.com/smallfawn/glitch-ghproxy/tree/main/githubproxy
