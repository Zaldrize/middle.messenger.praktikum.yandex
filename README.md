Домен в netlify:
https://whimsical-cupcake-5fe0c9.netlify.app
Ссылки на страницы:
	авторизация: https://whimsical-cupcake-5fe0c9.netlify.app/login
	регистрация: https://whimsical-cupcake-5fe0c9.netlify.app/register
	профиль: https://whimsical-cupcake-5fe0c9.netlify.app/profile
	ошибки: 
	 - https://whimsical-cupcake-5fe0c9.netlify.app/notfound - 404
	 - https://whimsical-cupcake-5fe0c9.netlify.app/serverError - 5XX
	чат: https://whimsical-cupcake-5fe0c9.netlify.app/chat


Cсылка на фигму: https://www.figma.com/file/apMUWL6vMGk8aAyyRWsI1W/PinkMessenger?type=design&node-id=17%3A2&mode=design&t=yAqbWkljSmKs1OeG-1
(Попробовала там цвета и общий вид кнопок и инпутов, остальное думала на бумаге, см. папку ui)

Сборка проекта - npm run build, запуск на 3000 порту - npm run start

СПРИНТ 2:
Добавила базовый класс block для компонента. Создала компоненты для текстового инпута, кнопки, ленты чатов и истории сообщений.
Страницы так же унаследованы от базового компонента. Добавила наследников для каждой страницы.
Перевела проект на typescript, добавила линтинг кода и стилей.

СПРИНТ 3:
Добавила роутинг.
Добавила функционал по работе с диалогами.
Добавила общение с api для авотризации, регистрации, смены данных, пароля и аватарки пользователя, выхода из системы.
Добавила функции создания чата, добавления пользователей в чат, удаления их оттуда.
Добавила передачу сообщений через web-socket.


СПРИНТ 4:
Добавила тесты для блока, роутера и фетча. Использованы библиотеки chai для ассертов, mocha, sinon для отслеживания вызова методов.
Обновила все зависимости (npm outdated, npm update)
Добавила pre-commit с помощью Husky (при коммите проверяются тесты и линтинг)
Была попытка добавить lint-staged, кажется, не сработало:(
