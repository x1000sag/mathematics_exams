import type { Page } from '../../types'

const group = 'Вариант 4'

export const probVariant4: Page[] = [
  {
    id: 'pt-4-1',
    group,
    nav: 'Задача 1',
    title: 'Плотность $c(1-x)$ на $[0,1]$',
    kicker: 'Вариант 4 · блок 1',
    body: String.raw`
## Условие

$f(x) = c(1-x)$ на $[0,1]$. Найти $c$ и $\mathbb E[X]$.

:::idea
$\int_0^1 (1-x)\,dx = \dfrac12$.
:::

:::solution
$$c\cdot\frac12 = 1 \;\Rightarrow\; c = 2.$$

$$\mathbb E[X] = 2\int_0^1 x(1-x)\,dx = 2\int_0^1 (x-x^2)\,dx = 2\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1 = 2\left(\frac12 - \frac13\right) = \frac13.$$
:::

:::answer
$$c=2,\quad \mathbb E[X]=\frac{1}{3}$$
:::

:::warn
$(1-x)$ на $[0,1]$, не $(1+x)$.
:::
`,
  },
  {
    id: 'pt-4-2',
    group,
    nav: 'Задача 2',
    title: 'Равномерное $U(-1,2)$',
    kicker: 'Вариант 4 · блок 2',
    body: String.raw`
## Условие

$X \sim U(-1,2)$. Найти $\mathbb P(0 < X < 1)$.

:::idea
Длина интервала, делённая на $3$.
:::

:::solution
$$f(x) = \frac13, \quad x \in [-1,2].$$

$$\mathbb P(0 < X < 1) = \int_0^1 \frac{dx}{3} = \frac{1}{3}.$$
:::

:::answer
$$\frac{1}{3}$$
:::

:::note
$\mathbb E[X] = \dfrac{-1+2}{2} = \dfrac12$.
:::
`,
  },
  {
    id: 'pt-4-3',
    group,
    nav: 'Задача 3',
    title: 'Плотность $Y = X^3$',
    kicker: 'Вариант 4 · блок 3',
    body: String.raw`
## Условие

$f_X(x) = 1$ на $[-1,1]$ (равномерное). Найти плотность $Y = X^3$.

:::idea
$g(x)=x^3$ возрастает на $[-1,1]$, $x = y^{1/3}$, $y \in [-1,1]$.
:::

:::solution
$$f_Y(y) = f_X(y^{1/3})\left|\frac{dx}{dy}\right| = 1\cdot\frac{1}{3|y|^{2/3}} = \frac{1}{3|y|^{2/3}}, \quad y \in [-1,1],\, y\ne 0.$$

При $y \in (0,1)$: $f_Y(y) = \dfrac{1}{3y^{2/3}}$.

Симметрия: при $|y|\le 1$ можно записать ту же формулу с модулем.
:::

:::answer
$$f_Y(y)=\frac{1}{3y^{2/3}},\quad y \in (0,1] \; \text{(на } (-1,0)\text{ — то же с } |y|)$$
:::

:::warn
Якобиан $\dfrac{dx}{dy} = \dfrac{1}{3y^{2/3}}$, не $\dfrac{1}{3}$.
:::
`,
  },
  {
    id: 'pt-4-4',
    group,
    nav: 'Задача 4',
    title: 'Момент $\\mathbb E[X^2]$',
    kicker: 'Вариант 4 · блок 1',
    body: String.raw`
## Условие

$f(x) = 2x$ на $[0,1]$. Найти $\mathbb E[X^2]$.

:::idea
$\mathbb E[g(X)] = \int g(x) f(x)\,dx$.
:::

:::solution
$$\mathbb E[X^2] = \int_0^1 x^2\cdot 2x\,dx = 2\int_0^1 x^3\,dx = 2\cdot\frac14 = \frac12.$$

(Если нужна дисперсия: $\mathbb E[X] = \int_0^1 2x^2\,dx = 2/3$, $\operatorname{Var}(X) = 1/2 - 4/9 = 1/18$.)
:::

:::answer
$$\mathbb E[X^2]=\frac{1}{2}$$
:::

:::note
Та же $f$ что в [вар. 1, задача 6](#pt-1-6) — можно связать с преобразованием $Y=X^2$.
:::
`,
  },
  {
    id: 'pt-4-5',
    group,
    nav: 'Задача 5',
    title: 'Равномерное: середина носителя',
    kicker: 'Вариант 4 · блок 2',
    body: String.raw`
## Условие

$X \sim U(0,1)$. Найти $\mathbb P\!\left(X \in \left[\dfrac14, \dfrac34\right]\right)$.

:::idea
Отрезок длины $\dfrac12$ внутри носителя длины $1$.
:::

:::solution
$$\mathbb P = \frac{3/4 - 1/4}{1} = \frac{1}{2}.$$
:::

:::answer
$$\frac{1}{2}$$
:::

:::warn
Это не «симметрия вокруг среднего» в смысле $\mathcal N$ — просто длина подынтегрального интервала.
:::
`,
  },
  {
    id: 'pt-4-6',
    group,
    nav: 'Задача 6',
    title: 'Плотность $Y = \\sqrt{X}$, $X \\sim \\mathrm{Exp}(2)$',
    kicker: 'Вариант 4 · блок 3',
    body: String.raw`
## Условие

$X \sim \mathrm{Exp}(2)$: $f_X(x) = 2e^{-2x}$, $x \ge 0$. Найти плотность $Y = \sqrt{X}$.

:::idea
$x = y^2$, $y \ge 0$, $\dfrac{dx}{dy} = 2y$.
:::

:::solution
$$f_Y(y) = f_X(y^2)\cdot 2y = 2e^{-2y^2}\cdot 2y = 4y e^{-2y^2}, \quad y \ge 0.$$

(На некоторых листах вместо корня дают $Y=X^2$ от $\mathrm{Exp}$ — тогда $f_Y(y)=\lambda e^{-\lambda\sqrt{y}}/(2\sqrt{y})$.)

Эквивалентная запись через $\mathrm{Exp}(2)$ на $x$:

$$\mathbb E[Y] = \int_0^\infty \sqrt{x}\cdot 2e^{-2x}\,dx = \frac{\sqrt{\pi}}{4}$$
— если спросят момент, через гамма-функцию; на уровне B чаще достаточно $f_Y$.
:::

:::answer
$$f_Y(y)=4y e^{-2y^2},\quad y \ge 0$$
:::

:::warn
Проверка: замена $u=y^2$ даёт $\displaystyle\int_0^\infty 4y e^{-2y^2}\,dy = 1$.
:::
`,
  },
]