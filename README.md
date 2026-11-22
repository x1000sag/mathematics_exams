# Контрольная: криволинейные и поверхностные интегралы

Конспект к переписыванию образца. Внутри демо (десять задач), варианты 2–4 с подробными решениями, шпаргалка формул, алгоритмы по типам задач и разбор знака $dx\,dz$.

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

Сервер разработки поднимается на порту 4179. Сборка:

```bash
npm run build
npm run preview
```

## Как пользоваться

- Слева содержание. Поиск ищет и по тексту решений.
- «Режим тренировки» прячет решения и сводку ответов.
- «Лента» показывает весь конспект подряд.
- Галочка «разобрал» запоминается в браузере.
