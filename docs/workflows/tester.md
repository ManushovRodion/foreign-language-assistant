[project]: https://github.com/users/ManushovRodion/projects/6
[issues_type_bugfix]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bugfix
[issues_type_bug]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bug
[issues_by_team]: https://github.com/ManushovRodion/foreign-language-assistant/labels/team
[form_by_team_template_bug]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=team%2Cbug&template=team_bug_report.yml

# Инструкция по тестированию задач

Тестирование происходит на ветках **develop** и **release/[MAJOR.MINOR.PATCH]**.

Список задач находится в менеджере проектов от gihub, в проекте: [Foreign Language Assistant][project].

## # Cтатусы по тестирования:

- **TODO RELEASE**: задачи релиза
- **REJECT DEVELOPING**: возврат задачи на разработчика
- **TODO TEST**: то что надо протестировать
- **IN TESTING**: в процессе тестирования
- **READY TESTING**: задача протестирована и не имеет проблем

## # Порядок тестирования:

1. Если есть задачи со статусом **TODO RELEASE** - берем их
2. Иначе задачи из списка **TODO TEST**
   - Смотрим на Milestone, чем младьше версия - тем важнее
   - Смотрим на Priority, чем младьше версия - тем важнее

## # Процесс тестирования:

1. Берем задачу из стутса **TODO TEST** или из списка **TODO RELEASE** , исходя из приоритета.
2. Меняем ей статус на **IN TESTING**
3. Определяем ее дальнейший статус:
   - Если нет проблем, то задаем ей статус **READY TESTING**
   - Если найдена проблема, то возвращаем разработчику со статусом **REJECT DEVELOPING**. В случае если задача взята из статуса **TODO RELEASE**, то надо создать новую задачу Bugfix.

### Создание Bugfix

1. Задачи на ошибку мы создаем через форму [Team Bug Report][form_by_team_template_bug].
2. Для задач автоматом проставится тег [**team**][issues_by_team] и [**bug**][issues_type_bug].
3. В форме надо указать проект [Foreign Language Assistant][project]
4. Ставим метку [bugfix][issues_type_bugfix]
5. После создания:
   - Указываем статус **TODO**.
   - Ставим Priority **1**.

### # Меню

- [Поступление задач](./analyst.md)
- [Разработка задач](./developer.md)
- [Тестирование задач](./tester.md)
- [Релиз](./releaser.md)
