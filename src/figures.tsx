import type { ReactNode } from 'react'

function Frame({
  children,
  label,
  w = 360,
  h = 220,
}: {
  children: ReactNode
  label: string
  w?: number
  h?: number
}) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      <rect width={w} height={h} fill="#fffdf8" />
      {children}
    </svg>
  )
}

const ink = '#24382e'
const accent = '#9a3412'
const soft = '#d7ebe0'
const axis = '#8d8376'

function poly(points: Array<[number, number]>) {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function sample(
  fn: (x: number) => number,
  a: number,
  b: number,
  X: (x: number) => number,
  Y: (y: number) => number,
  n = 48,
) {
  const pts: Array<[number, number]> = []
  for (let i = 0; i <= n; i += 1) {
    const x = a + ((b - a) * i) / n
    const y = fn(x)
    if (Number.isFinite(y)) pts.push([X(x), Y(y)])
  }
  return poly(pts)
}

const figures: Record<string, { caption: string; node: React.ReactNode }> = {
  'v1-1': {
    caption: 'D между параболой y = x² и прямой y = 2x. Пересечение в x = 0 и x = 2.',
    node: (() => {
      const X = (x: number) => 48 + x * 78
      const Y = (y: number) => 188 - y * 32
      const band: Array<[number, number]> = []
      for (let i = 0; i <= 40; i += 1) {
        const x = (2 * i) / 40
        band.push([X(x), Y(x * x)])
      }
      for (let i = 40; i >= 0; i -= 1) {
        const x = (2 * i) / 40
        band.push([X(x), Y(2 * x)])
      }
      return (
        <Frame label="схема">
          <polygon points={poly(band)} fill={soft} />
          <line x1={40} y1={Y(0)} x2={250} y2={Y(0)} stroke={axis} />
          <line x1={X(0)} y1={20} x2={X(0)} y2={196} stroke={axis} />
          <polyline points={sample((x) => x * x, 0, 2.35, X, Y)} fill="none" stroke={ink} strokeWidth={2} />
          <polyline points={sample((x) => 2 * x, 0, 2.2, X, Y)} fill="none" stroke={accent} strokeWidth={2} />
          <text x={X(2.05)} y={Y(4) - 4} fill={ink} fontSize={13}>y = x²</text>
          <text x={X(1.15)} y={Y(2.7)} fill={accent} fontSize={13}>y = 2x</text>
          <text x={X(2) - 4} y={Y(0) + 16} fill={axis} fontSize={12}>2</text>
          <text x={X(0) + 6} y={16} fill={axis} fontSize={12}>y</text>
          <text x={240} y={Y(0) + 16} fill={axis} fontSize={12}>x</text>
        </Frame>
      )
    })(),
  },
  'v1-2': {
    caption: 'Круг x² + y² ≤ 9. Нечётные по x и по y слагаемые дают нуль.',
    node: (
      <Frame label="схема">
        <line x1={30} y1={110} x2={330} y2={110} stroke={axis} />
        <line x1={180} y1={16} x2={180} y2={204} stroke={axis} />
        <circle cx={180} cy={110} r={78} fill={soft} stroke={ink} strokeWidth={2} />
        <text x={250} y={104} fill={ink} fontSize={13}>R = 3</text>
        <text x={312} y={126} fill={axis} fontSize={12}>x</text>
        <text x={186} y={28} fill={axis} fontSize={12}>y</text>
      </Frame>
    ),
  },
  'v1-3': {
    caption: 'Парабола x = y²/4 − 1 слева, прямая x = 2 − y справа. Удобно интегрировать по y от −6 до 2.',
    node: (() => {
      const X = (x: number) => 36 + (x + 1.4) * 28
      const Y = (y: number) => 118 - y * 14
      const band: Array<[number, number]> = []
      for (let i = 0; i <= 40; i += 1) {
        const y = -6 + (8 * i) / 40
        band.push([X(y * y / 4 - 1), Y(y)])
      }
      for (let i = 40; i >= 0; i -= 1) {
        const y = -6 + (8 * i) / 40
        band.push([X(2 - y), Y(y)])
      }
      return (
        <Frame label="схема" h={240}>
          <polygon points={poly(band)} fill={soft} />
          <line x1={20} y1={Y(0)} x2={340} y2={Y(0)} stroke={axis} />
          <line x1={X(0)} y1={16} x2={X(0)} y2={224} stroke={axis} />
          <polyline
            points={(() => {
              const pts: Array<[number, number]> = []
              for (let i = 0; i <= 50; i += 1) {
                const y = -6.6 + (10.2 * i) / 50
                pts.push([X((y * y) / 4 - 1), Y(y)])
              }
              return poly(pts)
            })()}
            fill="none"
            stroke={ink}
            strokeWidth={2}
          />
          <line x1={X(2 - 3)} y1={Y(3)} x2={X(2 - -6.5)} y2={Y(-6.5)} stroke={accent} strokeWidth={2} />
          <circle cx={X(0)} cy={Y(2)} r={3.5} fill={accent} />
          <circle cx={X(8)} cy={Y(-6)} r={3.5} fill={accent} />
          <text x={X(0) + 10} y={Y(2) - 14} fill={accent} fontSize={12}>(0, 2)</text>
          <text x={X(8) - 62} y={Y(-6) - 8} fill={accent} fontSize={12}>(8, −6)</text>
          <text x={200} y={46} fill={ink} fontSize={13}>x = y²/4 − 1</text>
          <text x={12} y={46} fill={accent} fontSize={13}>x = 2 − y</text>
        </Frame>
      )
    })(),
  },
  'v1-4': {
    caption: 'Цилиндр x² + y² = 9, дно z = 1, крыша z = 11 − x − y. Над кругом крыша всюду выше дна.',
    node: (
      <Frame label="схема">
        <path d="M70 150 H250 Q270 150 270 130 V78 Q270 58 250 58 H70 Q50 58 50 78 V130 Q50 150 70 150 Z" fill={soft} stroke={ink} strokeWidth={2} />
        <ellipse cx={160} cy={78} rx={110} ry={22} fill="#fffdf8" stroke={ink} strokeWidth={2} />
        <path d="M58 92 H262" stroke={accent} strokeWidth={2} />
        <path d="M62 70 L250 48" stroke={accent} strokeWidth={2} />
        <text x={268} y={96} fill={accent} fontSize={12}>z = 1</text>
        <text x={200} y={42} fill={accent} fontSize={12}>z = 11 − x − y</text>
        <text x={120} y={180} fill={ink} fontSize={12}>цилиндр радиуса 3</text>
      </Frame>
    ),
  },
  'v1-6a': {
    caption: 'Область между y = x² и y = √x на [0, 1]. Нижний путь — парабола, верхний — корень.',
    node: (() => {
      const X = (x: number) => 46 + x * 250
      const Y = (y: number) => 190 - y * 160
      const band: Array<[number, number]> = []
      for (let i = 0; i <= 40; i += 1) band.push([X(i / 40), Y((i / 40) ** 2)])
      for (let i = 40; i >= 0; i -= 1) band.push([X(i / 40), Y(Math.sqrt(i / 40))])
      return (
        <Frame label="схема">
          <polygon points={poly(band)} fill={soft} />
          <line x1={40} y1={Y(0)} x2={330} y2={Y(0)} stroke={axis} />
          <line x1={X(0)} y1={16} x2={X(0)} y2={200} stroke={axis} />
          <polyline points={sample((x) => x * x, 0, 1.05, X, Y)} fill="none" stroke={ink} strokeWidth={2} />
          <polyline points={sample((x) => Math.sqrt(x), 0, 1.05, X, Y)} fill="none" stroke={accent} strokeWidth={2} />
          <text x={X(0.55)} y={Y(0.22)} fill={ink} fontSize={13}>y = x²</text>
          <text x={X(0.18)} y={Y(0.82)} fill={accent} fontSize={13}>y = √x</text>
          <text x={X(1) - 4} y={Y(0) + 16} fill={axis} fontSize={12}>1</text>
        </Frame>
      )
    })(),
  },
  'v2-2': {
    caption: 'Верхняя полусфера внутри цилиндра x² + y² = r² — это сферическая шапка высоты h = R − √(R² − r²).',
    node: (
      <Frame label="схема">
        <path d="M40 150 A140 140 0 0 1 320 150" fill={soft} stroke={ink} strokeWidth={2} />
        <line x1={40} y1={150} x2={320} y2={150} stroke={axis} />
        <path d="M98 150 V78 M262 150 V78" stroke={accent} strokeWidth={2} />
        <path d="M98 78 H262" stroke={accent} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={168} y={40} fill={ink} fontSize={13}>сфера R</text>
        <text x={150} y={174} fill={accent} fontSize={12}>цилиндр r</text>
        <text x={300} y={146} fill={axis} fontSize={12}>h</text>
        <line x1={300} y1={78} x2={300} y2={150} stroke={axis} />
      </Frame>
    ),
  },
  'v2-3': {
    caption: 'Треугольник в первом октанте: x ≥ 0, y ≥ 0, x + y ≤ 1, z = 1 − x − y.',
    node: (() => {
      const X = (x: number) => 50 + x * 240
      const Y = (y: number) => 190 - y * 150
      return (
        <Frame label="схема">
          <polygon points={`${X(0)},${Y(0)} ${X(1)},${Y(0)} ${X(0)},${Y(1)}`} fill={soft} stroke={ink} strokeWidth={2} />
          <line x1={36} y1={Y(0)} x2={330} y2={Y(0)} stroke={axis} />
          <line x1={X(0)} y1={16} x2={X(0)} y2={204} stroke={axis} />
          <text x={X(0.42)} y={Y(0.28)} fill={ink} fontSize={13}>D</text>
          <text x={X(1) + 6} y={Y(0) + 4} fill={axis} fontSize={12}>1</text>
          <text x={X(0) + 6} y={Y(1)} fill={axis} fontSize={12}>1</text>
          <text x={200} y={28} fill={accent} fontSize={13}>x + y + z = 1</text>
        </Frame>
      )
    })(),
  },
  'v2-6': {
    caption: 'Конус z = √(x² + y²) до z = 3. Нижняя сторона: нормаль смотрит вниз, у неё отрицательная компонента k.',
    node: (
      <Frame label="схема">
        <polygon points="180,36 70,176 290,176" fill={soft} stroke={ink} strokeWidth={2} />
        <ellipse cx={180} cy={176} rx={110} ry={16} fill="#fffdf8" stroke={ink} strokeWidth={2} />
        <line x1={180} y1={100} x2={120} y2={150} stroke={accent} strokeWidth={2} />
        <polygon points="120,150 132,142 128,158" fill={accent} />
        <text x={18} y={126} fill={accent} fontSize={12}>нижняя сторона</text>
        <text x={196} y={28} fill={ink} fontSize={13}>z = 3</text>
        <text x={188} y={196} fill={axis} fontSize={12}>z = 0</text>
      </Frame>
    ),
  },
  'v3-2': {
    caption: 'Цилиндр x² + z² = 1, 0 ≤ y ≤ 2. На нём x² + z² = 1, поэтому плотность равна 1.',
    node: (
      <Frame label="схема">
        <ellipse cx={90} cy={110} rx={28} ry={70} fill={soft} stroke={ink} strokeWidth={2} />
        <ellipse cx={250} cy={110} rx={28} ry={70} fill="#fffdf8" stroke={ink} strokeWidth={2} />
        <line x1={90} y1={40} x2={250} y2={40} stroke={ink} strokeWidth={2} />
        <line x1={90} y1={180} x2={250} y2={180} stroke={ink} strokeWidth={2} />
        <text x={140} y={28} fill={ink} fontSize={13}>y от 0 до 2</text>
        <text x={70} y={204} fill={axis} fontSize={12}>радиус 1</text>
      </Frame>
    ),
  },
  'v3-3': {
    caption: 'Конус y = √(x² + z²) между y = 0 и y = 4. Проекция на Oxz — круг радиуса 4.',
    node: (
      <Frame label="схема">
        <polygon points="60,170 180,40 300,170" fill={soft} stroke={ink} strokeWidth={2} />
        <line x1={40} y1={170} x2={330} y2={170} stroke={axis} />
        <line x1={180} y1={24} x2={180} y2={196} stroke={axis} />
        <text x={186} y={36} fill={ink} fontSize={13}>y = 4</text>
        <text x={188} y={188} fill={axis} fontSize={12}>y</text>
        <text x={40} y={160} fill={axis} fontSize={12}>Oxz</text>
      </Frame>
    ),
  },
  'v4-1': {
    caption: 'Одна арка циклоиды, t от 0 до 2π. Высота 2a, длина арки 8a — этой длиной удобно проверить |r′|.',
    node: (() => {
      const a = 1
      const pts: Array<[number, number]> = []
      for (let i = 0; i <= 80; i += 1) {
        const t = (2 * Math.PI * i) / 80
        const x = a * (t - Math.sin(t))
        const y = a * (1 - Math.cos(t))
        pts.push([36 + x * 42, 180 - y * 52])
      }
      return (
        <Frame label="схема">
          <line x1={28} y1={180} x2={340} y2={180} stroke={axis} />
          <polyline points={poly(pts)} fill="none" stroke={ink} strokeWidth={2.2} />
          <text x={150} y={60} fill={ink} fontSize={13}>циклоида</text>
          <text x={300} y={174} fill={axis} fontSize={12}>2πa</text>
        </Frame>
      )
    })(),
  },
  'v4-3': {
    caption: 'Верхняя полусфера. Произведение плотности и dσ сокращается до R dx dy.',
    node: (
      <Frame label="схема">
        <path d="M50 150 A130 130 0 0 1 310 150 Z" fill={soft} stroke={ink} strokeWidth={2} />
        <line x1={40} y1={150} x2={320} y2={150} stroke={axis} />
        <line x1={180} y1={150} x2={180} y2={20} stroke={accent} strokeWidth={1.6} strokeDasharray="4 3" />
        <text x={186} y={36} fill={accent} fontSize={13}>z = √(R² − x² − y²)</text>
        <text x={292} y={146} fill={axis} fontSize={12}>R</text>
      </Frame>
    ),
  },
  'demo-1': {
    caption: 'Окружность ρ = 2 cos φ: центр (1, 0), радиус 1. Угол φ от −π/2 до π/2.',
    node: (
      <Frame label="схема">
        <line x1={40} y1={110} x2={330} y2={110} stroke={axis} />
        <line x1={70} y1={20} x2={70} y2={200} stroke={axis} />
        <circle cx={150} cy={110} r={80} fill={soft} stroke={ink} strokeWidth={2} />
        <circle cx={70} cy={110} r={3.5} fill={accent} />
        <circle cx={230} cy={110} r={3.5} fill={accent} />
        <text x={74} y={128} fill={axis} fontSize={12}>O</text>
        <text x={210} y={128} fill={ink} fontSize={13}>(2, 0)</text>
        <text x={148} y={104} fill={accent} fontSize={12}>центр (1, 0)</text>
      </Frame>
    ),
  },
  'demo-2': {
    caption: 'Треугольник на осях и прямой 3x + 2y = 6. На оси Oy плотность равна нулю.',
    node: (
      <Frame label="схема">
        <line x1={40} y1={180} x2={330} y2={180} stroke={axis} />
        <line x1={70} y1={20} x2={70} y2={200} stroke={axis} />
        <polygon points="70,180 210,180 70,40" fill={soft} stroke={ink} strokeWidth={2} />
        <text x={200} y={198} fill={ink} fontSize={12}>(2, 0)</text>
        <text x={76} y={36} fill={ink} fontSize={12}>(0, 3)</text>
        <text x={108} y={150} fill={accent} fontSize={13}>δ = x</text>
        <text x={124} y={108} fill={ink} fontSize={12}>3x + 2y = 6</text>
      </Frame>
    ),
  },
  'demo-4': {
    caption: 'Проекция конуса на Oxz — круг x² + (z − 1)² = 1, вырезанный цилиндром.',
    node: (
      <Frame label="схема">
        <line x1={40} y1={120} x2={330} y2={120} stroke={axis} />
        <line x1={80} y1={20} x2={80} y2={200} stroke={axis} />
        <circle cx={180} cy={120} r={70} fill={soft} stroke={ink} strokeWidth={2} />
        <circle cx={110} cy={120} r={3} fill={accent} />
        <text x={86} y={138} fill={accent} fontSize={12}>O</text>
        <text x={168} y={116} fill={ink} fontSize={13}>центр (0, 1)</text>
        <text x={40} y={24} fill={axis} fontSize={12}>z</text>
        <text x={308} y={114} fill={axis} fontSize={12}>x</text>
      </Frame>
    ),
  },
  'demo-7': {
    caption: 'Треугольник O(0, 0), A(2, 0), B(4, 2). Положительный обход против часовой стрелки.',
    node: (
      <Frame label="схема">
        <line x1={36} y1={180} x2={340} y2={180} stroke={axis} />
        <line x1={60} y1={20} x2={60} y2={200} stroke={axis} />
        <polygon points="60,180 180,180 300,60" fill={soft} stroke={ink} strokeWidth={2} />
        <text x={64} y={198} fill={ink} fontSize={12}>O</text>
        <text x={168} y={198} fill={ink} fontSize={12}>A(2, 0)</text>
        <text x={304} y={56} fill={ink} fontSize={12}>B(4, 2)</text>
        <text x={150} y={140} fill={accent} fontSize={12}>y = x/2</text>
        <text x={200} y={168} fill={ink} fontSize={12}>y = x − 2</text>
      </Frame>
    ),
  },
  'demo-10': {
    caption: 'Верхняя сторона z = √(1 − x²) между плоскостями y = 0 и y = 1.',
    node: (
      <Frame label="схема">
        <path d="M50 160 A120 90 0 0 1 310 160" fill={soft} stroke={ink} strokeWidth={2} />
        <path d="M50 150 A120 90 0 0 1 310 150" fill="none" stroke={axis} strokeWidth={1.4} />
        <line x1={40} y1={170} x2={330} y2={170} stroke={axis} />
        <line x1={180} y1={70} x2={180} y2={30} stroke={accent} strokeWidth={1.6} />
        <polygon points="180,30 174,44 186,44" fill={accent} />
        <text x={188} y={40} fill={accent} fontSize={12}>верхняя</text>
        <text x={118} y={196} fill={ink} fontSize={13}>y от 0 до 1, x от −1 до 1</text>
      </Frame>
    ),
  },
  'v4-4': {
    caption: 'Правая полуокружность x² + y² = 2, x ≥ 0, от A(0, −√2) к B(0, √2). Форма y dx − x dy.',
    node: (
      <Frame label="схема">
        <line x1={40} y1={110} x2={330} y2={110} stroke={axis} />
        <line x1={120} y1={16} x2={120} y2={204} stroke={axis} />
        <path d="M120 40 A70 70 0 0 1 120 180" fill={soft} stroke={ink} strokeWidth={2} />
        <circle cx={120} cy={40} r={3.5} fill={accent} />
        <circle cx={120} cy={180} r={3.5} fill={accent} />
        <text x={128} y={36} fill={accent} fontSize={12}>B(0, √2)</text>
        <text x={128} y={196} fill={accent} fontSize={12}>A(0, −√2)</text>
        <text x={210} y={108} fill={ink} fontSize={13}>x ≥ 0</text>
      </Frame>
    ),
  },
  'v4-6': {
    caption: 'Плоскость x + z = 1 в первом октанте, 0 ≤ y ≤ 4. Внешняя нормаль смотрит от начала координат.',
    node: (
      <Frame label="схема">
        <polygon points="70,170 250,170 70,50" fill={soft} stroke={ink} strokeWidth={2} />
        <line x1={50} y1={170} x2={320} y2={170} stroke={axis} />
        <line x1={70} y1={190} x2={70} y2={30} stroke={axis} />
        <line x1={150} y1={110} x2={210} y2={70} stroke={accent} strokeWidth={2} />
        <polygon points="210,70 196,78 204,88" fill={accent} />
        <text x={214} y={66} fill={accent} fontSize={12}>внешняя</text>
        <text x={180} y={160} fill={ink} fontSize={13}>x + z = 1</text>
        <text x={40} y={24} fill={axis} fontSize={12}>z</text>
        <text x={300} y={186} fill={axis} fontSize={12}>x</text>
      </Frame>
    ),
  },
  'pt-density': {
    caption: 'Плотность f(x) на отрезке [a,b]: площадь под графиком равна 1; вероятность — площадь над [c,d].',
    node: (
      <Frame label="плотность" w={380} h={200}>
        <line x1={40} y1={160} x2={340} y2={160} stroke={axis} />
        <line x1={60} y1={180} x2={60} y2={30} stroke={axis} />
        <path
          d={sample((x) => 0.6 * Math.sin(Math.PI * x) + 0.45, 0, 1, (x) => 60 + x * 260, (y) => 160 - y * 120)}
          fill={soft}
          stroke={ink}
          strokeWidth={2}
        />
        <line x1={60} y1={160} x2={320} y2={160} stroke={ink} strokeWidth={1} />
        <text x={52} y={175} fill={axis} fontSize={11}>
          a
        </text>
        <text x={308} y={175} fill={axis} fontSize={11}>
          b
        </text>
        <text x={24} y={36} fill={axis} fontSize={11}>
          f
        </text>
      </Frame>
    ),
  },
  'pt-normal': {
    caption: 'Колокол нормального закона: центр μ, ширина связана с σ; P(a<X<b) — площадь под кривой на [a,b].',
    node: (
      <Frame label="нормальное" w={380} h={200}>
        <line x1={40} y1={155} x2={340} y2={155} stroke={axis} />
        <path
          d={sample((x) => Math.exp(-2.5 * x * x), -1.6, 1.6, (x) => 190 + x * 95, (y) => 155 - y * 95)}
          fill={soft}
          stroke={ink}
          strokeWidth={2}
        />
        <line x1={190} y1={155} x2={190} y2={62} stroke={accent} strokeDasharray="4 3" />
        <text x={184} y={172} fill={accent} fontSize={12}>
          μ
        </text>
      </Frame>
    ),
  },
  orient: {
    caption: 'Для графика z = z(x, y) вектор (−z_x, −z_y, 1) смотрит вверх. Нижняя сторона — противоположный вектор.',
    node: (
      <Frame label="схема">
        <path d="M40 150 Q180 40 320 150" fill="none" stroke={ink} strokeWidth={2} />
        <line x1={180} y1={108} x2={180} y2={42} stroke={accent} strokeWidth={2} />
        <polygon points="180,42 173,56 187,56" fill={accent} />
        <line x1={180} y1={108} x2={180} y2={176} stroke={ink} strokeWidth={2} />
        <polygon points="180,176 173,162 187,162" fill={ink} />
        <text x={190} y={56} fill={accent} fontSize={13}>верхняя</text>
        <text x={190} y={172} fill={ink} fontSize={13}>нижняя</text>
      </Frame>
    ),
  },
}

export function Figure({ name }: { name: string }) {
  const fig = figures[name]
  if (!fig) {
    return (
      <figure className="fig missing">
        <figcaption>Чертёж «{name}» не найден.</figcaption>
      </figure>
    )
  }
  return (
    <figure className="fig">
      {fig.node}
      <figcaption>{fig.caption}</figcaption>
    </figure>
  )
}
