import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputValues = {}
    }

    _getInputValues = () => {
        const inputs = this._form.querySelectorAll('.popup__input')
        inputs.forEach((input) => {
            this._inputValues[input.name] = `${input.value}`
        })

        return this._inputValues
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