import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._fullscreenPhoto = this._popup.querySelector('.popup__image-fullscreen')
        this._subtitle = this._popup.querySelector('.popup__image-subtitle')
    }

    open(title, source) {
        this._fullscreenPhoto.alt = title
        this._fullscreenPhoto.src = source

        this._subtitle.textContent = title

        super.open()
    }
}