import type { Page } from '../../types'

const group = 'Вариант 3'

export const probVariant3: Page[] = [
  {
    id: 'pt-3-1',
    group,
    nav: 'Задача 1',
    title: 'Кусочная плотность на $[0,2]$',
    kicker: 'Вариант 3 · блок 1',
    body: String.raw`
## Условие

$$f(x) = \begin{cases} c x, & 0 \le x \le 1, \\ c(2-x), & 1 < x \le 2, \end{cases}$$

Найти $c$.

:::idea
Нормировка — сумма двух интегралов. График — треугольник высоты $c$ с вершиной в $x=1$.
:::

:::solution
$$\int_0^1 x\,dx = \frac12, \qquad \int_1^2 (2-x)\,dx = \frac12.$$

$$\int_0^2 f(x)\,dx = c\left(\frac12 + \frac12\right) = c = 1.$$
:::

:::answer
$$c=1$$
:::

:::note
Гладкий аналог на том же отрезке — $c\,x(2-x)$, см. [вариант 1, задача 1](#pt-1-1).
:::
`,
  },
  {
    id: 'pt-3-2',
    group,
    nav: 'Задача 2',
    title: 'Стандартное распределение Коши',
    kicker: 'Вариант 3 · блок 2',
    body: String.raw`
## Условие

$X$ имеет плотность $f(x) = \dfrac{1}{\pi(1+x^2)}$. Найти $\mathbb P(X < 1)$.

:::idea
Стандартный Коши: $F(x)=\dfrac{1}{\pi}\arctan x + \dfrac12$.
:::

:::solution
$$\mathbb P(X < 1) = \frac{1}{\pi}\arctan 1 + \frac12 = \frac14 + \frac12 = \frac34.$$
:::

:::answer
$$\frac{3}{4}$$
:::

:::warn
У Коши нет конечного $\mathbb E[X]$ — не пишите «среднее $0$» как число; симметрия касается только вероятностей.
:::
`,
  },
  {
    id: 'pt-3-3',
    group,
    nav: 'Задача 3',
    title: 'Сдвиг $Y = X + a$',
    kicker: 'Вариант 3 · блок 3',
    body: String.raw`
## Условие

$X \sim U(0, b)$ с плотностью $1/b$. Найти плотность $Y = X + a$ ($a > 0$) и пределы носителя.

:::idea
Сдвиг не меняет форму: $f_Y(y) = f_X(y-a)$ на $[a, a+b]$.
:::

:::solution
$x = y - a$, $dx/dy = 1$.

$$f_Y(y) = \frac{1}{b}, \quad y \in [a, a+b].$$

$$\mathbb E[Y] = \mathbb E[X] + a = \frac{b}{2} + a.$$
:::

:::answer
$$f_Y(y)=\frac{1}{b},\quad y \in [a, a+b]$$
:::

:::note
Линейный масштаб $Y=aX+b$ с $a \ne 1$ дал бы множитель $1/|a|$ в плотности.
:::
`,
  },
  {
    id: 'pt-3-4',
    group,
    nav: 'Задача 4',
    title: '0,9-квантиль экспоненциального',
    kicker: 'Вариант 3 · блок 1',
    body: String.raw`
## Условие

$X \sim \mathrm{Exp}(\lambda)$. Выразить $x_{0.9}$, для которого $\mathbb P(X \le x_{0.9}) = 0{,}9$.

:::idea
$F(x) = 1 - e^{-\lambda x}$. Приравнять к $0{,}9$.
:::

:::solution
$$1 - e^{-\lambda x_{0.9}} = 0{,}9 \;\Rightarrow\; e^{-\lambda x_{0.9}} = 0{,}1,$$

$$x_{0.9} = -\frac{\ln 0{,}1}{\lambda} = \frac{\ln 10}{\lambda}.$$
:::

:::answer
$$x_{0{,}9}=\frac{\ln 10}{\lambda}$$
:::

:::note
Для $\lambda = 1$ получаем $x_{0.9} = \ln 10 \approx 2{,}303$.
:::
`,
  },
  {
    id: 'pt-3-5',
    group,
    nav: 'Задача 5',
    title: 'Найти $\\mu$ по вероятности',
    kicker: 'Вариант 3 · блок 2',
    body: String.raw`
## Условие

$X \sim \mathcal N(\mu, \sigma^2)$, $\sigma = 2$. Известно $\mathbb P(X > 10) = 0{,}16$ (как в таблице для хвоста). Найти $\mu$.

:::idea
$\mathbb P(X > 10) = 1 - \Phi\!\left(\dfrac{10-\mu}{2}\right) = 0{,}16$. Найдите $z$ из таблицы.
:::

:::solution
$$1 - \Phi\!\left(\frac{10-\mu}{2}\right) = 0{,}16 \;\Rightarrow\; \Phi\!\left(\frac{10-\mu}{2}\right) = 0{,}84.$$

Близкий квантиль: $z_{0.84} \approx 1{,}0$ (точнее $z \approx 0{,}994$). В учебных задачах часто $0{,}16$ в хвосте соответствует $z \approx 1$.

$$\frac{10-\mu}{2} \approx 1 \quad\Rightarrow\quad \mu \approx 8.$$

Если в вашей таблице $\Phi(1) \approx 0{,}8413$, то $\dfrac{10-\mu}{2} = 1$, $\mu = 8$.
:::

:::answer
$$\mu = 8 \quad (\sigma=2,\; \mathbb P(X>10)=1-\Phi(1))$$
:::

:::warn
Подставляйте $z$ из **вашей** таблицы; отсюда погрешность в сотых долях.
:::
`,
  },
  {
    id: 'pt-3-6',
    group,
    nav: 'Задача 6',
    title: 'Преобразование $Y = 1/X$',
    kicker: 'Вариант 3 · блок 3',
    body: String.raw`
## Условие

$X \sim U(0,1)$. Найти плотность $Y = 1/X$ (носитель $y > 1$).

:::idea
$x = 1/y$, $dx/dy = -1/y^2$, $|dx/dy| = 1/y^2$. Плотность $X$ равна $1$ на $(0,1)$.
:::

:::solution
$y = 1/x$, $x = 1/y$, $y > 1$.

$$f_Y(y) = f_X(1/y)\cdot\frac{1}{y^2} = \frac{1}{y^2}, \quad y > 1.$$

Проверка: $\displaystyle\int_1^\infty \frac{dy}{y^2} = 1$.
:::

:::answer
$$f_Y(y)=\frac{1}{y^2},\quad y > 1$$
:::

:::warn
Это тяжёлый хвост — у $Y$ конечно $\mathbb E[Y]$ (равно $\displaystyle\int_1^\infty y\cdot y^{-2}\,dy$), но $\mathbb E[Y^2]$ бесконечно.
:::
`,
  },
]