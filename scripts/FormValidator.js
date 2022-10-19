class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
		this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
	}

	//Функция скрытия непройденной проверки валидности
	_hideError(inputElement) {
		inputElement.classList.remove(this._config.errorClass)

		const inputError = this._formElement.querySelector(`#${inputElement.id}-error`)
		inputError.classList.remove(this._config.inputErrorClass)
		inputError.textContent = ''
	}

	//Функция показа непройденной проверки валидности
	_showError(inputElement) {
		inputElement.classList.add(this._config.errorClass)

		const inputError = this._formElement.querySelector(`#${inputElement.id}-error`)
		inputError.classList.add(this._config.inputErrorClass)
		inputError.textContent = inputElement.validationMessage
	}

	//Проверка полей ввода на валидность
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showError(inputElement)
		} else {
			this._hideError(inputElement)
		}
	}

	//Проверка на наличие невалидного инпута
	_hasInvalidInput() {
		return this._inputList.some(function(inputElement){
			return !inputElement.validity.valid
		})
	}

	//Функция изменения стилей кнопки в зависимости от валидности полей
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._config.inactiveButtonClass)
			this._buttonElement.setAttribute('disabled', 'true')
		} else {
			this._buttonElement.classList.remove(this._config.inactiveButtonClass)
			this._buttonElement.removeAttribute('disabled', 'true')
		}
	}

	//Установка слушателей на поля ввода, вызов функции проверки полей ввода на валидность, проверка состояния кнопки сабмита
	_setInputValidListener() {
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement)
				this._toggleButtonState()
			})

			this._toggleButtonState()
		})
	}

	enableValidation() {
		this._setInputValidListener()
	}
}

export default FormValidator