import type { I_controller, I_HTTP_input } from '@mr-english-server/router' 
import type { I_app_service } from './service.ts'

export * from './env.ts'
export * from './service.ts'
export * from './db.ts'

export
type I_c= I_controller<I_app_service>

export
type I_i = I_HTTP_input<I_app_service>
