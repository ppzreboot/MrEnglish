import { z } from 'zod'

// trim 全交给前端做！

/** 邮箱格式、两端空格，转化为小写 */
export
const zod_email = z.email('邮箱格式不正确')
