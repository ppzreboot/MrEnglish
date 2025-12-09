import { useState, useEffect } from 'react'
import { useSearchParams } from 'wouter'
import { Icon_search } from '@mr-english-client/icon'
import { I_lookup_output } from '@mr-english/schema'
import { Star } from '@mr-english-client/ui'

import './page.css'
import { retrieve__lookup } from '../../api/lookup.ts'
import { post__star_word } from '../../api/word.ts'
import { Main_nav } from './nav/index.tsx'
import { Basic_explain } from './block/basic.tsx'
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

  return <div className='page home no-header'>
    <Main_nav />

    <div className='main-content main-input'>
      <input
        className='special-font'
        autoFocus
        disabled={state.status === 'loading'}
        value={state.word}
        placeholder='输入单词'
        onChange={evt => {
          if (state.status === 'loading')
            throw Error('loading 时不让输入')
          update({
            word: evt.target.value,
            status: 'before lookup',
          })
        }}
        onKeyDown={evt => {
          if (evt.key === 'Enter')
            q.set(state.word)
        }}
      />
      {right_btn}
    </div>

    {state.status === 'success' &&
      (state.output === null
        ? <p className='home-tip error'>{state.word} 好像不是个正经单词</p>
        : <div className='lookup-result'>
          <Basic_explain lookup_result={state.output.result} />
          {Boolean(state.output.result.mw?.length) &&
            // @ts-ignore:
            <EE_explain mw={state.output.result.mw} />
          }
          <Other_explain word={q.val} />
        </div>
      )
    }
    {state.status === 'error' &&
      <p className='home-tip error'>{state.error}</p>
    }
    {state.status === 'before lookup' &&
      <p className='home-tip hi special-font'>Hi, I'm MrEnglish</p>
    }
  </div>
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
