import type { Page } from '../types'
import { guidePages } from './guide'
import { variant1 } from './v1'
import { variant2 } from './v2'
import { variant3 } from './v3'
import { variant4 } from './v4'
import { probGuidePages } from './prob/guide'
import { probVariant1 } from './prob/pt-v1'
import { probVariant2 } from './prob/pt-v2'
import { probVariant3 } from './prob/pt-v3'
import { probVariant4 } from './prob/pt-v4'

export type Exam = {
  id: string
  brandKicker: string
  brandTitle: string
  brandSubtitle: string
  groups: string[]
  pages: Page[]
}

const integralsPages: Page[] = [...guidePages, ...variant1, ...variant2, ...variant3, ...variant4]

const integralsGroups = ['Подготовка', 'Шпаргалка', 'Алгоритмы', 'Демо', 'Вариант 2', 'Вариант 3', 'Вариант 4']

const probGroups = [
  'Подготовка',
  'Шпаргалка',
  'Алгоритмы',
  'Вариант 1',
  'Вариант 2',
  'Вариант 3',
  'Вариант 4',
]

const probPages: Page[] = [
  ...probGuidePages,
  ...probVariant1,
  ...probVariant2,
  ...probVariant3,
  ...probVariant4,
]

export const exams: Exam[] = [
  {
    id: 'integrals',
    brandKicker: 'К переписыванию',
    brandTitle: 'Криволинейные и поверхностные интегралы',
    brandSubtitle: 'Демо, три варианта контрольной, формулы и ловушки.',
    groups: integralsGroups,
    pages: integralsPages,
  },
  {
    id: 'prob',
    brandKicker: 'К переписыванию',
    brandTitle: 'Теория вероятностей',
    brandSubtitle: 'Абсолютно непрерывные СВ, стандартные распределения, преобразования.',
    groups: probGroups,
    pages: probPages,
  },
]

export function examById(id: string): Exam {
  return exams.find((exam) => exam.id === id) ?? exams[0]
}