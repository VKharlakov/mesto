//Импорт фотографий для defaultCardsArray
	const nnovgorodImg = new URL('../images/elements/nnovgorod-6.jpg', import.meta.url)  
	const bogolyobovoImg = new URL('../images/elements/bogolyobovo-5.jpg', import.meta.url)  
	const borodinoImg = new URL('../images/elements/borodino-4.jpg', import.meta.url)  
	const dubrovitsyImg = new URL('../images/elements/dubrovitsy-3.jpg', import.meta.url)  
	const tulaImg = new URL('../images/elements/tula-2.jpg', import.meta.url)  
	const moscowImg = new URL('../images/elements/moscow-1.jpg', import.meta.url)  

// Конфиг для класса FormValidator
export const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__btn-submit',
	inactiveButtonClass: 'popup__btn-submit_inactive',
	inputErrorClass: 'popup__error-hint_active',
	errorClass: 'popup__input_invalid'
};

export const profileName = document.querySelector('.profile__name')
export const profileBrief = document.querySelector('.profile__brief')
export const inputName = document.querySelector('.popup__input_type_name')
export const inputBrief = document.querySelector('.popup__input_type_brief')
export const cardsContainer = document.querySelector('.elements__list')
export const addPhotosPopup = document.querySelector('.popup_type_add-photos')
export const editProfilePopup = document.querySelector('.popup_type_edit-profile')
export const photoLink = document.querySelector('.popup__input_type_photo-link')
export const photoTitle = document.querySelector('.popup__input_type_photo-title')
export const editProfileButton = document.querySelector('.profile__edit-button')
export const addPhotosButton = document.querySelector('.profile__add-button')
export const fullscreenPhoto = document.querySelector('#fullscreen-photos')

export const deleteConfirmationPopup = document.querySelector('.popup_type_delete-confirmation')
export const editProfileAvatarPopup = document.querySelector('.popup_type_edit-profile-avatar')
export const profileAvatar = document.querySelector('.profile__avatar')
export const deletePhotoBtn = document.querySelector('.elements__delete-button')
export const editProfileAvatarButton = document.querySelector('.profile__edit-avatar-button')
  
export const apiConfig = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
	key: 'd568102e-76f6-4f9a-a85b-ebd98d4aaf86'
  }

// export const defaultCardsArray = [
// 	{
// 	'name': 'Нижний Новгород',
// 	'brief': nnovgorodImg,
// 	},
// 	{
// 	'name': 'Боголюбово',
// 	'brief': bogolyobovoImg,
// 	},
// 	{
// 	'name': 'Бородино',
// 	'brief': borodinoImg
// 	},
// 	{
// 	'name': 'Дубровицы',
// 	'brief': dubrovitsyImg,
// 	},
// 	{
// 	'name': 'Тула',
// 	'brief': tulaImg,
// 	},
// 	{
// 	'name': 'Москва',
// 	'brief': moscowImg,
// 	}
// ]