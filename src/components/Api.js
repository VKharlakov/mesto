import { data } from "autoprefixer"

export default class Api {
    constructor(baseUrl, key){
        this._url = baseUrl;
        this._key = key
    }

    _returnResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Была допущена ошибка: ${res.status}`)
        }
    }

    //Получение данных о пользователе
    getUserInfo() {
        return fetch (`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._key
            }
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Изменение данных пользователя
    patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.brief
            })
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Изменение аватара пользователя
    editUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Получение списка изначальных фотографий
    getInitialCardSet() {
        return fetch (`${this._url}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._key
            }
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Отправка новой фотографии
    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Удаление фотографии
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key,
            },
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Добавление нового значения кнопки "Оценить"
    putLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }

    //Удаление нового значения кнопки "Оценить"
    deleteLike(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => this._returnResponse(res))
        .catch((err) => {
            console.log(err)
        })
    }
}