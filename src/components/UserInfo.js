export default class UserInfo {
    constructor(name, brief) {
        this._name = name
        this._brief = brief
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
        this._brief.textContent = data.brief
    }
}