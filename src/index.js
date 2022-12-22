import './pages/index.css'

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

import {
	config,
	editProfilePopup,
	addPhotosPopup,
	photoLink,
	photoTitle,
	fullscreenPhoto,
	cardsContainer,
	// elementTemplate,
	inputName,
	inputBrief,
	profileBrief,
	profileName,
	defaultCardsArray,
	editProfileButton,
	addPhotosButton
} from './utils/constants.js';

//Создание экземпляров проверок валидации на формы
const editProfileForm = new FormValidator(config, editProfilePopup)
const addPhotosForm = new FormValidator(config, addPhotosPopup)

//Создание экземпляра добавления фотографии
const generateAddPhotosPopup = new PopupWithForm({
	popupSelector: addPhotosPopup,
	handleFormSubmit: () => {
		const user = new UserInfo(photoTitle.value, photoLink.value)
		const data = user.getUserInfo()
		const newPhoto = new Card({
			data: data,
			handleCardClick: (title, source) => {
				const popupWithImage = new PopupWithImage(fullscreenPhoto)
				popupWithImage.open(title, source)
			}
		}, '.elements__element-template')

		cardsContainer.prepend(newPhoto.createCard())
	}
})

//Создание экземпляра редактирования профиля
const generateEditProfilePopup = new PopupWithForm({
	popupSelector: editProfilePopup,
	handleFormSubmit: () => {
		const user = new UserInfo(inputName.value, inputBrief.value)
		const data = user.getUserInfo()
		
		profileName.textContent = data.name
		profileBrief.textContent = data.brief
	}
})

generateEditProfilePopup.setEventListeners()

const generateDefaultCards = new Section({
	items: defaultCardsArray,
	renderer: (data) => {
		const newPhoto = new Card({
			data,
			handleCardClick: (title, source) => {
				const popupWithImage = new PopupWithImage(fullscreenPhoto)
				popupWithImage.open(title, source)
			}
		}, '.elements__element-template')

		generateDefaultCards.addItem(newPhoto.createCard())
	}
}, cardsContainer)

editProfileForm.enableValidation()
addPhotosForm.enableValidation()
generateDefaultCards.render()

editProfileButton.addEventListener('click', () => {
	const profileInfo = new UserInfo(profileName.textContent, profileBrief.textContent)
	const userInfo = profileInfo.getUserInfo()
	inputName.value = userInfo.name
	inputBrief.value = userInfo.brief
	generateEditProfilePopup.open()
}) 

addPhotosButton.addEventListener('click', () => {
	generateAddPhotosPopup.open()
})