import type { Page } from '../../types'

const group = 'Вариант 2'

export const probVariant2: Page[] = [
  {
    id: 'pt-2-1',
    group,
    nav: 'Задача 1',
    title: 'Плотность $c\\sin x$ на $[0,\\pi]$',
    kicker: 'Вариант 2 · блок 1',
    body: String.raw`
## Условие

$f(x) = c\sin x$ на $[0,\pi]$. Найти $c$ и $\mathbb E[X]$.

:::idea
$\int_0^\pi \sin x\,dx = 2$. Ожидание — интеграл $x\sin x$.
:::

:::solution
$$\int_0^\pi c\sin x\,dx = c\cdot 2 = 1 \;\Rightarrow\; c = \frac12.$$

$$\mathbb E[X] = \frac12\int_0^\pi x\sin x\,dx.$$

Интегрирование по частям: $u=x$, $dv=\sin x\,dx$, тогда $du=dx$, $v=-\cos x$:

$$\int_0^\pi x\sin x\,dx = \left[-x\cos x\right]_0^\pi + \int_0^\pi \cos x\,dx = \pi + \sin x\Big|_0^\pi = \pi.$$

$$\mathbb E[X] = \frac{\pi}{2}.$$
:::

:::answer
$$c=\frac{1}{2},\quad \mathbb E[X]=\frac{\pi}{2}$$
:::

:::note
$\mathbb E[X^2]$ здесь не спрашивают — не тратьте время, если в условии только ожидание.
:::
`,
  },
  {
    id: 'pt-2-2',
    group,
    nav: 'Задача 2',
    title: 'Экспоненциальное с параметром $3$',
    kicker: 'Вариант 2 · блок 2',
    body: String.raw`
## Условие

$X \sim \mathrm{Exp}(3)$. Найти $\mathbb P(X > 1)$.

:::idea
$\mathbb P(X > t) = e^{-3t}$.
:::

:::solution
$$\mathbb P(X > 1) = e^{-3\cdot 1} = e^{-3}.$$
:::

:::answer
$$e^{-3}$$
:::

:::warn
Не путать с вариантом 1: здесь $\lambda=3$, не $1/2$.
:::
`,
  },
  {
    id: 'pt-2-3',
    group,
    nav: 'Задача 3',
    title: '$Y = -\ln X$, $X \\sim U(0,1)$',
    kicker: 'Вариант 2 · блок 3',
    body: String.raw`
## Условие

$X \sim U(0,1)$. Найти плотность $Y = -\ln X$.

:::idea
Классическая связь: если $U\sim U(0,1)$, то $-\ln U \sim \mathrm{Exp}(1)$. Можно вывести через обратную функцию.
:::

:::solution
$x \in (0,1)$, $y = -\ln x > 0$, обратно $x = e^{-y}$.

$f_X(x)=1$ на $(0,1)$.

$$\frac{dx}{dy} = -e^{-y}, \quad \left|\frac{dx}{dy}\right| = e^{-y}.$$

$$f_Y(y) = f_X(e^{-y})\cdot e^{-y} = e^{-y}, \quad y > 0.$$

Это $\mathrm{Exp}(1)$.
:::

:::answer
$$f_Y(y)=e^{-y},\quad y>0$$
:::

:::note
Метод обратной функции для моделирования: $X = F^{-1}(U)$. Здесь $F(y)=1-e^{-y}$.
:::
`,
  },
  {
    id: 'pt-2-4',
    group,
    nav: 'Задача 4',
    title: 'Плотность $\\dfrac{3}{8}x^2$ на $[0,2]$',
    kicker: 'Вариант 2 · блок 1',
    body: String.raw`
## Условие

На $[0,2]$ задана плотность $f(x) = \dfrac{3}{8}x^2$. Проверить нормировку и найти $\mathbb E[X]$, $\operatorname{Var}(X)$.

:::idea
Интеграл $\int_0^2 x^2\,dx = 8/3$ даст множитель $3/8$.
:::

:::solution
$$\int_0^2 \frac{3}{8}x^2\,dx = \frac{3}{8}\cdot\frac{8}{3} = 1.$$

$$\mathbb E[X] = \int_0^2 x\cdot\frac{3}{8}x^2\,dx = \frac{3}{8}\int_0^2 x^3\,dx = \frac{3}{8}\cdot\frac{16}{4} = \frac{3}{2}.$$

$$\mathbb E[X^2] = \int_0^2 x^2\cdot\frac{3}{8}x^2\,dx = \frac{3}{8}\int_0^2 x^4\,dx = \frac{3}{8}\cdot\frac{32}{5} = \frac{12}{5}.$$

$$\operatorname{Var}(X) = \frac{12}{5} - \left(\frac{3}{2}\right)^2 = \frac{12}{5} - \frac{9}{4} = \frac{48-45}{20} = \frac{3}{20}.$$
:::

:::answer
$$\mathbb E[X]=\frac{3}{2},\quad \operatorname{Var}(X)=\frac{3}{20}$$
:::

:::warn
$(\mathbb E[X])^2 = 9/4$, не $9/2$.
:::
`,
  },
  {
    id: 'pt-2-5',
    group,
    nav: 'Задача 5',
    title: 'Гамма $\\Gamma(2,1)$',
    kicker: 'Вариант 2 · блок 2',
    body: String.raw`
## Условие

$X \sim \Gamma(2,1)$: плотность $f(x) = x e^{-x}$, $x > 0$. Найти $\mathbb P(X < 2)$.

:::idea
$F(x) = 1 - e^{-x}(1+x)$ для $\Gamma(2,1)$. Это интеграл по частям от $x e^{-x}$.
:::

:::solution
$$\mathbb P(X < 2) = \int_0^2 x e^{-x}\,dx.$$

По частям ($u=x$, $dv=e^{-x}dx$):

$$\int_0^2 x e^{-x}\,dx = \left[-x e^{-x}\right]_0^2 + \int_0^2 e^{-x}\,dx = -2e^{-2} + \left[-e^{-x}\right]_0^2 = 1 - 3e^{-2}.$$
:::

:::answer
$$1-3e^{-2}$$
:::

:::note
$\mathbb E[X]=2$, $\operatorname{Var}(X)=2$ для $\Gamma(2,1)$ — запасные числа, если спросят моменты вместо вероятности.
:::
`,
  },
  {
    id: 'pt-2-6',
    group,
    nav: 'Задача 6',
    title: 'Плотность $Y = |X|$',
    kicker: 'Вариант 2 · блок 3',
    body: String.raw`
## Условие

$f_X(x) = \dfrac14$, $x \in [-2,2]$. Найти плотность $Y = |X|$ на $[0,2]$.

:::idea
$|X|$ складывает вклад от $x=y$ и $x=-y$. При постоянной $f_X$ на симметричном отрезке $f_Y(y) = 2f_X(y)$.
:::

:::solution
Для $y \in (0,2)$: $Y=y$ при $X=y$ и $X=-y$,

$$f_Y(y) = f_X(y) + f_X(-y) = \frac14 + \frac14 = \frac12.$$

В нуле $\mathbb P(Y=0)=\mathbb P(X=0)=0$. Проверка: $\displaystyle\int_0^2 \frac12\,dy = 1$.
:::

:::answer
$$f_Y(y)=\frac12,\quad y \in [0,2]$$
:::

:::warn
Носитель $Y$ — $[0,2]$, не $[-2,2]$.
:::
`,
  },
]