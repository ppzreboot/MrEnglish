# MrEnglish -- Deploy

### 数据库
[数据与服务](./dev/server/数据库.md)

### 后端
编译成单文件可执行文件，交给 systemd 管理，由 nginx 反向代理到 80 端口

``` bash
deno task --cwd=app/server pro
```

### 前端
编译成静态文件，nginx 托管

``` bash
deno task --cwd=app/client pro
```

### https
cloudflare cdn
