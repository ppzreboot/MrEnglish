import { useState, useEffect } from 'react'
import { useSearchParams } from 'wouter'
import { Icon_search } from '@mr-english-client/icon'
import { I_lookup_output, I_lookup_result } from '@mr-english/schema'
import type { I_inflection_type } from '@ppz-ai/ecdict-common'
import { En_p, Read_word, Star } from '@mr-english-client/ui'
import { I_formatted_meriam_webster_prs } from '@mr-english/meriam-webster'
import './page.css'

import { retrieve__lookup } from '../../api/lookup.ts'
import { post__star_word } from '../../api/word.ts'

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

  return <div className='home-page'>
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
        : <Viewer {...state.output.result} />
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
          <li key={item} className='txt-item'>{item}</li>
        )}
      </ul>
      {(Boolean(inf_list.length) || ecdict.lemma) &&
        <ul className='txt-item inflection-list'>
          {ecdict.lemma &&
            <li>
              <label>原型 </label>
              <a href={'./?q=' + ecdict.lemma.lemma}>
                <span className='special-font'>{ecdict.lemma.lemma}</span>
              </a>
            </li>
          }
          {inf_list.map(([k, v]) =>
            <li key={k}>
              <label>{k} </label>
              <span className='special-font'>{v}</span>
            </li>
          )}
        </ul>
      }
    </article>

    {mw && (mw.length > 0) &&
      <article className='main-content e2e'>
        <h5>英英释义</h5>
        {mw.map((entry, index) =>
          <div key={index} className='entry'>
            {entry.fl &&
              <h5 className='fl'>{entry.fl}</h5>
            }
            <ul className='list'>
              {entry.shortdef.map(def =>
                <li key={def} className='txt-item'>
                  <div title={def}>
                    <En_p text={def} />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </article>
    }

    <article className='main-content other-dict'>
      <h5>其他字典</h5>
      <p>
        <a href={'https://youdao.com/result?lang=en&word=' + ecdict.word} target='_blank'>有道词典</a>
        <a href={'https://dict.eudic.net/dicts/en/' + ecdict.word} target='_blank'>欧路词典</a>
        <a href={`https://translate.google.com/?sl=en&tl=zh-CN&text=${ecdict.word}&op=translate`} target='_blank'>谷歌翻译</a>
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
