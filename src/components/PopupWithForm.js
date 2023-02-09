import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputValues = {}
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._btnSubmit = this._form.querySelector('.popup__btn-submit')
    }

    _getInputValues = () => {
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = `${input.value}`
        })

        return this._inputValues
    }

    changeBtnOnLoad(isLoading) {
        if (isLoading) {
            this._btnSubmit.textContent = 'Идет сохранение...'
        } else {
            this._btnSubmit.textContent = 'Сохранить'
        }
    }

    _submitForm = (event) => {
        event.preventDefault()
        this._handleFormSubmit(this._getInputValues())
        this.close()
    }

    close() {
        super.close()
        this._form.reset()
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this._form.removeEventListener('submit', this._submitForm);
    }
}