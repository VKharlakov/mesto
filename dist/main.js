(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p:""};function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.d({},{_:()=>P});var n=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),this._buttonElement=this._formElement.querySelector(this._config.submitButtonSelector)}var n,o;return n=e,(o=[{key:"_hideError",value:function(e){e.classList.remove(this._config.errorClass);var t=this._formElement.querySelector("#".concat(e.id,"-error"));t.classList.remove(this._config.inputErrorClass),t.textContent=""}},{key:"_showError",value:function(e){e.classList.add(this._config.errorClass);var t=this._formElement.querySelector("#".concat(e.id,"-error"));t.classList.add(this._config.inputErrorClass),t.textContent=e.validationMessage}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._config.inactiveButtonClass),this._buttonElement.setAttribute("disabled","true")):(this._buttonElement.classList.remove(this._config.inactiveButtonClass),this._buttonElement.removeAttribute("disabled","true"))}},{key:"_setInputValidListener",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e.toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setInputValidListener()}}])&&t(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();const o=n;function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=document.querySelector("#fullscreen-photos"),l=i.querySelector(".popup__image-fullscreen"),u=i.querySelector(".popup__image-subtitle");const c=function(){function e(t,n,o){var r,c,a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c=function(){l.src=a._source,l.alt="На фото: ".concat(a._title),u.textContent=a._title,P(i)},(r="_handleOpenPopup")in this?Object.defineProperty(this,r,{value:c,enumerable:!0,configurable:!0,writable:!0}):this[r]=c,this._title=t,this._source=n,this._templateSelector=o}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){this._element.querySelector(".elements__delete-button").addEventListener("click",(function(e){e.target.closest(".elements__element").remove(),e.stopPropagation()})),this._element.querySelector(".elements__like-button").addEventListener("click",(function(e){e.target.classList.toggle("elements__like-button_active"),e.stopPropagation()})),this._element.querySelector(".elements__photo").addEventListener("click",this._handleOpenPopup)}},{key:"createCard",value:function(){this._element=this._getTemplate();var e=this._element.querySelector(".elements__photo");return e.src=this._source,e.alt="На фото: ".concat(this._title),this._element.querySelector(".elements__title").textContent=this._title,this._setEventListeners(e),this._element}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();var a=[{url:e.p+"02477918bcc2bc855e5a.jpg",title:"Нижний Новгород"},{url:e.p+"ec75e896c5ca75e2827e.jpg",title:"Боголюбово"},{url:e.p+"c10aa82aa62ad081297c.jpg",title:"Бородино"},{url:e.p+"4cabf089271b65cb2c8d.jpg",title:"Дубровицы"},{url:e.p+"cbad0b991ac123c704b9.jpg",title:"Тула"},{url:e.p+"7f107183cba12b8d826b.jpg",title:"Москва"}],s=document.querySelectorAll(".popup__btn-close"),p=document.querySelector(".profile__name"),_=document.querySelector(".profile__brief"),d=document.querySelector(".popup__input_type_name"),f=document.querySelector(".popup__input_type_brief"),m=document.querySelector(".elements__list"),h=document.querySelector(".popup_type_add-photos"),y=document.querySelector(".popup_type_edit-profile"),v=document.querySelector(".popup__input_type_photo-link"),b=document.querySelector(".popup__input_type_photo-title"),S=document.querySelector("#edit-profile-form"),g=document.querySelector("#add-photos-form"),E=(document.querySelector(".popup__input_type_photo-title"),document.querySelector(".popup__input_type_photo-link"),document.querySelector(".page")),q=Array.from(document.querySelectorAll(".popup")),L=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),C={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn-submit",inactiveButtonClass:"popup__btn-submit_inactive",inputErrorClass:"popup__error-hint_active",errorClass:"popup__input_invalid"};function w(e){e.classList.remove("popup_opened"),E.removeEventListener("keydown",j)}function j(e){"Escape"===e.key&&w(document.querySelector(".popup_opened"))}function P(e){e.classList.add("popup_opened"),E.addEventListener("keydown",j)}function O(e,t,n){m.prepend(function(e,t,n){return new c(e,t,n).createCard()}(e,t,n))}q.forEach((function(e){e.addEventListener("click",(function(t){"popup"===t.target.classList&&w(e)}))})),L.addEventListener("click",(function(){d.value=p.textContent,f.value=_.textContent,y.formValidator.toggleButtonState(),P(y)})),k.addEventListener("click",(function(){g.reset(),h.formValidator.toggleButtonState(),P(h)})),s.forEach((function(e){e.addEventListener("click",(function(e){w(e.target.closest(".popup"))}))})),S.addEventListener("submit",(function(e){e.preventDefault(),p.textContent=d.value,_.textContent=f.value,w(y)})),g.addEventListener("submit",(function(e){e.preventDefault(),O(b.value,v.value,".elements__element-template"),w(h)})),Array.from(document.querySelectorAll(C.formSelector)).forEach((function(e){var t=new o(C,e);return e.closest(".popup").formValidator=t,t.enableValidation()})),a.forEach((function(e){O(e.title,e.url,".elements__element-template")}))})();