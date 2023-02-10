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
		this._likeButton.classList.add('elements__like-button_active');
		this._likeCount.textContent = this._likesCount(data)
	}

	deleteLike = (data) => {
		this._likeButton.classList.remove('elements__like-button_active');
		this._likeCount.textContent = this._likesCount(data)
	}

	//Метод, устанавливающий слушатели на карточки
	_setEventListeners = () => { 		
		//Слушатель кнопки "Удалить"
		this._deleteButton.addEventListener('click', () => {
			this._deleteCardClick()
		})

		//Слушатель кнопки "Оценить"
		this._likeButton.addEventListener('click', (event) => {
			if (this._likeButton.classList.contains('elements__like-button_active')) {
				this._deleteLike()
			} else {
				this._putLike()
			}
			event.stopPropagation()
		})

		//Слушатель открытия фото в полноэкранном режиме
		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._title, this._source)}
		)
	}

	_isOwner() {
		if (this._owner === this._user) {
			this._deleteButton.classList.remove('elements__delete-button_hidden')
		}
	}

	_isLiked() {
		this.data.likes.forEach((owner) => {
			if(owner._id === this._user) {
				this._likeButton.classList.add('elements__like-button_active');
			}
		})
	}

	//Метод, который записывает в верстку данные
	createCard() {		
		this._element = this._getTemplate();
		this._deleteButton = this._element.querySelector('.elements__delete-button');
		this._likeButton = this._element.querySelector('.elements__like-button');
		this._likeCount = this._element.querySelector('.elements__like-count');
		this._cardImage = this._element.querySelector('.elements__photo');

		this._cardImage.src = this._source;
		this._cardImage.alt = `На фото: ${this._title}`;

		this._likeCount.textContent = this._likes.length
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