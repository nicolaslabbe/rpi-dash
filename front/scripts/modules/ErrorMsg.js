class ErrorMsg {

	constructor() {
		this.msgWrapper = document.querySelector('[data-info-msg="true"]')
	}

	show(msg) {
		this.msgWrapper.innerHTML = msg
	}

	hide(val) {
		this.msgWrapper.innerHTML = 'welcome back'
	}
}

export default ErrorMsg