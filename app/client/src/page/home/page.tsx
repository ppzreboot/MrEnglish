import { useState } from 'react'
import { Icon_search } from '@mr-english-client/icon'
import { I_lookup_result } from '@mr-english/schema'
import './page.css'

import { retrieve__lookup } from '../../api/lookup.ts'

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
  const [state, update] = useState<I_state>({
    word: '',
    status: 'before lookup',
  })

  const go_lookup = async () => {
    if (state.status === 'loading')
      throw Error('上个单词还没查完')

    update(old => ({
      word: old.word,
      status: 'loading',
    }))

    const [error, result] = await retrieve__lookup(state.word)
    if (error === null)
      update(old => ({
        word: old.word,
        status: 'success',
        result: result,
      }))
    else
      update(old => ({
        word: old.word,
        status: 'error',
        error: '现在还不能查短语、句子',
      }))
  }

  return <div className='home-page'>
    <div className='main-content main-input'>
      <input
        autoFocus
        value={state.word}
        placeholder='输入单词'
        onChange={evt => {
          update(old => {
            if (old.status === 'error' || (
              old.status === 'success' && old.result === null
            ))
              return {
                word: evt.target.value,
                status: 'before lookup',
              }
            else
              return { ...state, word: evt.target.value }
          })
        }}
        onKeyDown={evt => {
          if (evt.key === 'Enter')
            go_lookup()
        }}
      />
      <button
        className='icon-btn'
        onClick={go_lookup}
        disabled={state.status === 'loading'}
      >
        <Icon_search />
      </button>
    </div>

    {state.status === 'success' &&
      (state.result === null
        ? <p className='not-a-word'>
            <span className='word'>{state.word}</span>
            <span>好像不是个正经单词</span>
          </p>
        : <Viewer {...state.result} />
      )
    }
  </div>
}

function Viewer({ ecdict, mw }: I_lookup_result) {
  return <div>
    {ecdict.translation.join('\n')}
  </div>
}
