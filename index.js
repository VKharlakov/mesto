let popUpForm = document.querySelector('.edit-form')
let closeButton = document.querySelector('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')

function popUp() {
	if (popUpForm.classList.contains('edit-form_opened') === false) {
		inputName.value = profileName.innerHTML
		inputBrief.value = profileBrief.innerHTML
		popUpForm.classList.add('edit-form_opened')
	}
	else {
		popUpForm.classList.remove('edit-form_opened')
	}
}

editButton.addEventListener('click', popUp)
closeButton.addEventListener('click', popUp)

let profileName = document.querySelector('.profile__name')
let profileBrief = document.querySelector('.profile__brief')
let inputName = document.querySelector('.edit-form__input_type_name')
let inputBrief = document.querySelector('.edit-form__input_type_brief')
let submitButton = document.querySelector('.edit-form__submit-button')

inputName.value = 'Жак-Ив Кусто'
inputBrief.value = 'Исследователь океана'

function submitForm(evt) {
	profileName.innerHTML = inputName.value
	profileBrief.innerHTML = inputBrief.value 
	popUp()
}

let inputBox = document.querySelectorAll('.edit-form__input')

inputBox.forEach(inputBox => {
	inputBox.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submitButton.click();
    }
})
})

submitButton.addEventListener('click', submitForm)