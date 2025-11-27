# MrEnglish -- Deploy

### 数据库
[数据与服务](./dev/server/数据库.md)

### 后端
编译成单文件可执行文件，交给 systemd 管理，由 nginx 反向代理到 80 端口

``` bash
deno task --cwd=app/server compile
```

> Standalone Executable 的优势：1. 方便 systemd 管理; 2. 不依赖操作系统的 Deno 的某个版本。

### 前端
编译成静态文件，nginx 托管

``` bash
deno task --cwd=app/client pro
```

### https
cloudflare cdn
