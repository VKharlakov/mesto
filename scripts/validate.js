//Проверка полей ввода на валидность
function checkInputValidity (inputElement, formElement, validationSettings) {
	if (!inputElement.validity.valid) {
		showError(inputElement, formElement, validationSettings, inputElement.validationMessage)
	} else {
		hideError(inputElement, formElement, validationSettings)
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