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
const photoLink = document.querySelector('.popup__input_type_photo-link')
const photoTitle = document.querySelector('.popup__input_type_photo-title')
const editProfileForm = document.querySelector('#edit-profile-form')
const addPhotosForm = document.querySelector('#add-photos-form')
const popUpFullscreen = document.querySelector('#fullscreen-photos')

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

// Слушатель события для вызова попапа редактирования профиля
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
	hidePopUp(event.target.closest('.popup'))
})})

//Слушатель события с функцией отправки формы редактирования профиля
editProfileForm.addEventListener('submit', function() {
	event.preventDefault()
	profileName.textContent = inputName.value
	profileBrief.textContent = inputBrief.value

	hidePopUp(editProfilePopUp)
})

//Слушатель события с функцией отправки формы добавления фото
addPhotosForm.addEventListener('submit', function() {
	event.preventDefault()
	renderCard(photoLink.value, photoTitle.value)
	hidePopUp(addPhotosPopUp)
})

// Функция создания новой карточки
function createCard(url, title) {
	const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true)
	const cardElementPhoto = cardElement.querySelector('.elements__photo')
	const cardElementTitle = cardElement.querySelector('.elements__title')

	cardElementPhoto.src = url
	cardElementPhoto.alt = `На фото: ${title}`
	cardElementTitle.textContent = title

// Заполнение пустого поля имени карточки
	if (title === '') {
		cardElementTitle.textContent = 'Без названия'
	}

// Слушатель события для открытия фотографии в полноэкранном режиме
	cardElementPhoto.addEventListener('click', function() {
		document.querySelector('.popup__image-fullscreen').src = cardElementPhoto.src
		document.querySelector('.popup__image-subtitle').textContent = cardElementTitle.textContent
		showPopUp(popUpFullscreen)
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
	return cardElement
}

//Функция добавления новой карточки
function renderCard (url, title) {
	cardsContainer.prepend(createCard(url, title))
}