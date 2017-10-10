# koa2_typescript
使用typescript、koa2实现的一个简单的RESTFul API demo

## 运行需求
* node version >= 7.6.0
* 需要在本地安装redis-server
* 需要在本地安装mysql、5.2+
* 需全局安装TypeScript，TypeScript >= 2.x

## 目录结构
```
├── LICENSE
├── log4js.json #log4日志记录配置
├── logs #日志存储文件夹
│   ├── app.log
│   ├── errors.log
│   ├── http.log
│   ├── startup.log
│   ├── startup.log-2017-09-25
│   └── startup.log-2017-09-26
├── node_modules #依赖包
├── package.json 
├── package-lock.json
├── src
│   ├── app.ts #入口文件
│   ├── config.ts #配置文件
│   ├── models
│   │   ├── contact.ts #数据层操作
│   │   └── user.ts #数据层操作
│   ├── routers #路由文件夹
│   │   ├── contact.ts #联系人相关路由文件
│   │   ├── login.ts #登录注册路由文件
│   │   └── user.ts #用户路由文件
│   └── utils #工具类
│       ├── logger.ts #日志记录工具
│       ├── mysql.ts #mysql连接查询操作工具
│       ├── redis.ts #redis连接操作工具
│       ├── session.ts #session操作类
│       └── tools.ts #公共方法
└── tsconfig.json #TypeScript配置文件
```

## 项目运行
