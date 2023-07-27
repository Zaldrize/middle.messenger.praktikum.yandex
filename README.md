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
