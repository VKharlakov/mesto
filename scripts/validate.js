//Функция скрытия непройденной проверки валидности
function hideError (inputElement, formElement, validationSettings) {
	inputElement.classList.remove(validationSettings.errorClass)

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.remove(validationSettings.inputErrorClass)
	inputError.textContent = ''
}

//Функция показа непройденной проверки валидности
function showError (inputElement, formElement, validationSettings, errorMessage) {
	inputElement.classList.add(validationSettings.errorClass)

	const inputError = formElement.querySelector(`#${inputElement.id}-error`)
	inputError.classList.add(validationSettings.inputErrorClass)
	inputError.textContent = errorMessage
}

//Проверка полей ввода на валидность
function checkInputValidity (inputElement, formElement, validationSettings) {
	if (!inputElement.validity.valid) {
		showError(inputElement, formElement, validationSettings, inputElement.validationMessage)
	} else {
		hideError(inputElement, formElement, validationSettings)
	}
}

//Функция изменения стилей кнопки в зависимости от валидности полей
function toggleButtonState (inputList, formElement, buttonElement, validationSettings) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationSettings.inactiveButtonClass)
		buttonElement.setAttribute('disabled', 'true')
	} else {
		buttonElement.classList.remove(validationSettings.inactiveButtonClass)
		buttonElement.removeAttribute('disabled', 'true')
	}
}

//Установка слушателей на поля ввода, вызов функции проверки полей ввода на валидность, проверка состояния кнопки сабмита
function setInputValidListener (inputList, formElement, buttonElement, validationSettings) {
	inputList.forEach(function(inputElement) {
		inputElement.addEventListener('input', function(event) {
			checkInputValidity(inputElement, formElement, validationSettings)

			toggleButtonState(inputList, formElement, buttonElement, validationSettings)
		})
	})
}

//Проверка на наличие невалидного инпута
function hasInvalidInput (inputList) {
	return inputList.some(function(inputElement) {
		return !inputElement.validity.valid
	})
}

//Функция включения валидации всех форм
function enableValidation (validationSettings) {
	const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
	formList.forEach(function(formElement) {
		formElement.addEventListener('submit', function(event) {
			event.preventDefault()
		})
		const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
		const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)
		setInputValidListener(inputList, formElement, buttonElement, validationSettings)

		const showButton = document.querySelector(`#btn-show-${formElement.id}`)
		showButton.addEventListener('click', function() {
			const functionName = `open${showButton.name}PopUp`
			window[functionName](inputList, formElement, buttonElement, validationSettings);
		})
	})
}