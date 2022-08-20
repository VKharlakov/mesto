let popUpForm = document.querySelector('.edit-form')
let closeButton = document.querySelector('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__name')
let profileBrief = document.querySelector('.profile__brief')
let inputName = document.querySelector('.edit-form__input_type_name')
let inputBrief = document.querySelector('.edit-form__input_type_brief')

function showPopUp() {
	inputName.value = profileName.textContent
	inputBrief.value = profileBrief.textContent
	popUpForm.classList.add('edit-form_opened')
}

function hidePopUp() {
	popUpForm.classList.remove('edit-form_opened')
}

function submitForm(evt) {
	event.preventDefault();
	profileName.textContent = inputName.value
	profileBrief.textContent = inputBrief.value 
	hidePopUp()
}

editButton.addEventListener('click', showPopUp)
closeButton.addEventListener('click', hidePopUp)
popUpForm.addEventListener('submit', submitForm)