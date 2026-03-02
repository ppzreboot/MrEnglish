# Database by Prisma

### init prisma
``` bash
# 安装依赖
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv

# 初始化 Prisma 配置
npx prisma init --datasource-provider postgresql --output ../generated/prisma # 生成 prisma.config.ts 和 prisma/schema.prisma
```

### 数据库迁移
1. 编辑 `prisma/schema.prisma` 文件，定义数据库模型
2. 生成并应用迁移程序：`npx prisma migrate dev --name mw_cache`
3. 生成 prisma client：`npx prisma generate`
