import type { I_HTTP_method, I_route } from './type.ts'
export type * from './type.ts'

export
const make_router = <I_app_service>(route_list: I_route<I_app_service>[]) =>
	(method: I_HTTP_method, path: string) =>
		route_list
			.find(r => r[0] === method && r[1] === path)
			?.[2]
