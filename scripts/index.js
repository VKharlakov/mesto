const closeButtonList = document.querySelectorAll('.popup__btn-close')
const profileName = document.querySelector('.profile__name')
const profileBrief = document.querySelector('.profile__brief')
const inputName = document.querySelector('.popup__input_type_name')
const inputBrief = document.querySelector('.popup__input_type_brief')
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
const popUpPhotoTitle = document.querySelector('.popup__input_type_photo-title')
const popUpPhotoLink = document.querySelector('.popup__input_type_photo-link')
const fullscreenImage = document.querySelector('.popup__image-fullscreen')
const fullscreenImageSubtitle = document.querySelector('.popup__image-subtitle')
const body = document.querySelector('.page')
const popUpList = Array.from(document.querySelectorAll('.popup'))

// Общая функция вызова попапа
function showPopUp(popup) {
	popup.classList.add('popup_opened')
	body.addEventListener('keydown', handleEscClose)
}

// Функция вызова попапа редактирования профиля
function openEditProfilePopUp (inputList, formElement, buttonElement, validationSettings) {
	inputName.value = profileName.textContent
	inputBrief.value = profileBrief.textContent

	inputList.forEach(function(inputElement) {
		hideError(inputElement, formElement, validationSettings)
	})

	toggleButtonState(inputList, formElement, buttonElement, validationSettings)

	showPopUp(editProfilePopUp)
}

// Функция вызова попапа добавления фото
function openAddPhotosPopUp (inputList, formElement, buttonElement, validationSettings) {
	popUpPhotoTitle.value = ''
	popUpPhotoLink.value = ''

	inputList.forEach(function(inputElement) {
		hideError(inputElement, formElement, validationSettings)
	})

	toggleButtonState(inputList, formElement, buttonElement, validationSettings)

	showPopUp(addPhotosPopUp)
}

// Функция закрытия попапа
function hidePopUp(popup) {
	popup.classList.remove('popup_opened')
	body.removeEventListener('keydown', handleEscClose)
}

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
		fullscreenImage.src = cardElementPhoto.src
		fullscreenImage.alt = `На фото: ${title}`
		fullscreenImageSubtitle.textContent = cardElementTitle.textContent
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

//Функция скрытия непройденной проверки валидности
function hideError (inputElement, formElement, validationSettings) {
	inputElement.classList.remove(validationSettings.errorClass)

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.remove(validationSettings.inputErrorClass)
	inputError.textContent = ''
}

//Функция показа непройденной проверки валидности
function showError (inputElement, formElement, validationSettings, errorMessage) {
	inputElement.classList.add(validationSettings.errorClass)

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.add(validationSettings.inputErrorClass)
	inputError.textContent = errorMessage
}

//Функция закрытия попапа на Esc
function handleEscClose (event) {
	popUpList.forEach(function(popUpElement){
		if (event.key === 'Escape') {
		hidePopUp(popUpElement)
		}
	})
}

//Функция закрытия попапа на клик
function closePopUpOnClick () {
	popUpList.forEach(function(popUpElement){
		popUpElement.addEventListener('click', function(element) {
			if (element.target.id === 'edit-profile' || element.target.id === 'add-photos' || element.target.id === 'fullscreen-photos') {
				popUpElement.classList.remove('popup_opened')
			}
		})
	})
}

//Функция изменения стилей кнопки в зависимости от валидности полей
function toggleButtonState (inputList, formElement, buttonElement, validationSettings) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationSettings.inactiveButtonClass)
		buttonElement.setAttribute('disabled', 'true')
	} else {
		buttonElement.classList.remove(validationSettings.inactiveButtonClass)
		buttonElement.removeAttribute('disabled', 'true')
	}
}

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn-submit',
	inactiveButtonClass: 'popup__btn-submit_inactive',
	inputErrorClass: 'popup__error-hint_active',
	errorClass: 'popup__input_invalid'
});

closePopUpOnClick()