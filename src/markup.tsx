import { useState, type ReactNode } from 'react'
import katex from 'katex'
import type { Block } from './types'
import { Figure } from './figures'
import { useGuide } from './guide-context'

const tones = new Set(['idea', 'note', 'warn', 'answer', 'solution'])

const defaultTitle: Record<string, string> = {
  idea: 'Идея',
  note: 'Заметка',
  warn: 'На контрольной',
  answer: 'Ответ',
  solution: 'Решение',
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/\$[^$]+\$/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
}

export function parse(src: string): Block[] {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const used = new Map<string, number>()
  const takeId = (text: string) => {
    const base = slug(text) || 'section'
    const n = used.get(base) ?? 0
    used.set(base, n + 1)
    return n === 0 ? base : `${base}-${n + 1}`
  }
  return parseLines(lines, 0, lines.length, takeId).blocks
}

function parseLines(
  lines: string[],
  start: number,
  end: number,
  takeId: (text: string) => string,
): { blocks: Block[]; i: number } {
  const blocks: Block[] = []
  let buf: string[] = []
  let i = start

  const flush = () => {
    const text = buf.join(' ').replace(/\s+/g, ' ').trim()
    buf = []
    if (text) blocks.push({ kind: 'p', text })
  }

  const isTableRow = (line: string) => {
    const t = line.trim()
    return t.startsWith('|') && t.endsWith('|') && t.length > 2
  }

  const isTableSeparator = (line: string) => /^\|[\s\-:|]+\|$/.test(line.trim())

  const tableCells = (line: string) =>
    line
      .trim()
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim())

  while (i < end) {
    const trimmed = lines[i].trim()

    if (trimmed === ':::') {
      flush()
      return { blocks, i }
    }

    if (trimmed.startsWith(':::')) {
      flush()
      const rest = trimmed.slice(3).trim()
      const toneWord = rest.split(/\s+/)[0] ?? 'note'
      const tone = tones.has(toneWord)
        ? (toneWord as 'idea' | 'note' | 'warn' | 'answer' | 'solution')
        : 'note'
      const custom = rest.slice(toneWord.length).trim()
      i += 1
      const inner = parseLines(lines, i, end, takeId)
      i = inner.i
      if (i < end && lines[i].trim() === ':::') i += 1
      blocks.push({
        kind: 'callout',
        tone,
        title: custom || defaultTitle[tone],
        blocks: inner.blocks,
      })
      continue
    }

    if (trimmed.startsWith('::fig ')) {
      flush()
      blocks.push({ kind: 'fig', name: trimmed.slice(6).trim() })
      i += 1
      continue
    }

    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
      flush()
      blocks.push({ kind: 'math', tex: trimmed.slice(2, -2).trim() })
      i += 1
      continue
    }

    if (trimmed === '$$') {
      flush()
      i += 1
      const tex: string[] = []
      while (i < end && lines[i].trim() !== '$$') {
        tex.push(lines[i])
        i += 1
      }
      if (i < end) i += 1
      blocks.push({ kind: 'math', tex: tex.join('\n').trim() })
      continue
    }

    if (trimmed.startsWith('### ')) {
      flush()
      const text = trimmed.slice(4).trim()
      blocks.push({ kind: 'h', level: 3, text, id: takeId(text) })
      i += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      flush()
      const text = trimmed.slice(3).trim()
      blocks.push({ kind: 'h', level: 2, text, id: takeId(text) })
      i += 1
      continue
    }

    if (isTableRow(trimmed) && i + 1 < end && isTableSeparator(lines[i + 1].trim())) {
      flush()
      const header = tableCells(trimmed)
      i += 2
      const rows: string[][] = []
      while (i < end && isTableRow(lines[i].trim()) && !isTableSeparator(lines[i].trim())) {
        rows.push(tableCells(lines[i]))
        i += 1
      }
      blocks.push({ kind: 'table', header, rows })
      continue
    }

    if (trimmed.startsWith('- ')) {
      flush()
      const items: string[] = []
      while (i < end && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2).trim())
        i += 1
      }
      blocks.push({ kind: 'ul', items })
      continue
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flush()
      const items: string[] = []
      while (i < end && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i += 1
      }
      blocks.push({ kind: 'ol', items })
      continue
    }

    if (trimmed === '') {
      flush()
      i += 1
      continue
    }

    buf.push(trimmed)
    i += 1
  }

  flush()
  return { blocks, i }
}

function MathTex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
    strict: 'ignore',
    output: 'html',
  })
  if (display) {
    return <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
}

function InlineParts({ text, allowBold }: { text: string; allowBold?: boolean }) {
  const { go } = useGuide()
  const re = allowBold
    ? /\$([^$]+)\$|\*\*([^*]+)\*\*|\[([^\]]+)\]\(#([a-z0-9-]+)\)/g
    : /\$([^$]+)\$|\[([^\]]+)\]\(#([a-z0-9-]+)\)/g
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0
    if (index > last) out.push(text.slice(last, index))
    if (match[1] != null) {
      out.push(<MathTex key={key} tex={match[1]} />)
    } else if (allowBold && match[2] != null) {
      out.push(
        <strong key={key}>
          <InlineParts text={match[2]} allowBold={false} />
        </strong>,
      )
    } else {
      const label = allowBold ? match[3] : match[2]
      const id = allowBold ? match[4] : match[3]
      if (label != null && id != null) {
        out.push(
          <a
            key={key}
            href={`#${id}`}
            onClick={(event) => {
              event.preventDefault()
              go(id)
            }}
          >
            {label}
          </a>,
        )
      }
    }
    key += 1
    last = index + match[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

export function Inline({ text }: { text: string }) {
  return <InlineParts text={text} allowBold />
}

function Callout({ block }: { block: Extract<Block, { kind: 'callout' }> }) {
  const { training } = useGuide()
  const [open, setOpen] = useState(false)
  const hideSolution = training && block.tone === 'solution' && !open
  const hideAnswer = training && block.tone === 'answer' && !open

  if (hideSolution) {
    return (
      <button type="button" className="reveal" onClick={() => setOpen(true)}>
        Показать решение
      </button>
    )
  }

  if (hideAnswer) {
    return (
      <button type="button" className="answer answer-hidden" onClick={() => setOpen(true)}>
        <span className="callout-kicker">
          <Inline text={block.title} />
        </span>
        <span>Скрыто. Нажмите, когда будете сверять.</span>
      </button>
    )
  }

  return (
    <aside className={`callout ${block.tone}`}>
      <div className="callout-kicker">
        <Inline text={block.title} />
      </div>
      <Blocks blocks={block.blocks} />
    </aside>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === 'h') {
          const Tag = block.level === 2 ? 'h2' : 'h3'
          return (
            <Tag key={index} id={block.id}>
              <Inline text={block.text} />
            </Tag>
          )
        }
        if (block.kind === 'p') {
          return (
            <p key={index}>
              <Inline text={block.text} />
            </p>
          )
        }
        if (block.kind === 'ul') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          )
        }
        if (block.kind === 'ol') {
          return (
            <ol key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline text={item} />
                </li>
              ))}
            </ol>
          )
        }
        if (block.kind === 'math') return <MathTex key={index} tex={block.tex} display />
        if (block.kind === 'fig') return <Figure key={index} name={block.name} />
        if (block.kind === 'table') {
          return (
            <div key={index} className="table-wrap">
              <table className="md-table">
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th key={cellIndex}>
                        <Inline text={cell} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        return <Callout key={index} block={block} />
      })}
    </>
  )
}
