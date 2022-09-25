function Alias (...args) {
	require('@tyler.thayn/js.core')
	const FindRoot = require('find-root')
	const Fs = require('fs')
	const Ini = require('ini')
	const Path = require('path')

	let paths = [
		Path.resolve(FindRoot(process.cwd()), '.npmrc'),
		Path.resolve(FindRoot(process.cwd()), 'package.json'),
		Path.resolve(process.env.USERPROFILE, '.npmrc'),
		Path.resolve(Path.dirname(process.argv[0]), '.npmrc'),
		Path.resolve(Path.dirname(process.argv[0]), 'etc/.npmrc'),
		Path.resolve(Path.dirname(process.argv[0]), 'node_modules/npm/.npmrc')
	]

	let aliases = {}

	paths.reverse().forEach(path => {
		try {
			if (path.endsWith('.json')) {
				Extend(aliases, JSON.parse(Fs.readFileSync(path, 'utf-8')).npm.aliases)
			} else {
				Extend(aliases, Ini.parse(Fs.readFileSync(path, 'utf-8')).npm.aliases)
			}
		} catch (e) {}
	})

	console.log('Aliases')
	console.log(aliases)
	return args.map(p => Object.keys(aliases).includes(p) ? aliases[p] : p)
}