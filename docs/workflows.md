[issues]: https://github.com/ManushovRodion/foreign-language-assistant/issues
[issues_bug]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bug
[issues_suggestion]: https://github.com/ManushovRodion/foreign-language-assistant/labels/suggestion
[issues_question]: https://github.com/ManushovRodion/foreign-language-assistant/labels/question
[issues_todo]: https://github.com/ManushovRodion/foreign-language-assistant/labels/todo
[issues_duplicate]: https://github.com/ManushovRodion/foreign-language-assistant/labels/duplicate
[issues_hotfix]: https://github.com/ManushovRodion/foreign-language-assistant/labels/hotfix
[issues_bugfix]: https://github.com/ManushovRodion/foreign-language-assistant/labels/bugfix
[issues_rejected]: https://github.com/ManushovRodion/foreign-language-assistant/labels/rejected
[issues_accepted]: https://github.com/ManushovRodion/foreign-language-assistant/labels/accepted
[project]: https://github.com/users/ManushovRodion/projects/6
[template_bug_report]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=bug&template=bug_report.yml
[template_suggestion]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=bug&template=suggestion.yml
[template_question]: https://github.com/ManushovRodion/foreign-language-assistant/issues/new?assignees=&labels=bug&template=question.yml
[rules_git_commits]: https://www.conventionalcommits.org/en/v1.0.0/#summary

Рабочий процесс, который обьясняет как работать с issue проекта и с доской проекта Foreign Language Assistant от github

- issue: [issues][issues]
- issue type bug: [ошибки][issues_bug]
- issue type suggestion: [предложения][issues_suggestion]
- issue type question: [вопросы][issues_question]
- issue type question: [задачи][issues_todo]
- project: [Foreign Language Assistant][project]

### # Поступление issue: "ОШИБКИ"

> Данные топики прилетают как от пользователей, так и от авторов приложения.

- Ошибки заполняются через форму [Bug Report][template_bug_report].
- Для данных ошибок автоматом проставится тег [**bug**][issues_bug].

### # Поступление issue: "ОШИБКИ" в предрелизной версии

> Данные топики прилетают от авторов приложения, которые нашли ошибки в предрелизной версии.

- Ошибки заполняются через форму [Bug Report][template_bug_report].
- Для данных ошибок автоматом проставится тег [**bug**][issues_bug].
- В дополнении надо заменить тег [**bug**][issues_bug] на [**bugfix**][issues_bugfix]
- Справа в поле Projects выбираем проект [Foreign Language Assistant][project]
- Указываем у проекта статус **TODO**
- Ставим Priority **2**
- Milestone указываем тот, в каком релизе он пойдет

### # Поступление issue: "ПРЕДЛОЖЕНИЯ"

> В основном заполняется пользователями приложения, которые хотят предложить идею.

- Предложения по новому функционалу заполняются через форму [Suggestion][template_suggestion]
- Для данных предложений автоматом проставится тег [**suggestion**][issues_suggestion].

### # Поступление issue: "ВОПРОСЫ"

> Заполняется пользователями приложения, у которых есть вопросы.

- Вопросы заполняются через форму [Question][template_question].
- Для данных вопросов автоматом проставится тег [**question**][issues_question].

### # Поступление issue: "ЗАДАЧА"

> Данные топики создаются только авторами приложения.

