# Database by Prisma

### 数据库迁移
1. 编辑 `prisma/schema.prisma` 文件，定义数据库模型
2. 生成并应用迁移程序：`npx prisma migrate dev --name MIGRATION_NAME`
3. 生成 prisma client：`npx prisma generate`
