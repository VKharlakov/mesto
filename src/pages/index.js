import './index.css'

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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
} from '../utils/constants.js';

const userInfo = new UserInfo(profileName, profileBrief)

//Создание экземпляров проверок валидации на формы
const editProfileForm = new FormValidator(config, editProfilePopup)
const addPhotosForm = new FormValidator(config, addPhotosPopup)

//Добавление карточек с фотографиями на страницу
const renderCard = new Section({
	items: defaultCardsArray,
	renderer: (data) => {
		renderCard.addItem(generateCard(data))
	}
}, cardsContainer)

//Создание экземпляра добавления фотографии
const generateAddPhotosPopup = new PopupWithForm({
	popupSelector: addPhotosPopup,
	handleFormSubmit: (data) => {
		renderCard.addItem(generateCard(data))
	}
})

//Создание экземпляра редактирования профиля
const generateEditProfilePopup = new PopupWithForm({
	popupSelector: editProfilePopup,
	handleFormSubmit: (item) => {
		userInfo.setUserInfo(item)
	}
})

const popupWithImage = new PopupWithImage(fullscreenPhoto)

generateEditProfilePopup.setEventListeners()
popupWithImage.setEventListeners()

//Генерация карточки с фотографией
const generateCard = (item) => {
	const newPhoto = new Card({
		data: item,
		handleCardClick: (title, source) => {
			popupWithImage.open(title, source)
		}
	}, '.elements__element-template')

	return newPhoto.createCard()
}

editProfileForm.enableValidation()
addPhotosForm.enableValidation()
renderCard.render()

editProfileButton.addEventListener('click', () => {
	const {name, brief} = userInfo.getUserInfo()
	inputName.value = name
	inputBrief.value = brief
	editProfileForm.toggleButtonState()
	generateEditProfilePopup.open()
}) 

addPhotosButton.addEventListener('click', () => {
	addPhotosForm.toggleButtonState()
	generateAddPhotosPopup.open()
})