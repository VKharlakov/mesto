import FormValidator from './FormValidator.js';
import Card from './Card.js';
import * as initialCards from './initialCards.js';

const closeButtonList = document.querySelectorAll('.popup__btn-close')
const profileName = document.querySelector('.profile__name')
const profileBrief = document.querySelector('.profile__brief')
const inputName = document.querySelector('.popup__input_type_name')
const inputBrief = document.querySelector('.popup__input_type_brief')
const cardsContainer = document.querySelector('.elements__list')
const addPhotosPopUp = document.querySelector('.popup_type_add-photos')
const editProfilePopUp = document.querySelector('.popup_type_edit-profile')
const photoLink = document.querySelector('.popup__input_type_photo-link')
const photoTitle = document.querySelector('.popup__input_type_photo-title')
const editProfileForm = document.querySelector('#edit-profile-form')
const addPhotosForm = document.querySelector('#add-photos-form')
const popUpPhotoTitle = document.querySelector('.popup__input_type_photo-title')
const popUpPhotoLink = document.querySelector('.popup__input_type_photo-link')
const body = document.querySelector('.page')
const popUpList = Array.from(document.querySelectorAll('.popup'))

// Конфиг для класса FormValidator
const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn-submit',
	inactiveButtonClass: 'popup__btn-submit_inactive',
	inputErrorClass: 'popup__error-hint_active',
	errorClass: 'popup__input_invalid'
};

// Функция вызова попапа
export function showPopUp(popup) {
	popup.classList.add('popup_opened')
	body.addEventListener('keydown', handleEscClose)
}

// Функция закрытия попапа
function hidePopUp(popup) {
	popup.classList.remove('popup_opened')
	body.removeEventListener('keydown', handleEscClose)
}

// Функция с добавлением слушателей для 
// закрытия попапа на клик
function closePopUpOnClick () {
	popUpList.forEach(function(popUpElement){
		popUpElement.addEventListener('click', function(element) {
			if (element.target.id === 'edit-profile' || element.target.id === 'add-photos' || element.target.id === 'fullscreen-photos') {
				hidePopUp(popUpElement)
			}
		})
	})
}

// Объявление функции с добавлением слушателей
closePopUpOnClick()

//Функция закрытия попапа на Esc
function handleEscClose (event) {
	popUpList.forEach(function(popUpElement){
		if (event.key === 'Escape') {
		hidePopUp(popUpElement)
		}
	})
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

// Слушатели события 'click' на кнопках редактирования профиля и добавления фото
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopUp)
document.querySelector('.profile__add-button').addEventListener('click', openAddPhotosPopUp)

// Функция со слушателем для кнопки ("X") закрытия попапа
closeButtonList.forEach(function(button) {
	button.addEventListener('click', function(event) {
		hidePopUp(event.target.closest('.popup'))
	})
})

// Слушатель события с функцией отправки формы редактирования профиля
editProfileForm.addEventListener('submit', function(event) {
	event.preventDefault()
	profileName.textContent = inputName.value
	profileBrief.textContent = inputBrief.value

	hidePopUp(editProfilePopUp)
})

// Слушатель события с функцией отправки формы добавления фото
addPhotosForm.addEventListener('submit', function(event) {
	event.preventDefault()
	renderCard(photoTitle.value, photoLink.value)
	hidePopUp(addPhotosPopUp)
})

//Функция вызова класса FormValidator для каждой формы
const formList = Array.from(document.querySelectorAll(config.formSelector))
formList.forEach(function(formElement) {
	const newForm = new FormValidator(config, formElement);
	newForm.enableValidation()
})

//Функция добавления новой карточки
function renderCard(title, source) {
	
	const cardElement = new Card(title, source);
	
	cardsContainer.append(cardElement.createCard())
}

//Функция для добавления дефолтных фотографий на сайт при загрузке
initialCards.defaultCardsArray.forEach(function(card) {
	renderCard(card.title, card.url)
})