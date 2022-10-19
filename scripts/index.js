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
const editProfileButton = document.querySelector('.profile__edit-button')
const addPhotosButton = document.querySelector('.profile__add-button')

// Конфиг для класса FormValidator
const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn-submit',
	inactiveButtonClass: 'popup__btn-submit_inactive',
	inputErrorClass: 'popup__error-hint_active',
	errorClass: 'popup__input_invalid'
};

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
			if (element.target.classList === 'popup') {
				hidePopUp(popUpElement)
			}
		})
	})
}

// Объявление функции с добавлением слушателей
closePopUpOnClick()

// Функция закрытия попапа на Esc
function handleEscClose (event) {
	if (event.key === 'Escape') {
		const currentPopup = document.querySelector('.popup_opened')
		hidePopUp(currentPopup)
	}
}

// Функция вызова попапа редактирования профиля
function openEditProfilePopUp () {
	inputName.value = profileName.textContent
	inputBrief.value = profileBrief.textContent
	editProfilePopUp.formValidator.toggleButtonState()

	showPopUp(editProfilePopUp)
}

// Функция вызова попапа добавления фото
function openAddPhotosPopUp () {
	popUpPhotoTitle.value = ''
	popUpPhotoLink.value = ''
	addPhotosPopUp.formValidator.toggleButtonState()
	
	showPopUp(addPhotosPopUp)
}

// Слушатели события 'click' на кнопках редактирования профиля и добавления фото
editProfileButton.addEventListener('click', openEditProfilePopUp)
addPhotosButton.addEventListener('click', openAddPhotosPopUp)

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
	addCardtoDOM(photoTitle.value, photoLink.value, '.elements__element-template')
	hidePopUp(addPhotosPopUp)
})

// Функция вызова попапа
export function showPopUp(popup) {
	popup.classList.add('popup_opened')
	body.addEventListener('keydown', handleEscClose)
}

//Функция вызова класса FormValidator для каждой формы
const formList = Array.from(document.querySelectorAll(config.formSelector))
formList.forEach(function(formElement) {
	const newForm = new FormValidator(config, formElement);
	formElement.closest('.popup').formValidator = newForm;
	return newForm.enableValidation()
})

// Функция создания новой карточки из класса 'Card'
function renderCard(title, source, templateSelector) {
	
	const cardElement = new Card(title, source, templateSelector);
	return cardElement.createCard()
}

// Функция добавления карточки в DOM
function addCardtoDOM(title, source, templateSelector) {
	cardsContainer.prepend(renderCard(title, source, templateSelector))
}

// Функция для добавления дефолтных фотографий на сайт при загрузке
initialCards.defaultCardsArray.forEach(function(card) {
	addCardtoDOM(card.title, card.url, '.elements__element-template')
})