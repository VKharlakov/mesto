class Card {
	constructor({data, handleCardClick, user, putLike, deleteLike, deleteCardClick}, templateSelector) {
		this._title = data.name;
		this._source = data.link;
        this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		
		this.data = data
		this._id = data._id
		this._likes = data.likes
		this._owner = data.owner._id
		this._user = user
		this._putLike = putLike
		this._deleteLike = deleteLike
		this._deleteCardClick = deleteCardClick
	}

	//Метод, который берет из html верстку div'a карточки
	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.elements__element')
			.cloneNode(true);
		
		return cardElement;
	}

	_likesCount(data) {
		return data.likes.length
	}

	putLike = (data) => {
		this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
		this._element.querySelector('.elements__like-count').textContent = this._likesCount(data)
	}

	deleteLike = (data) => {
		this._element.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
		this._element.querySelector('.elements__like-count').textContent = this._likesCount(data)
	}

	//Метод, устанавливающий слушатели на карточки
	_setEventListeners = () => { 		

		//Слушатель кнопки "Удалить"
		this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
			this._deleteCardClick()
		})

		//Слушатель кнопки "Оценить"
		this._element.querySelector('.elements__like-button').addEventListener('click', (event) => {
			if (this._element.querySelector('.elements__like-button').classList.contains('elements__like-button_active')) {
				this._deleteLike()
			} else {
				this._putLike()
			}
			event.stopPropagation()
		})

		//Слушатель открытия фото в полноэкранном режиме
		this._element.querySelector('.elements__photo').addEventListener('click', () => {
			this._handleCardClick(this._title, this._source)}
		)
	}

	_isOwner() {
		if (this._owner === this._user) {
			this._element.querySelector('.elements__delete-button').classList.remove('elements__delete-button_hidden')
		}
	}

	_isLiked() {
		this.data.likes.forEach((owner) => {
			if(owner._id === this._user) {
				this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
			}
		})
	}

	//Метод, который записывает в верстку данные
	createCard() {		
		this._element = this._getTemplate();

		const elementPhoto = this._element.querySelector('.elements__photo');

		elementPhoto.src = this._source;
		elementPhoto.alt = `На фото: ${this._title}`;

		this._element.querySelector('.elements__like-count').textContent = this._likes.length
		this._element.querySelector('.elements__title').textContent = this._title;

		this._setEventListeners();
		this._isLiked()
		this._isOwner()
		
		return this._element;
	}

	deleteCard() {
		this._element.remove()
	}
	
}

export default Card