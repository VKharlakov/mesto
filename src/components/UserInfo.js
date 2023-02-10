export default class UserInfo {
    constructor(userName, userBrief, avatar) {
        this._name = userName
        this._brief = userBrief
        this._avatar = avatar
    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            brief: this._brief.textContent
        }
        return userData
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._brief.textContent = data.about
        this._avatar.src = data.avatar

    }

    editAvatar(data){
        this._avatar.src = data.avatar
    }

    getId() {
        return {
            user: this.element.textContent
        }
    }
}