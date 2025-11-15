import { make_ECDICT_PGSQL } from '@ppz-ai/ecdict-pgsql'
import Postgres from 'postgres'

export
function init_service__ecdict(uri: string) {
    const sql = Postgres(uri)
    return make_ECDICT_PGSQL(sql, 'ecdict', 'ecdict')
}
