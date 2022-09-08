// Массив с дефолтными фотографиями для заполнения пустой страницы
const defaultCardsArray = [
	{
	'url': './images/elements/nnovgorod-6.jpg',
	'title': 'Нижний Новгород'
	},
	{
	'url': './images/elements/bogolyobovo-5.jpg',
	'title': 'Боголюбово'
	},
	{
	'url': './images/elements/borodino-4.jpg',
	'title': 'Бородино'
	},
	{
	'url': './images/elements/dubrovitsy-3.jpg',
	'title': 'Дубровицы'
	},
	{
	'url': './images/elements/tula-2.jpg',
	'title': 'Тула'
	},
	{
	'url': './images/elements/moscow-1.jpg',
	'title': 'Москва'
	}
]

//Функция для добавления дефолтных фотографий на сайт при загрузке
defaultCardsArray.forEach(function(card) {
	renderCard(card.url, card.title)
})