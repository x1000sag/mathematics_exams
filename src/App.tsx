import { useEffect, useMemo, useState } from 'react'
import { pages, groups } from './data'
import { Blocks, parse } from './markup'
import { GuideContext } from './guide-context'
import type { Page } from './types'

const PROGRESS_KEY = 'kr-dg-progress'
const TRAIN_KEY = 'kr-dg-training'
const FLOW_KEY = 'kr-dg-flow'

function loadSet(key: string) {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [])
  } catch {
    return new Set<string>()
  }
}

export default function App() {
  const [active, setActive] = useState(() => {
    const id = window.location.hash.replace('#', '')
    return pages.some((page) => page.id === id) ? id : pages[0].id
  })
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [training, setTraining] = useState(() => localStorage.getItem(TRAIN_KEY) === '1')
  const [flow, setFlow] = useState(() => localStorage.getItem(FLOW_KEY) === '1')
  const [done, setDone] = useState<Set<string>>(() => loadSet(PROGRESS_KEY))

  useEffect(() => {
    localStorage.setItem(TRAIN_KEY, training ? '1' : '0')
  }, [training])
  useEffect(() => {
    localStorage.setItem(FLOW_KEY, flow ? '1' : '0')
  }, [flow])
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done]))
  }, [done])

  const go = (id: string) => {
    if (!pages.some((page) => page.id === id)) return
    setActive(id)
    setNavOpen(false)
    window.history.replaceState(null, '', `#${id}`)
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`page-${active}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [active])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault()
        document.getElementById('search')?.focus()
      }
      if (event.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((page) => `${page.nav} ${page.title} ${page.kicker ?? ''} ${page.body}`.toLowerCase().includes(q))
  }, [query])

  const currentIndex = pages.findIndex((page) => page.id === active)
  const current = pages[currentIndex] ?? pages[0]
  const shown = flow ? filtered : [current]

  return (
    <GuideContext.Provider value={{ training, go }}>
      <div className="shell">
        {navOpen && <button className="overlay" aria-label="Закрыть меню" onClick={() => setNavOpen(false)} />}
        <aside className={navOpen ? 'sidebar open' : 'sidebar'}>
          <div className="brand">
            <p className="brand-kicker">К переписыванию</p>
            <h1>Криволинейные и поверхностные интегралы</h1>
            <p>Образец контрольной: четыре варианта, формулы и ловушки.</p>
          </div>
          <input
            id="search"
            className="search"
            placeholder="Поиск"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Поиск по конспекту"
          />
          <nav className="nav" aria-label="Разделы">
            {filtered.length === 0 && <p className="empty-nav">Ничего не нашлось. Попробуйте «поток» или «циклоида».</p>}
            {groups.map((group) => {
              const items = filtered.filter((page) => page.group === group)
              if (items.length === 0) return null
              return (
                <div key={group}>
                  <div className="nav-group">
                    <span>{group}</span>
                  </div>
                  {items.map((page) => (
                    <button
                      key={page.id}
                      type="button"
                      className={`${page.id === active ? 'active' : ''} ${done.has(page.id) ? 'done' : ''}`}
                      onClick={() => go(page.id)}
                    >
                      {page.nav}
                      {page.nav !== page.title && <small>{page.title}</small>}
                    </button>
                  ))}
                </div>
              )
            })}
          </nav>
        </aside>
        <div className="main">
          <header className="topbar">
            <button type="button" className="menu" onClick={() => setNavOpen(true)}>
              Содержание
            </button>
            <div className="progress">
              Разобрано {done.size} из {pages.length}
            </div>
            <div className="topbar-actions">
              <button type="button" className={flow ? 'btn active' : 'btn'} onClick={() => setFlow((value) => !value)}>
                {flow ? 'Лента: вся' : 'Лента: один раздел'}
              </button>
              <button
                type="button"
                className={training ? 'btn primary' : 'btn'}
                onClick={() => setTraining((value) => !value)}
              >
                {training ? 'Тренировка включена' : 'Режим тренировки'}
              </button>
            </div>
          </header>
          <div className="sheet">
            {shown.map((page) => (
              <Article
                key={`${page.id}-${training ? 't' : 's'}`}
                page={page}
                done={done.has(page.id)}
                onToggle={() => {
                  setDone((prev) => {
                    const next = new Set(prev)
                    if (next.has(page.id)) next.delete(page.id)
                    else next.add(page.id)
                    return next
                  })
                }}
              />
            ))}
            {!flow && (
              <div className="pager">
                <button
                  type="button"
                  className="btn"
                  disabled={currentIndex <= 0}
                  onClick={() => currentIndex > 0 && go(pages[currentIndex - 1].id)}
                >
                  {currentIndex > 0 ? `← ${pages[currentIndex - 1].nav}` : 'Начало'}
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={currentIndex >= pages.length - 1}
                  onClick={() => currentIndex < pages.length - 1 && go(pages[currentIndex + 1].id)}
                >
                  {currentIndex < pages.length - 1 ? `${pages[currentIndex + 1].nav} →` : 'Конец'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GuideContext.Provider>
  )
}

function Article({ page, done, onToggle }: { page: Page; done: boolean; onToggle: () => void }) {
  const blocks = useMemo(() => parse(page.body), [page.body])
  return (
    <article className="article" id={`page-${page.id}`}>
      <div className="article-head">
        <div>
          {page.kicker && <p className="kicker">{page.kicker}</p>}
          <h2>{page.title}</h2>
        </div>
        <label className="check">
          <input type="checkbox" checked={done} onChange={onToggle} />
          разобрал
        </label>
      </div>
      <Blocks blocks={blocks} />
    </article>
  )
}
