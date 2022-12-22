import { config, addPhotosPopup, editProfilePopup } from "../utils/constants.js"
import FormValidator from "./FormValidator.js"

export default class Popup {
    constructor(popupSelector){
        this._popup = popupSelector
    }

    open() {
        this._popup.classList.add('popup_opened')
        this.setEventListeners()

        const editProfileButtonValidator = new FormValidator(config, editProfilePopup)
        const addPhotoButtonValidator = new FormValidator(config, addPhotosPopup)

        editProfileButtonValidator.toggleButtonState()
        addPhotoButtonValidator.toggleButtonState()
    }

    close() {
        this._popup.classList.remove('popup_opened')
        this._removeEventListeners()
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    _handleOverlayClose = (event) => {
        if (event.target.classList.contains('popup_opened')) {
            this.close()
        }
    }

    _handleButtonClose = () => {
        this.close()
    }

    _removeEventListeners() {
        window.removeEventListener('keydown', this._handleEscClose)
        this._popup.querySelector('.popup__btn-close').removeEventListener('click', this._handleButtonClose)
        this._popup.removeEventListener('click', this._handleOverlayClose)
    }

    setEventListeners() {
        window.addEventListener('keydown', this._handleEscClose)
        this._popup.querySelector('.popup__btn-close').addEventListener('click', this._handleButtonClose)
        this._popup.addEventListener('click', this._handleOverlayClose)
    }
}