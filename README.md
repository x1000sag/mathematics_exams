# Контрольные: интегралы и теория вероятностей

Одно приложение, два конспекта (переключатель **Интегралы / Теорвер** в боковой панели).

## Криволинейные и поверхностные интегралы

Демо (десять задач), варианты 2–4 с подробными решениями, шпаргалка формул, алгоритмы по типам задач и разбор знака $dx\,dz$.

## Теория вероятностей

Контрольный материал по трём блокам программы: абсолютно непрерывные СВ, стандартные распределения (равномерное, экспоненциальное, нормальное, гамма, Коши), преобразования случайных величин. Четыре варианта по шесть задач с полными решениями, шпаргалки и алгоритмы — уровень типовых задач раздела B.

Актуальная ветка: `main`, последний коммит с демо и правками по фото — `67e9242`.

## GitHub

Основная копия на GitHub: [github.com/x1000sag/mathematics_exams](https://github.com/x1000sag/mathematics_exams) (приватный).

### Первый раз залить историю (репозиторий на GitHub пустой)

В **WSL**, со своим SSH-ключом, привязанным к GitHub:

```bash
git clone https://origin.cursor.com/git/x1000sag/MA-exam-integral.git
cd MA-exam-integral
git remote add github git@github.com:x1000sag/mathematics_exams.git
git push -u github main
```

Через HTTPS, если пользуетесь `gh`:

```bash
gh auth login
git clone https://origin.cursor.com/git/x1000sag/MA-exam-integral.git
cd MA-exam-integral
git remote add github https://github.com/x1000sag/mathematics_exams.git
git push -u github main
```

### Клонировать уже с GitHub

```bash
git clone git@github.com:x1000sag/mathematics_exams.git
cd mathematics_exams
```

### Обновиться после правок

Если в рулёжке настроены оба `origin` (GitHub) и `cursor` (Origin):

```bash
git pull
```

Если клонирован только GitHub-репозиторий:

```bash
git pull origin main
```

Бэкап на Origin по-прежнему: `https://origin.cursor.com/git/x1000sag/MA-exam-integral.git`.

## Как открыть

```bash
npm install
npm run dev
```

Сервер разработки поднимается на порту 4179. Сборка (один самодостаточный HTML):

```bash
npm install
npm run build
```

Результат: **`dist/index.html`** (~3,5 МБ) — внутри JS, CSS, шрифты Source Sans/Serif, стили KaTeX и формулы; отдельные файлы не нужны. То же даёт `npm run build:single`. Файл можно открыть по `file://` на телефоне (скопировать в «Файлы» / Downloads и открыть в браузере) или раздавать как одну страницу с хостинга.

Локальная проверка через сервер (для `file://` сервер не обязателен):

```bash
npm run preview
```

### На телефоне без `npm run`

1. **Онлайн (удобнее всего).** После push в `main` GitHub Actions собирает сайт и выкладывает на **GitHub Pages** (см. ниже настройку репозитория). Откройте в браузере телефона URL Pages — одна ссылка, без установки Node.
2. **Один файл офлайн.** На странице последнего успешного workflow **Сборка и GitHub Pages** скачайте артефакт `kr-integraly-single` — там лежит тот же `index.html`. Сохраните на телефон и откройте в Chrome/Safari.
3. **Своя сборка.** Соберите на компьютере (`npm run build`) и перешлите себе `dist/index.html` (мессенджер, облако, AirDrop и т.п.).

### GitHub Pages (первый раз)

Для приватного репозитория Pages доступны на платных планах GitHub. В настройках репозитория `x1000sag/mathematics_exams`:

1. **Settings → Pages**
2. **Build and deployment → Source:** `GitHub Actions` (не «Deploy from a branch»).
3. После зелёного workflow на `main` адрес появится в **Settings → Pages** и в логе job `deploy` (переменная `page_url`).

Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — при каждом push в `main` пересобирает `dist/index.html` и публикует каталог `dist` (фактически одна страница).

## Как пользоваться

- Слева содержание и переключатель **Интегралы / Теорвер**. Поиск ищет и по тексту решений.
- «Режим тренировки» прячет решения и сводку ответов.
- «Лента» показывает весь конспект подряд.
- Галочка «разобрал» запоминается в браузере **отдельно для каждого конспекта**.
