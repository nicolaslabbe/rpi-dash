class Loader {

	constructor(firebase) {
		this.wrapper = document.querySelector('[data-loading-wrapper="true"]')
	}

	show() {
		this.wrapper.classList.remove('hidden')
	}

	hide(val) {
		this.wrapper.classList.add('hidden')
	}
}

export default Loader