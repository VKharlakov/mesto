import './index.css'

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

import {
	config,
	editProfilePopup,
	addPhotosPopup,
	fullscreenPhoto,
	cardsContainer,
	inputName,
	inputBrief,
	profileBrief,
	profileName,
	editProfileButton,
	addPhotosButton,

	deleteConfirmationPopup,
	editProfileAvatarPopup,
	profileAvatar,
	apiConfig,
	editProfileAvatarButton
} from '../utils/constants.js';

const userInfo = new UserInfo(profileName, profileBrief, profileAvatar)

//Создание экземпляров проверок валидации на формы
const editProfileForm = new FormValidator(config, editProfilePopup)
const addPhotosForm = new FormValidator(config, addPhotosPopup)
const editAvatarForm = new FormValidator(config, editProfileAvatarPopup)

//Создание экземпляра Api
const {baseUrl, key} = apiConfig
const api = new Api(baseUrl, key)

let userID = null

//Получение данных с сервера о изначальных фотографиях
//и данных пользователя
Promise.all([api.getUserInfo(), api.getInitialCardSet()])
.then(([userData, initialCards]) => {
	userID = userData._id
	renderCard.render(initialCards)
	userInfo.setUserInfo(userData)
})
.catch((err) => {
	console.log(err)
})

//Добавление карточек с фотографиями на страницу
const renderCard = new Section({
	renderer: (data) => {
		renderCard.addItem(generateCard(data))
	}
}, cardsContainer)

//Создание экземпляра добавления фотографии
const generateAddPhotosPopup = new PopupWithForm({
	popupSelector: addPhotosPopup,
	handleFormSubmit: (data) => {
		generateAddPhotosPopup.changeBtnOnLoad(true)
		api.postNewCard(data)
		.then((data) => {
			renderCard.addItem(generateCard(data))
		})
		.then(() => {
			generateAddPhotosPopup.close()
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			generateAddPhotosPopup.changeBtnOnLoad(false)
		})
	}
})

//Создание экземпляра редактирования профиля
const generateEditProfilePopup = new PopupWithForm({
	popupSelector: editProfilePopup,
	handleFormSubmit: (data) => {
		generateEditProfilePopup.changeBtnOnLoad(true)
		api.patchUserInfo(data)
		.then((res) => {
			userInfo.setUserInfo(res)
		})
		.then(() => {
			generateEditProfilePopup.close()
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			generateEditProfilePopup.changeBtnOnLoad(false)
		})
	}
})

//Создание экземпляра редактирования аватара профиля
const generateEditProfileAvatarPopup = new PopupWithForm({
	popupSelector: editProfileAvatarPopup,
	handleFormSubmit: (data) => {
		generateEditProfileAvatarPopup.changeBtnOnLoad(true)
		api.editUserAvatar(data)
		.then((res) => {
			userInfo.editAvatar(res.avatar)
		})
		.then(() => {
			generateEditProfileAvatarPopup.close()
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			generateEditProfileAvatarPopup.changeBtnOnLoad(false)
		})
	}
})

//Полноэкранный попап с фотографией
const popupWithImage = new PopupWithImage(fullscreenPhoto)

//Попап подтверждения удаления фотографии
const confirmationPopup = new PopupWithForm({
	popupSelector: deleteConfirmationPopup,
})

//Генерация карточки с фотографией
const generateCard = (item) => {
	const newPhoto = new Card({
		data: item,
		handleCardClick: (title, source) => {
			popupWithImage.open(title, source)
		},
		user: userID,
		deleteCardClick: () => {
			confirmationPopup.handleFormSubmit = () => {
				api.deleteCard(item._id)
				.then(() =>  {
				newPhoto.deleteCard()
				})
				.then(() => {
					confirmationPopup.close()
				})
				.catch((err) => {
					console.log(err)
				})
			}
			confirmationPopup.open()
		},
		putLike: () => {
			api.putLike(newPhoto.data)
			.then((res) => {
				newPhoto.putLike(res)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteLike: () => {
			api.deleteLike(newPhoto.data)
			.then((res) => {
				newPhoto.deleteLike(res)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}, '.elements__element-template')

	return newPhoto.createCard()
}

editProfileForm.enableValidation()
addPhotosForm.enableValidation()
editAvatarForm.enableValidation()

editProfileButton.addEventListener('click', () => {
	const {name, brief} = userInfo.getUserInfo()
	inputName.value = name
	inputBrief.value = brief
	editProfileForm.resetValidation()
	generateEditProfilePopup.open()
}) 

editProfileAvatarButton.addEventListener('click', () => {
	editAvatarForm.resetValidation()
	generateEditProfileAvatarPopup.open()
})

addPhotosButton.addEventListener('click', () => {
	addPhotosForm.resetValidation()
	generateAddPhotosPopup.open()
})