#! /usr/bin/env node

const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')

const glob = process.argv[2] || './*'

const watcher = chokidar.watch(glob, {
	cwd: '.',
	ignoreInitial: true,
	awaitWriteFinish: {
		stabilityThreshold: 800,
		pollInterval: 100
	},
	atomic: true
})

watcher
	.on('ready', () => {
		console.log(`Watching ${__dirname} for ${glob} ...`)
	})
	.on('add', handler)
	.on('change', handler)

function handler(filePath, stats) {
	console.log()
	console.log('Discovered ' + filePath)
	const ext = path.extname(filePath)

	const notExt = filePath.substr(0,
		filePath.length - ext.length)
	const result = /(.*)([0-9]+)$/.exec(notExt)

	if (result) {
		console.log(`File ${filePath} ends with a number. Exiting.`)
		return;
	}

	let newName = null
	for (let i = 1; !newName; i++) {
		const tryName = notExt + '_' + i + ext
		console.log('Seeing if ' + tryName + ' exists...')
		if (fs.existsSync(tryName)) continue
		newName = tryName
	}

	console.log('Renaming ' + filePath + ' to ' + newName + ' ...')
	fs.renameSync(filePath, newName)
}
