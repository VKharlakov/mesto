class Card {
	constructor({data, handleCardClick}, templateSelector) {
		this._title = data.name;
		this._source = data.brief;
        this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick
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

	//Метод, устанавливающий слушатели на карточки
	_setEventListeners = () => { 		

		//Слушатель кнопки "Удалить"
		this._element.querySelector('.elements__delete-button').addEventListener('click', function(event) {
			event.target.closest('.elements__element').remove()
			event.stopPropagation()
		})

		//Слушатель кнопки "Оценить"
		this._element.querySelector('.elements__like-button').addEventListener('click', function(event) {
			event.target.classList.toggle('elements__like-button_active')
			event.stopPropagation()
		})

		//Слушатель открытия фото в полноэкранном режиме
		this._element.querySelector('.elements__photo').addEventListener('click', () => {
			this._handleCardClick(this._title, this._source)}
		)
	}

	//Метод, который записывает в верстку данные
	createCard() {		
		this._element = this._getTemplate();

		const elementPhoto = this._element.querySelector('.elements__photo');

		elementPhoto.src = this._source;
		elementPhoto.alt = `На фото: ${this._title}`;

		this._element.querySelector('.elements__title').textContent = this._title;

		this._setEventListeners(elementPhoto);
		
		return this._element;
	}
	
}

export default Card