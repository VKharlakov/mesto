let popUp = document.querySelectorAll('.edit-form')
let popUpForm = document.querySelectorAll('.edit-form__inputs')
let closeButton = document.querySelectorAll('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__name')
let profileBrief = document.querySelector('.profile__brief')
let inputName = document.querySelector('.edit-form__input_type_name')
let inputBrief = document.querySelector('.edit-form__input_type_brief')
let addButton = document.querySelector('.profile__add-button')
let photoElement = document.querySelectorAll('.elements__element')
let likeButton = document.querySelectorAll('.elements__like-button')
let photoUploadedName = document.querySelector('.elements__title')
let photoUploadedLink = document.querySelector('.elements__photo')

function showPopUp(editForm) {
	if (editForm.id === 'edit-profile') {
		inputName.value = profileName.textContent
		inputBrief.value = profileBrief.textContent
	} else {}
	editForm.classList.add('edit-form_opened')
}

function hidePopUp(editForm) {
	editForm.classList.remove('edit-form_opened')
}

function submitForm(editForm, event) {
	event.preventDefault();
	if (editForm.id === 'edit-profile') {
		profileName.textContent = inputName.value
		profileBrief.textContent = inputBrief.value
	} else if (editForm.id === 'edit-photos') {
		photoUploadedName.textContent = document.querySelector('.edit-form__input_type_photo-title').value
		if (photoUploadedName.textContent === '') {
			photoUploadedName.textContent = "Без названия"
			} else {}
		photoUploadedLink.src = document.querySelector('.edit-form__input_type_photo-link').value
	} else {}
	hidePopUp(editForm)
}

photoElement.forEach(function(element) {
	let photoImg = document.querySelector('.edit-form__image-fullscreen')
	element.addEventListener('click', function(event) {
		let photoSubtitle = document.querySelector('.edit-form__image-subtitle')
		photoImg.src = event.target.closest('.elements__element').querySelector('img').src
		photoSubtitle.textContent = event.target.closest('.elements__element').querySelector('.elements__title').textContent
		showPopUp(popUp[2])
	})
})

likeButton.forEach(function(button) {
	button.addEventListener('click', function(event) {
		let likeButton = event.target.closest('button')
		likeButton.classList.toggle('elements__like-button_active')
		event.stopPropagation()
	})
})

editButton.addEventListener('click', function() {
	showPopUp(popUp[0]);
})
addButton.addEventListener('click', function() {
	showPopUp(popUp[1]);
})

closeButton.forEach(function(button) {
	button.addEventListener('click', function(event) {
	hidePopUp(event.target.closest('div'))
})})

popUpForm.forEach(function(editForm) {
	editForm.addEventListener('submit', function(event) {
	submitForm(event.target.closest('div').parentNode.closest('div'), event)
})})