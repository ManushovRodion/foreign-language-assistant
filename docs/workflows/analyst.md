[issues_by_client]: https://github.com/ManushovRodion/foreign-language-assistant/labels/client
[issues_by_client__type_bug]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Aclient+label%3Abug
[issues_by_client__type_suggestion]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Aclient+label%3Asuggestion
[issues_by_client__type_question]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Aclient+label%3Aquestion
[issues_by_team]: https://github.com/ManushovRodion/foreign-language-assistant/labels/team
[issues_by_team__type_bug]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Ateam+label%3Abug
[issues_by_team__type_bugfix]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Ateam+label%3Abugfix
[issues_by_team__type_hotfix]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Ateam+label%3Ahotfix
[issues_by_team__type_todo]: https://github.com/ManushovRodion/app-help-translate/issues?q=is%3Aopen+label%3Ateam+label%3Atodo
[issues_type_question]: https://github.com/ManushovRodion/foreign-language-assistant/labels/question
[issues_type_bug]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bug
[issues_type_suggestion]: https://github.com/ManushovRodion/foreign-language-assistant/labels/suggestion
[issues_type_accepted]: https://github.com/ManushovRodion/foreign-language-assistant/labels/accepted
[issues_type_rejected]: https://github.com/ManushovRodion/foreign-language-assistant/labels/rejected
[issues_type_duplicate]: https://github.com/ManushovRodion/foreign-language-assistant/labels/duplicate
[issues_type_todo]: https://github.com/ManushovRodion/foreign-language-assistant/labels/todo
[issues_type_hotfix]: https://github.com/ManushovRodion/foreign-language-assistant/labels/hotfix
[issues_type_bugfix]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bugfix
[form_by_client_template_bug]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=client%2Cbug&template=client_bug_report.yml
[form_by_client_template_suggestion]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=client%2Csuggestion&template=client_suggestion.yml
[form_by_client_template_question]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=client%2Cquestion&template=client_question.yml
[form_by_team_template_bug]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=team%2Cbug&template=team_bug_report.yml
[form_by_team_template_todo]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=team%2Ctodo&template=team_todo.yml
[project]: https://github.com/users/ManushovRodion/projects/6

# Инструкция по поступлению задач

Есть два источника поступления задач: [наша команда][issues_by_team] и [пользователи][issues_by_client].

Просмотреть issues:

- [Список всех обращений, от пользователя][issues_by_client]
  - [Отчеты по ошибкам][issues_by_client__type_bug]
  - [Вопросы][issues_by_client__type_question]
  - [Предложения][issues_by_client__type_suggestion]
- [Список всех топиков от команды][issues_by_team]
  - [Отчеты по ошибкам][issues_by_team__type_bug]
  - [Hotfix][issues_by_team__type_hotfix]
  - [Bugfix][issues_by_team__type_bugfix]
  - [Задачи][issues_by_team__type_todo]

## # Отчеты об ошибках от пользователя

> Заполняется пользователями приложения, которые наткнулись на ошибки.

- Отчеты по ошибкам заполняются через форму [Client Bug Report][form_by_client_template_bug].
- Для данных ошибок автоматом проставится тег [**client**][issues_by_client] и [**bug**][issues_type_bug].
- Просмотреть можно:
  - [Список всех обращений][issues_by_client].
  - [Отчеты по ошибкам][issues_by_client__type_bug].

### Обработка

Прежде чем отдавать в работу - надо понять: критическая ошибка или нет, и ошибка ли это.

1. Если был создан похожий или такой же топик, то:
   1. Мы даем ссылку на ошибку и говорим, что ошибка создана ранее и обьясняем статус.
   2. Если это все же дубль то: добавляем метку [duplicate][issues_type_duplicate]
   3. Закрываем топик с пометкой: "Закрыто по причине дубля"
2. Если это не ошибка, и кейс обработан с пользователем, то: закрываем топик с меткой [rejected][issues_type_rejected]
3. Если это критическая ошибка, то:
   1. Сообщаем что это исправится как можно скорее.
   2. Ставится метка для текущего топика [**accepted**][issues_type_accepted] и [hotfix][issues_type_hotfix]
   3. Выбираем проект [Foreign Language Assistant][project].
   4. После создания:
      - Указываем статус **TODO**.
      - Ставим Priority **1**.
4. Если это обычная ошибка, то:
   1. Сообщаем что это исправится в ближайшем релизе.
   2. Ставится метка для текущего топика [**accepted**][issues_type_accepted].
   3. Выбираем проект [Foreign Language Assistant][project].
   4. После создания:
      - Ставим Priority **2**.

И главное: проверяем, чтобы заголовок ошибок пользователя начинался с "[Bug]: "

## # Вопросы от пользователя

> Заполняется пользователями приложения, у которых есть вопросы.