1. Заходим на [форму создания топика](https://github.com/ManushovRodion/foreign-language-assistant/issues/new)
2. Справа в поле Labels выбираем метку [todo][issues_todo]
3. Справа в поле Projects выбираем проект [Foreign Language Assistant][project]
4. Копируем в форму макет, что ниже и заполняем пропуски.
5. Отправить
6. После отправки топик появится в [issues][issues_todo] и в проекте [Foreign Language Assistant][project]

=> Макет:

```
### # Название
[название ЗАДАЧА]

### # Описание
[очень краткое и понятное описание ЗАДАЧА, чтобы в пару предложений было понятно о чем фича и для чего она]

### # Скриншоты и Видео
[скриншоты или видео, которые демонстрирует идею. Если нету, то написать в данный блок: "No response"]

### # Постановка
[четкое и понятное описание того что требуется реализовать]

### # Логика
[здесь описываем саму логику, по которой должна работать постановка. Если нету, то написать в данный блок: "No response"]
```

=> Пример заполнения макета:

```
### # Название
Форма закрытия заявки.

### # Описание
Данная форма позволяет закрыть заявку оставив комментарий.

### # Скриншоты и Видео
- [кнопка](https://example.com/images/1)
- [форма](https://example.com/images/2)

### # Постановка
1. Необходимо реализовать в сайдбаре, в самом конце кнопку закрытия заявки с названием "Закрыть заявку". [кнопка](https://example.com/images/1)
2. После нажатия кнопки должна вызваться форма, которую надо заполнить. [форма](https://example.com/images/2)
3. После заполнения и отправки данных с формы мы должны получить новую заявку с новыми данными.

Элементы формы:

1. Поле: "комментарий", с валидацией:
    - Обязательность: да
    - Длина текста: 64 символа
    - Значение не заполнено
2. Кнопка: "отмена"
4. Кнопка: "закрыть"

### # Логика
1. Нажали на кнопку "Закрыть заявку"
2. Всплыло модульное окно с формой, где поля имеют дефолтное значение
3. При заполнение поля "комментарий" срабатывает валидация
4. При нажатие на кнопку "отмена" - просто закрываем форму
5. При нажатие на кнопку "закрыть" - отправляем [запрос](https://example.com/update) и запускаем loading на форме, до тех пор пока не получим ответ от сервера. После ответа обновляем данные по заявке через [запрос](https://example.com/get) и закрываем форму с loading
```

### # Порядок обработки поступлений issue

Обрабатываем поступления в порядке возрастания:

1. [Поступление issue: "ОШИБКИ"][issues_bug]
2. [Поступление issue: "ВОПРОСЫ"][issues_question]
3. [Поступление issue: "ЗАДАЧА"][issues_todo]
4. [Поступление issue: "ПРЕДЛОЖЕНИЯ"][issues_suggestion]

### # Обработка поступления issue "ОШИБКИ"

> Метка: [**bug**][issues_bug]

Прежде чем отдавать в работу - надо понять: критическая ошибка или нет и ошибка ли это.

1. Если был создан похожий или такой же топик, то:
   1. Мы даем ссылку на ошибку и говорим, что ошибка создана ранее и обьясняем статус.
   2. Если это все же дубль то: добавляем метку [duplicate][issues_duplicate]
   3. Закрываем топик с пометкой: "Закрыто по причине дубля"
2. Если это не ошибка, и кейс обработан с пользователем, то: закрываем топик с меткой [rejected][issues_rejected]
3. Если это критическая ошибка, то:
   1. Сообщаем что это исправится как можно скорее.
   2. Выбираем проект [Foreign Language Assistant][project]
   3. Указываем у проекта статус **TODO**
   4. Ставим Priority **1**
   5. Ставим метку [hotfix][issues_hotfix]
4. Если это обычная ошибка, то:
   1. Сообщаем что это исправится в ближайшем релизе.
   2. Выбираем проект [Foreign Language Assistant][project]
   3. Указываем у проекта статус **TODO**
   4. Milestone указываем тот, в каком релизе он пойдет
   5. Ставим Priority **2**

### # Обработка поступления issue "ВОПРОСЫ"

> Метка: [**question**][issues_question]

Задачи не создаются на базе вопросов. По мере ответа на вопрос - топик закрывается. Кол-во вопрсоов решается за счет вики по проекту.

### # Обработка поступления issue "ЗАДАЧА"

> Метка: [**todo**][issues_todo]

Если фича не актуальна, то:

1. Ставим метку [**rejected**][issues_rejected]
2. Причина отказа
3. Закрывается топик

Если фича принята, то:

1. Ставим метку [**accepted**][issues_accepted]
2. Указываем у проекта статус **TODO**
3. Milestone указываем тот, в каком релизе он пойдет
4. Ставим Priority от **3** до **5**

Касаемо приоритетов. Существует приоритет от 1 до 5:

- Приоритет **1**: Мега важно, чем ошибки по проекту + критические ошибки
- Приоритет **2**: Ошибки
- Приоритет **3**: Важно
- Приоритет **4**: Не очень важно
- Приоритет **5**: Когда сделаем, тогда сделаем

### # Обработка поступления issue "ПРЕДЛОЖЕНИЯ"

> Метка: [**suggestion**][issues_suggestion]

Обсуждается с автором топика его идею и если она реально нужна и реализуема, то:

1. Составляется на базе нее **поступление issue: "ЗАДАЧА"**.
2. Ставится метка для текущего топика [**accepted**][issues_accepted]
3. Ставится ссылка на **поступление issue: "ЗАДАЧА"**
4. Закрывается топик

Если идея не подходит, то:

1. Ставим метку [**rejected**][issues_rejected]
2. Причина отказа
3. Закрывается топик

### # Разработка задач

Разработка происходит в менеджере проектов от gihub, впроекте: [Foreign Language Assistant][project] и с методологией git flow + git-flow-avh + [правила коммитов][rules_git_commits].

Определяем место поиска задачи и его приеритет:

1. Если есть задачи в статусе **REJECT** - берем их в первую очередь
2. Далее задачи идут в разработку со статуса **TODO**
   1. Смотрим на Milestone, чем младьше версия - тем важнее
   2. Смотрим на Priority, чем младьше версия - тем важнее

Описание веток

- master(main): ветка с текущем продуктом; обновляется посредством **hotfix/[ID_ISSUE]** и **release/[MAJOR.MINOR.PATCH]**;
- develop: ветка разработки; содержит последний актуальный код с **hotfix/[ID_ISSUE]**, **release/[MAJOR.MINOR.PATCH]** и **feature/[ID_ISSUE]**
- hotfix/[ID_ISSUE]: создается от ветки **master**; После тестирования заливается в **master** и **develop**
- feature/[ID_ISSUE]: создается от ветки **develop**; Выступает в качестве создания различных задач; После тестирования заливается в **develop**
- bugfix/[ID_ISSUE]: создается от ветки **release/[MAJOR.MINOR.PATCH]**; Служит исправление проблем, найденных во время тестирования релиза; После тестирования заливается в **release/[MAJOR.MINOR.PATCH]**
- release/[MAJOR.MINOR.PATCH]: содержит обьем задач для релиза; фиксится проблемы в нем с помощью **bugfix/[ID_ISSUE]**; После тестирования заливается в ветки **master** и **develop**

При МР удялются ветки:

- hotfix/[ID_ISSUE]
- feature/[ID_ISSUE]
- bugfix/[ID_ISSUE]
- release/[MAJOR.MINOR.PATCH]

Cтатусы по разработке

- **REJECT DEVELOPING**: Возвраты задач
- **TODO**: то что надо сделать
- **IN DEVELOPING**: в процессе разработки
- **READY DEVELOPING**: разработка завершена

Процесс разработки:

1. Когда берем задачу со статусом **REJECT** или **TODO**, то переводим ее в статус **IN DEVELOPING**
2. После разработки/доработки создаем MR(ветку смотрим из описания веток выше) и ставим статус **READY DEVELOPING**
   - В случае если нет проблем с код ревью или тестингом - задача пропадет из списка.
   - В случае проблем - задача будет иметь статус **REJECT**. В таком случае повторяем с пункта 1


### # Тестирование задач

Тестирование происходит на ветках **develop** и **release/[MAJOR.MINOR.PATCH]**

Cтатусы по тестирования:

- **TODO RELEASE**: задачи релиза
- **REJECT DEVELOPING**: возврат задачи на разработчика
- **TODO TEST**: то что надо протестировать
- **IN TESTING**: в процессе тестирования
- **READY TESTING**: задача протестирована и не имеет проблем

Порядок тестирования: 

1. Если есть задачи со статусом **TODO RELEASE** - берем их
2. Иначе задачи из списка **TODO TEST**
   - Смотрим на Milestone, чем младьше версия - тем важнее
   - Смотрим на Priority, чем младьше версия - тем важнее

Процесс тестирования:

1. Берем задачу из стутса **TODO TEST** или из списка **TODO RELEASE** , исходя из приоритета.
2. Меняем ей статус на **IN TESTING**
3. Определяем ее дальнейший статус:
   - Если нет проблем, то задаем ей статус **READY TESTING**
   - Если найдена проблема, то возвращаем разработчику со статусом **REJECT DEVELOPING**. В случае если задача взята из статуса **TODO RELEASE**, то надо создать новую задачу **# Поступление issue: "ОШИБКИ" в предрелизной версии**

### # Для тех кто занимается код ревью и принимает MR

Задачи для код ревью можно найти в списке МР на ветку **develop**. Их порядок можно определить датой последнего обновления.

- Если по МR нет вопрсов, то MR принимается и задаче задается статус **TODO TEST**
- В случае, если к задаче есть вопросы, то ставится задаче статус **REJECT DEVELOPING**

### # Организаторам релиза

Когда выполнены все задачи из списка Milestone, организуется релиз.

1. Из Milestone определяется версия приложения (MAJOR.MINOR.PATCH).
2. Создается ветка release/[MAJOR.MINOR.PATCH] от ветки **develop**
3. Создается/заполняется CHANGELOG.md по макету ниже
4. На каждую задачу создается метка версии приложения **v[MAJOR.MINOR.PATCH]**
5. Задачи переносятся из статуса **READY TESTING** в статус **TODO RELEASE**

```
### # v[MAJOR.MINOR.PATCH]/[YYYY-MM-DD]

=> feats:
1. [ID_ISSUE]: [TITLE_ISSUE]
2. ....

=> fixs:
1. [ID_ISSUE]: [TITLE_ISSUE]
2. ....

=> other:
1. [ID_ISSUE]: [TITLE_ISSUE]
2. ....
```

когда все задачи готовы к релизу

1. После тестирования релиза задачи переводятся в статус **DONE**
2. Ветка release/[MAJOR.MINOR.PATCH] льется в **master** и **develop**
3. Ветки задач удаляются и ветка релиза удаляется.

