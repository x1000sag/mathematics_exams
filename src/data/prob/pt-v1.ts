import type { Page } from '../../types'

const group = 'Вариант 1'

export const probVariant1: Page[] = [
  {
    id: 'pt-1-1',
    group,
    nav: 'Задача 1',
    title: 'Плотность $c\\,x(2-x)$ на $[0,2]$',
    kicker: 'Вариант 1 · блок 1',
    body: String.raw`
## Условие

Плотность случайной величины $X$ на отрезке $[0,2]$ имеет вид $f(x)=c\,x(2-x)$. Найти $c$, $\mathbb E[X]$ и $\operatorname{Var}(X)$.

:::idea
Сначала нормировка на $[0,2]$, затем $\mathbb E[X]$ и $\mathbb E[X^2]$ теми же пределами. Дисперсия — разность квадрата среднего и среднего квадрата.
:::

:::solution
$$\int_0^2 x(2-x)\,dx = \int_0^2 (2x-x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}.$$

$$\int_0^2 c\,x(2-x)\,dx = 1 \;\Rightarrow\; c = \frac{3}{4}.$$

$$\mathbb E[X] = \frac{3}{4}\int_0^2 x^2(2-x)\,dx = \frac{3}{4}\int_0^2 (2x^3-x^4)\,dx = \frac{3}{4}\left[\frac{x^4}{2}-\frac{x^5}{5}\right]_0^2 = \frac{3}{4}\cdot\frac{8}{5} = 1.$$

$$\mathbb E[X^2] = \frac{3}{4}\int_0^2 x^3(2-x)\,dx = \frac{3}{4}\left[\frac{2x^4}{4}-\frac{x^5}{5}\right]_0^2 = \frac{3}{4}\cdot\frac{8}{5} = \frac{6}{5}.$$

$$\operatorname{Var}(X) = \frac{6}{5} - 1 = \frac{1}{5}.$$
:::

:::answer
$$c=\frac{3}{4},\quad \mathbb E[X]=1,\quad \operatorname{Var}(X)=\frac{1}{5}$$
:::

:::warn
Константу $c$ ищут по **всему** $[0,2]$, а не по интервалу из пункта про вероятность (его здесь нет).
:::
`,
  },
  {
    id: 'pt-1-2',
    group,
    nav: 'Задача 2',
    title: 'Экспоненциальное распределение',
    kicker: 'Вариант 1 · блок 2',
    body: String.raw`
## Условие

Случайная величина $X \sim \mathrm{Exp}(\lambda)$ с $\lambda = \dfrac12$ ($\mathbb E[X]=2$). Найти $\mathbb P(X > 2)$.

:::idea
Для экспоненциального $\mathbb P(X > t) = e^{-\lambda t}$ при $t \ge 0$.
:::

:::solution
$$\mathbb P(X > 2) = e^{-\frac12\cdot 2} = e^{-1}.$$
:::

:::answer
$$e^{-1}$$
:::

:::note
Через функцию распределения: $\mathbb P(X > 2) = 1 - F(2) = 1 - \bigl(1-e^{-1}\bigr) = e^{-1}$.
:::
`,
  },
  {
    id: 'pt-1-3',
    group,
    nav: 'Задача 3',
    title: 'Линейное преобразование $Y=2X-1$',
    kicker: 'Вариант 1 · блок 3',
    body: String.raw`
## Условие

$X \sim U(0,3)$. Найти плотность $Y = 2X - 1$ и указать носитель.

:::idea
Равномерное линейно преобразуется в равномерное: длина носителя умножается на $|a|$, плотность делится на $|a|$.
:::

:::solution
$f_X(x) = \dfrac13$, $x \in [0,3]$.

При $x \in [0,3]$: $y = 2x-1 \in [-1,5]$, длина $6$.

$$f_Y(y) = \frac{1}{|2|}\, f_X\!\left(\frac{y+1}{2}\right) = \frac12\cdot\frac13 = \frac16, \quad y \in [-1,5].$$

Проверка: $\int_{-1}^5 \frac16\,dy = 1$.
:::

:::answer
$$f_Y(y)=\frac{1}{6},\quad y \in [-1,5]$$
:::

:::warn
Носитель $Y$ — **образ** отрезка $[0,3]$, не $[0,3]$ сами по себе.
:::
`,
  },
  {
    id: 'pt-1-4',
    group,
    nav: 'Задача 4',
    title: 'Плотность $c/x$ и медиана',
    kicker: 'Вариант 1 · блок 1',
    body: String.raw`
## Условие

На $[1,e]$ задано $f(x) = \dfrac{c}{x}$. Найти $c$ и медиану $m$ ($\mathbb P(X \le m)=\dfrac12$).

:::idea
$\int_1^e \dfrac{dx}{x} = \ln e = 1$. Медиана — корень $\int_1^m \dfrac{dx}{x} = \dfrac12$.
:::

:::solution
$$\int_1^e \frac{c}{x}\,dx = c\ln x\Big|_1^e = c = 1.$$

Медиана: $\ln m = \dfrac12$, откуда $m = e^{1/2} = \sqrt{e}$.
:::

:::answer
$$c=1,\quad m=\sqrt{e}$$
:::

:::note
Это не стандартное табличное распределение на всей оси — только отрезок $[1,e]$ с плотностью, нормированной на нём.
:::
`,
  },
  {
    id: 'pt-1-5',
    group,
    nav: 'Задача 5',
    title: 'Нормальное $\\mathcal N(0,4)$',
    kicker: 'Вариант 1 · блок 2',
    body: String.raw`
## Условие

$X \sim \mathcal N(0,4)$ (дисперсия $4$, стандартное отклонение $2$). Найти $\mathbb P(|X| < 1)$, используя таблицу функции $\Phi$ стандартного нормального закона.

:::idea
Стандартизируйте: $Z = X/2 \sim \mathcal N(0,1)$. $|X|<1$ эквивалентно $|Z| < 1/2$.
:::

:::solution
$$X = 2Z, \quad Z \sim \mathcal N(0,1).$$

$$\mathbb P(|X| < 1) = \mathbb P(|Z| < 0{,}5) = 2\Phi(0{,}5) - 1.$$

По таблице $\Phi(0{,}5) \approx 0{,}6915$:

$$\mathbb P \approx 2\cdot 0{,}6915 - 1 = 0{,}383.$$
:::

:::answer
$$2\Phi(0{,}5)-1 \approx 0{,}383$$
:::

:::warn
В записи $\mathcal N(0,4)$ второй параметр — **дисперсия**, не $\sigma$. Делить на $2$, не на $4$.
:::
`,
  },
  {
    id: 'pt-1-6',
    group,
    nav: 'Задача 6',
    title: 'Плотность $Y=X^2$',
    kicker: 'Вариант 1 · блок 3',
    body: String.raw`
## Условие

Плотность $X$: $f_X(x) = 2x$ при $x \in [0,1]$, иначе $0$. Найти плотность $Y = X^2$.

:::idea
$Y = g(X)$, $g(x)=x^2$ возрастает на $[0,1]$. Обратная $x = \sqrt{y}$, $y \in (0,1]$.
:::

:::solution
$y = x^2$, $x = \sqrt{y}$, $\dfrac{dx}{dy} = \dfrac{1}{2\sqrt{y}}$.

$$f_Y(y) = f_X(\sqrt{y})\left|\frac{dx}{dy}\right| = 2\sqrt{y}\cdot\frac{1}{2\sqrt{y}} = 1, \quad y \in (0,1].$$

На $y=0$ точка массы нулевая; в $(0,1]$ получили равномерную на единичной длине плотность.
:::

:::answer
$$f_Y(y)=1,\quad y \in (0,1]$$
:::

:::warn
Не забыть множитель $\dfrac{1}{2\sqrt{y}}$ — без него ответ «$2\sqrt{y}$» был бы плотностью по $x$, а не по $y$.
:::
`,
  },
]