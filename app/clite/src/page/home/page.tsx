import { useState, useEffect } from 'react'
import { useSearchParams } from 'wouter'
import { Icon_search } from '@mr-english-client/icon'
import { I_lookup_output } from '@mr-english/schema'
import { Star, Layout } from '@mr-english-client/ui'

import '../../../style/page/home.css'
import { retrieve__lookup } from '../../api/lookup.ts'
import { post__star_word } from '../../api/word.ts'
import { Basic_explain } from '../../../../server/view/home/basic.ts'
import { EE_explain } from './block/ee.tsx'
import { Other_explain } from './block/other.tsx'

type I_state = {
  word: string
  status: 'before lookup' | 'loading'
} | {
  word: string
  status: 'success'
  output: null | I_lookup_output
} | {
  word: string
  status: 'error'
  error: string
}

export
function Home_page() {
  const q = useQ()
  useEffect(() => {
    if (q.val)
      go_lookup(q.val)
  }, [q.val])

  const [state, update] = useState<I_state>({
    word: q.val,
    status: 'before lookup',
  })

  const go_lookup = async (word: string) => {
    if (state.status === 'loading')
      throw Error('上个单词还没查完')

    update({
      word,
      status: 'loading',
    })

    const [error, output] = await retrieve__lookup(word)
    if (error === null)
      update({
        word, // loading 期间，不允许输入，可用旧 word
        status: 'success',
        output,
      })
    else
      update({
        word,
        status: 'error',
        error: '现在还不能查短语、句子', // todo: 特殊字符
      })
  }

  const right_btn = (() => {
    if (state.status === 'success' && state.output !== null) {
      const output = state.output
      return <Star
        value={output.star}
        on_click={async () => {
          await post__star_word(output.result.ecdict.word, !output.star)
          update(current => {
            if (current.word !== state.word) return current

            return {
              status: 'success',
              word: current.word,
              output: {
                result: output.result,
                star: !output.star,
              }
            }
          })
        }}
      />
    }
    return <button
      className='icon-btn'
      onClick={() => q.set(state.word)}
      disabled={
        state.status === 'loading'
        || state.word.trim().length === 0
      }
    >
      <Icon_search />
    </button>
  })()


}

function useQ() {
  // `?q=xxx` 中的 q 是常规搜索业务中使用的查询参数
  const [params, set_params] = useSearchParams()
  return {
    val: params.get('q') ?? '',
    set: (val: string) => {
      val = val.trim()
      if (val.length)
        set_params({ q: val })
    }
  }
}
