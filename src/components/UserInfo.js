export default class UserInfo {
    constructor(name, brief) {
        this._name = name
        this._brief = brief
    }

    getUserInfo() {
        const userData = {}

        userData.name = this._name
        userData.brief = this._brief

        return userData
    }

    setUserInfo(data) {
        this._name.value = data.name
        this._brief.value = data.brief
    }
}