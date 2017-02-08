import clc from 'cli-color'

import {
	Update
} from './modules'

let update = new Update()

update.init()
.then(() => {
	console.log(clc.cyan(`Api update finished at ${new Date()}`))
})