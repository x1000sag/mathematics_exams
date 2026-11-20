import type { Page } from '../types'
import { guidePages } from './guide'
import { variant1 } from './v1'
import { variant2 } from './v2'
import { variant3 } from './v3'
import { variant4 } from './v4'

export const pages: Page[] = [...guidePages, ...variant1, ...variant2, ...variant3, ...variant4]

export const groups = ['Подготовка', 'Шпаргалка', 'Алгоритмы', 'Демо', 'Вариант 2', 'Вариант 3', 'Вариант 4']
