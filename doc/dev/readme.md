# MrEnglish

### 准备
+ [数据与服务](./server/数据与服务.md)
+ [GitHub OAuth App](https://github.com/settings/developers)
+ [Meriam-Webster api key (learner's)](https://www.dictionaryapi.com/products/api-learners-dictionary)

> 注意核对 github client id/secret 与 callback url

### 启动开发模式

``` bash
deno task --cwd=biz/clite-app dev
deno task --cwd=biz/server-app dev
```

### 目录结构
+ biz: 业务相关代码
	+ clite-app: clite 具体业务
	+ clite-helper: clite 业务的辅助
+ non-biz: 业务无关代码
