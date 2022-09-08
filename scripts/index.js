const popUpList = document.querySelectorAll('.popup')
const popUpFormList = document.querySelectorAll('.popup__form')
const closeButtonList = document.querySelectorAll('.popup__btn-close')
const editButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileBrief = document.querySelector('.profile__brief')
const inputName = document.querySelector('.popup__input_type_name')
const inputBrief = document.querySelector('.popup__input_type_brief')
const addButton = document.querySelector('.profile__add-button')
const photoElementList = document.querySelectorAll('.elements__element')
const photoUploadedName = document.querySelector('.elements__title')
const photoUploadedLink = document.querySelector('.elements__photo')
const cardsContainer = document.querySelector('.elements__list')
const cardTemplate = document.querySelector('.elements__element-template').content
const addPhotosPopUp = document.querySelector('.popup_type_add-photos')
const editProfilePopUp = document.querySelector('.popup_type_edit-profile')
const photoLink = document.querySelector('.popup__input_type_photo-link').value
const photoTitle = document.querySelector('.popup__input_type_photo-title').value

// Общая функция вызова попапа
function showPopUp(popup) {
	popup.classList.add('popup_opened')
}

// Функция вызова попапа редактирования профиля
function openEditProfilePopUp () {
	inputName.value = profileName.textContent
	inputBrief.value = profileBrief.textContent

	showPopUp(editProfilePopUp)
}

// Функция вызова попапа добавления фото
function openAddPhotosPopUp () {
	document.querySelector('.popup__input_type_photo-title').value = ''
	document.querySelector('.popup__input_type_photo-link').value = ''

	showPopUp(addPhotosPopUp)
}

// Функция закрытия попапа
function hidePopUp(popup) {
	popup.classList.remove('popup_opened')
}

// Функция сохранения и отправки формы
function submitForm(popup, event) {
	event.preventDefault();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Проверка ID формы, чтобы изменить имя и описание в профиле
	if (popup.id === 'edit-profile') {
		profileName.textContent = inputName.value
		profileBrief.textContent = inputBrief.value
		hidePopUp(popup)
	} else if (popup.id === 'add-photos') {
		addCard(document.querySelector('.popup__input_type_photo-link').value, document.querySelector('.popup__input_type_photo-title').value)
		hidePopUp(popup)
	} else {}
}

function submitEditProfileForm (event) {
	profileName.textContent = inputName.value
	profileBrief.textContent = inputBrief.value

	hidePopUp(editProfilePopUp)
}

function submitAddPhotosForm (event) {
	addCard(photoLink, photoTitle)

	hidePopUp(addPhotosPopUp)
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Слушатель события для вызова попапа редактирования имени и описания в профиле
editButton.addEventListener('click', function() {
	openEditProfilePopUp();
})

// Слушатель события для вызова попапа добавления фотографий
addButton.addEventListener('click', function() {
	openAddPhotosPopUp();
})

// Функция со слушателем для кнопки закрытия попапа
closeButtonList.forEach(function(button) {
	button.addEventListener('click', function(event) {
	hidePopUp(event.target.closest('div'))
})})

// Функция со слушателем для отправки формы
popUpFormList.forEach(function(popup) {
	popup.addEventListener('submit', function(event) {
	submitForm(event.target.closest('div').parentNode.closest('div'), event)
})})

// Функция добавления новой фотографии
function addCard(url, title) {
	const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true)

	cardsContainer.prepend(cardElement)

	cardElement.querySelector('.elements__photo').src = url
	cardElement.querySelector('.elements__photo').alt = `На фото: ${title}`
	cardElement.querySelector('.elements__title').textContent = title

// Заполнение пустого поля имени карточки
	if (title === '') {
		cardElement.querySelector('.elements__title').textContent = 'Без названия'
	}

// Слушатель события для открытия фотографии в полноэкранном режиме
	cardElement.addEventListener('click', function() {
		document.querySelector('.popup__image-fullscreen').src = event.target.closest('.elements__element').querySelector('img').src
		document.querySelector('.popup__image-subtitle').textContent = event.target.closest('.elements__element').querySelector('.elements__title').textContent
		showPopUp(popUpList[2])
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