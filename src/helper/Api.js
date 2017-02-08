import http from 'http'
import https from 'https'
import querystring from 'querystring'
import clc from 'cli-color'

class Api {

	constructor(firebase) {
		this.firebase = firebase
	}

	call(url, method = 'GET', headers = {}, body = {}) {

		if(typeof body == 'object') {
			body = querystring.stringify(body)
		}
		const p = new Promise((resolve, reject) => {
			let splitUrl = /^(http|https):\/\/(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)\/(.+)/.exec(url)
			var protocol = http
			if(splitUrl[1] == 'https') {
				protocol = https
			}
			var options = {
				hostname: splitUrl[2]
				,path: `/${splitUrl[3]}`
				,method: method
				,headers: headers
			}

			var req = protocol.request(options, (res) => {
				const statusCode = res.statusCode;
				const contentType = res.headers['content-type'];

				let error;
				if (statusCode !== 200) {
					error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
				} else if (!/^application\/json/.test(contentType)) {
					error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
				}
				if (error) {
					reject({
						success: 0,
						result: error.message
					});
					res.resume();
					return;
				}

				res.setEncoding('utf8')
				let rawData = '';
				res.on('data', (chunk) => {
					rawData += chunk
				})
				res.on('end', () => {
					try {
						let parsedData = JSON.parse(rawData)
						resolve({
							sucess: 1,
							result: parsedData
						})
					} catch (e) {
						reject({
							sucess: 0,
							result: e.message
						})
					}
				});
			})

			req.on('error', (e) => {
				reject({
					success: 0,
					result: `Got error: ${e.message}`
				});
			});

			req.write(body)
			req.end()
		});

		return p
	}

	get () {
		return this.call(this.url)
	}

	save(obj) {
	  this.firebase.set(`${this.id}/${this.userId}`, obj)
	  console.log(clc.cyan(`Update ${this.id} at ${new Date()}`))
	}
}

export default Api