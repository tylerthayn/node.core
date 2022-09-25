let $path = require('path')

module.exports = function(grunt) {
	let pkg = require('./package.json')
	let globalFolder = $path.resolve(Reflect.has(process.env, 'npm_config_prefix') ? process.env.npm_config_prefix : process.env.NODE_PATH.split(/(;|:)/g).pop())

	grunt.initConfig({
		NodeWrapper: {},
		NpmAlias: {}
	})
	grunt.loadTasks('tasks')
	grunt.registerTask('default', ['NodeWrapper:test'])
}
