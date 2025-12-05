import { useState, useEffect } from 'react'
import { useSearchParams } from 'wouter'
import { Icon_search } from '@mr-english-client/icon'
import { I_lookup_result } from '@mr-english/schema'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { Read_word } from '@mr-english-client/ui'
import './page.css'

import { retrieve__lookup } from '../../api/lookup.ts'
import { I_formatted_meriam_webster_prs } from '@mr-english/meriam-webster'

type I_state = {
  word: string
  status: 'before lookup' | 'loading'
} | {
  word: string
  status: 'success'
  result: I_lookup_result | null
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

    const [error, result] = await retrieve__lookup(word)
    if (error === null)
      update({
        word, // loading 期间，不允许输入，可用旧 word
        status: 'success',
        result: result,
      })
    else
      update({
        word,
        status: 'error',
        error: '现在还不能查短语、句子', // todo: 特殊字符
      })
  }

  return <div className='home-page'>
    <div className='main-content main-input'>
      <input
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
      <button
        className='icon-btn'
        onClick={() => q.set(state.word)}
        disabled={
          state.status === 'loading'
          || state.word.trim().length === 0
        }
      >
        <Icon_search />
      </button>
    </div>

    {state.status === 'success' &&
      (state.result === null
        ? <p className='lookup-error'>{state.word} 好像不是个正经单词</p>
        : <Viewer {...state.result} />
      )
    }
    {state.status === 'error' &&
      <p className='lookup-error'>{state.error}</p>
    }
  </div>
}

function Viewer({ ecdict, mw }: I_lookup_result) {
  const inf_list = Object.entries(ecdict.inflection)
    .filter(([_, v]) => v)
    .map(([k, v]) => [
      inflection_label[k as I_inflection_type],
      v,
    ])

  // 音标与读音
  const read_list = mw === undefined ? [] :
    mw.flatMap(entry => entry.prs)
      .filter(prns => prns) as I_formatted_meriam_webster_prs[]

  return <div className='lookup-result'>
    <article className='main-content basic'>
      <h5>简明释义</h5>

      {Boolean(read_list.length) &&
        <ul className='pronunciation-list'>
          {read_list.map((prn, i) =>
            <li key={i}>
              <Read_word {...prn} />
            </li>
          )}
        </ul>
      }
      <ul className='list'>
        {ecdict.translation.map(item =>
          <li key={item}>{item}</li>
        )}
      </ul>
      {Boolean(inf_list.length) &&
        <ul className='txt-item inflection-list'>
          {inf_list.map(([k, v]) =>
            <li key={k}>
              <label>{k}</label>
              <span> {v}</span>
            </li>
          )}
        </ul>
      }
    </article>

    {mw &&
      <article className='main-content e2e'>
        <h5>英英释义</h5>
        {mw.map((entry, index) =>
          <ul key={index} className='list'>
            {entry.shortdef.map(def => <li key={def}>{def}</li>)}
          </ul>
        )}
      </article>
    }

    <article className='main-content e2e'>
      <h5>其他字典</h5>
      <p>
        <a href={'https://youdao.com/result?lang=en&word=' + ecdict.word} target='_blank'>有道</a>
      </p>
    </article>
  </div>
}

const inflection_label: Record<I_inflection_type, string> = {
  did: '过去式',
  done: '过去分词',
  ing: '进行时',
  does: '第三人称单数',
  er: '比较级',
  est: '最高级',
  s: '复数',
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