- Вопросы заполняются через форму [Client Question][form_by_client_template_question].
- Для данных вопросов автоматом проставится тег [**client**][issues_by_client] и [**question**][issues_type_question].
- Просмотреть можно:
  - [Список всех обращений][issues_by_client].
  - [Вопросы][issues_by_client__type_question].

### Обработка

Задачи не создаются на базе вопросов. По мере ответа на вопрос - топик закрывается. Кол-во вопросов решается за счет вики по проекту.

## # Предложения от пользователя

> Заполняется пользователями приложения, которые хотят предложить идею.

- Предложения заполняются через форму [Client Suggestion][form_by_client_template_suggestion].
- Для данных предложений автоматом проставится тег [**client**][issues_by_client] и [**suggestion**][issues_type_question].
- Просмотреть можно:
  - [Список всех обращений][issues_by_client].
  - [Предложения][issues_by_client__type_suggestion].

### Обработка

Обсуждается с автором топика его идею и если она реально нужна и реализуема, то:

1. Составляется на ее базе новую [задачу для разработки](#-Задачи-для-разработки).
2. Ставится метка для текущего топика [**accepted**][issues_type_accepted].
3. Ставится ссылка на ISSUE_ID созданной задачи.
4. Закрывается топик.

Если идея не подходит, то:

1. Ставим метку [**rejected**][issues_type_rejected].
2. Причина отказа.
3. Закрывается топик.

## # Задачи по типу ошибок, для разработки

> Данные топики создаются только командой приложения.
> Здесь мы создадим: не критическую ошибку; критическую ошибку, которую нашли сами; и создаем bugfix на случай найденой ошибки в предрелизной версии.

- Просмотреть можно:
  - [Список всех топиков от команды][issues_by_team].
  - [Отчеты по ошибкам][issues_by_team__type_bug].
  - [Hotfix][issues_by_team__type_hotfix].
  - [Bugfix][issues_by_team__type_bugfix].

### Создание

1. Задачи на ошибку мы создаем через форму [Team Bug Report][form_by_team_template_bug].
2. Для задач автоматом проставится тег [**team**][issues_by_team] и [**bug**][issues_type_bug].
3. В форме надо указать проект [Foreign Language Assistant][project]

Если мы сами нашли критическую ошибку, то:

1. Ставим метку [hotfix][issues_type_hotfix]
2. После создания:
   - Указываем статус **TODO**.
   - Ставим Priority **1**.

Если во время тестирования предрелиза(**release/[MAJOR.MINOR.PATCH]**) нашлась ошибка, то:

1. Ставим метку [bugfix][issues_type_bugfix]
2. После создания:
   - Указываем статус **TODO**.
   - Ставим Priority **1**.

Если это обычная ошибка, то:

1. После создания:
   - Ставим Priority **2**.

### Обработка

Обработка простых ошибок происходит посредством [формирования спринта](#-Формирование-спринта). Ошибки по типу hotfix и bugfix сразу попадают в спринт

## # Задачи для разработки

> Данные топики создаются только командой приложения.

- Просмотреть можно:
  - [Список всех топиков от команды][issues_by_team].
  - [Задачи][issues_by_team__type_todo].

### Создание

1. Задачи мы создаем через форму [Team Todo][form_by_team_template_todo].
2. Для задач автоматом проставится тег [**team**][issues_by_team] и [**todo**][issues_type_todo].
3. В форме надо указать проект [Foreign Language Assistant][project]
4. После создания:
   - Ставим Priority **4**.

### Обработка

Обработка задач происходит посредством [формирования спринта](#-Формирование-спринта)

## # Формирование спринта

1. Надо разобраться с приоритетами. Существует приоритет от 1 до 5:
   - Приоритет **1**: Мега важно, чем ошибки по проекту + критические ошибки + bugfix
   - Приоритет **2**: Ошибки
   - Приоритет **3**: Важно
   - Приоритет **4**: Не очень важно
   - Приоритет **5**: Когда сделаем, тогда сделаем
2. Собираем список задач из списка задач, которые не выполнились за предыдущий спринт + задачи нового спринта, если есть + задачи без статуса, которые надо выполнить в текущем спринте.
3. Просмотреть что из этого актуально:
   - Если задача актуальна, то ставим метку [**accepted**][issues_type_accepted] и Priority от **3** до **5**
   - Если задача не актуальна, то ставим метку [**rejected**][issues_rejected], пишем причину отказа и закрываем задачу.
4. Актуальные задачи закидываем в спринт(поле Milestone) и пока не важно что кол-во задач много, но без фанатизма
5. Обсуждаем следующий спринт с разработчиками - они должны подготовить время, по задачам.
6. Оставляем список задач, которые не привышают время спринта. Остальные переносим в другой спринт.
7. Всем задачам, следующего спринта, ставим статус **TODO**

Главное надо понимать, что задачи для спринта должны быть подготовлены до того, как стартанет спринт!

## # Меню

- [Поступление задач](./analyst.md)
- [Разработка задач](./developer.md)
- [Тестирование задач](./tester.md)
- [Релиз](./releaser.md)
