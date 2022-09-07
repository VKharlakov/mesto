const popUp = document.querySelectorAll('.edit-form')
const popUpForm = document.querySelectorAll('.edit-form__inputs')
const closeButton = document.querySelectorAll('.edit-form__close-button')
const editButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileBrief = document.querySelector('.profile__brief')
const inputName = document.querySelector('.edit-form__input_type_name')
const inputBrief = document.querySelector('.edit-form__input_type_brief')
const addButton = document.querySelector('.profile__add-button')
const photoElement = document.querySelectorAll('.elements__element')
const photoUploadedName = document.querySelector('.elements__title')
const photoUploadedLink = document.querySelector('.elements__photo')
const cardsList = document.querySelector('.elements__list')
const cardTemplate = document.querySelector('.elements__element-template').content

// Функция вызова попапа
function showPopUp(editForm) {
	if (editForm.id === 'edit-profile') {
		inputName.value = profileName.textContent
		inputBrief.value = profileBrief.textContent

//При вызове попапа добавления фотографий инпуты очищаются
	} else if (editForm.id === 'edit-photos') {
		document.querySelector('.edit-form__input_type_photo-title').value = ''
		document.querySelector('.edit-form__input_type_photo-link').value = ''
	} else {}

	editForm.classList.add('edit-form_opened')
}

// Функция закрытия попапа
function hidePopUp(editForm) {
	editForm.classList.remove('edit-form_opened')
}

// Функция сохранения и отправки формы
function submitForm(editForm, event) {
	event.preventDefault();

// Проверка ID формы, чтобы изменить имя и описание в профиле
	if (editForm.id === 'edit-profile') {
		profileName.textContent = inputName.value
		profileBrief.textContent = inputBrief.value
		hidePopUp(editForm)
	} else if (editForm.id === 'edit-photos') {
		addCard(document.querySelector('.edit-form__input_type_photo-link').value, document.querySelector('.edit-form__input_type_photo-title').value)
		hidePopUp(editForm)
	} else {}
}

// Слушатель события для вызова попапа редактирования имени и описания в профиле
editButton.addEventListener('click', function() {
	showPopUp(popUp[0]);
})

// Слушатель события для вызова попапа добавления фотографий
addButton.addEventListener('click', function() {
	showPopUp(popUp[1]);
})

// Функция со слушателем для кнопки закрытия попапа
closeButton.forEach(function(button) {
	button.addEventListener('click', function(event) {
	hidePopUp(event.target.closest('div'))
})})

// Функция со слушателем для отправки формы
popUpForm.forEach(function(editForm) {
	editForm.addEventListener('submit', function(event) {
	submitForm(event.target.closest('div').parentNode.closest('div'), event)
})})

// Функция добавления новой фотографии
function addCard(url, title) {
	const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true)

	cardsList.prepend(cardElement)

	cardElement.querySelector('.elements__photo').src = url
	cardElement.querySelector('.elements__title').textContent = title

// Заполнение пустого поля имени карточки
	if (title === '') {
		cardElement.querySelector('.elements__title').textContent = 'Без названия'
	}

// Слушатель события для открытия фотографии в полноэкранном режиме
	cardElement.addEventListener('click', function() {
		document.querySelector('.edit-form__image-fullscreen').src = event.target.closest('.elements__element').querySelector('img').src
		document.querySelector('.edit-form__image-subtitle').textContent = event.target.closest('.elements__element').querySelector('.elements__title').textContent
		showPopUp(popUp[2])
	})

//Слушатель события для кнопки "Удалить"
	cardElement.querySelector('.elements__delete-button').addEventListener('click', function() {
		event.target.closest('.elements__element').remove()
		event.stopPropagation()
	})

// Слушатель события для кнопки "Мне нравится"
	cardElement.querySelector('.elements__like-button').addEventListener('click', function() {
		event.target.classList.toggle('elements__like-button_active')
		event.stopPropagation()
	})
}

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
	addCard(card.url, card.title)
})