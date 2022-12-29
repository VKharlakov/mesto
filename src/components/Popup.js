export default class Popup {
    constructor(popupSelector){
        this._popup = popupSelector
        this._closeButton = this._popup.querySelector('.popup__btn-close')
    }

    open() {
        this._popup.classList.add('popup_opened')
        this.setEventListeners()
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
        this._closeButton.removeEventListener('click', this._handleButtonClose)
        this._popup.removeEventListener('click', this._handleOverlayClose)
    }

    setEventListeners() {
        window.addEventListener('keydown', this._handleEscClose)
        this._closeButton.addEventListener('click', this._handleButtonClose)
        this._popup.addEventListener('click', this._handleOverlayClose)
    }
}