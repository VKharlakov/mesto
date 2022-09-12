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
const popUpPhotoTitle = document.querySelector('.popup__input_type_photo-title')
const popUpPhotoLink = document.querySelector('.popup__input_type_photo-link')
const fullscreenImage = document.querySelector('.popup__image-fullscreen')
const fullscreenImageSubtitle = document.querySelector('.popup__image-subtitle')

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
	popUpPhotoTitle.value = ''
	popUpPhotoLink.value = ''

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



const formList = Array.from(document.querySelectorAll('.popup__form'))

//Установка слушателей на поля ввода и вызов функции проверки полей ввода на валидность
function setInputValidListener (formElement) {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

	toggleButtonState(inputList, formElement)

	inputList.forEach(function(inputElement) {
		inputElement.addEventListener('input', function(event) {
			checkInputValidity(inputElement, formElement)

			toggleButtonState(inputList, formElement)
		})
	})
}

//Установка слушателей на формы попапа
function setFormValidListener () {
	formList.forEach(function(formElement) {
		formElement.addEventListener('submit', function(event) {
			event.preventDefault()
		})
		setInputValidListener(formElement)
	})
}

//Функция скрытия непройденной проверки валидности
function hideError (inputElement, formElement) {
	inputElement.classList.remove('popup__input_invalid')

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.remove('popup__error-hint_active')
	inputError.textContent = ''
}

//Функция показа непройденной проверки валидности
function showError (inputElement, formElement, errorMessage) {
	inputElement.classList.add('popup__input_invalid')

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.add('popup__error-hint_active')
	inputError.textContent = errorMessage
}

//Проверка полей ввода на валидность
function checkInputValidity (inputElement, formElement) {
	if (!inputElement.validity.valid) {
		showError(inputElement, formElement, inputElement.validationMessage)
	} else {
		hideError(inputElement, formElement)
	}
}

function toggleButtonState (inputList, formElement) {
	const buttonElement = formElement.querySelector('.popup__btn-submit')

	if (hasValidInput(inputList)) {
		buttonElement.classList.add('popup__btn-submit_inactive')
		buttonElement.setAttribute('disabled', 'true')
		console.log('inactive')
	} else {
		buttonElement.classList.remove('popup__btn-submit_inactive')
		buttonElement.removeAttribute('disabled', 'true')
		console.log('active')
	}
}

function hasValidInput (inputList) {
	return inputList.some(function(inputElement) {
		return !inputElement.validity.valid
	})

}

const popUpList = Array.from(document.querySelectorAll('.popup'))

//Вешаю слушатели на весь попап
popUpList.forEach(function(popUpElement) {
	popUpElement.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') {
		console.log('working')
		}
	})
})

//Функция закрытия попапа на Esc
// function handleEscClose (event) {
// 	if (event.key === 'Escape') {
// 		console.log('working')
// 	}
// }

//Функция закрытия попапа на клик
// function closePopUpOnClick () {
	

// 	popUpList.forEach(function(popUpElement){
// 		popUpElement.addEventListener('click', function() {
// 			popUpElement.classList.remove('popup_opened')
// 		})
// 	})
// }

// closePopUpOnClick()
setFormValidListener()