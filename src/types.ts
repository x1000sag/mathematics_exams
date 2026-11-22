export type Page = {
  id: string
  group: string
  nav: string
  title: string
  kicker?: string
  body: string
}

export type Block =
  | { kind: 'h'; level: 2 | 3; text: string; id: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'math'; tex: string }
  | {
      kind: 'callout'
      tone: 'idea' | 'note' | 'warn' | 'answer' | 'solution'
      title: string
      blocks: Block[]
    }
  | { kind: 'fig'; name: string }
  | { kind: 'table'; header: string[]; rows: string[][] }
