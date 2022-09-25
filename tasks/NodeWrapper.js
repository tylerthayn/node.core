require('@js/core')
let Fs = require('fs-extra')
let Path = require('path')

module.exports = function(grunt) {

	grunt.registerTask('NodeWrapper', 'Alternative Install', function() {
		if (this.flags.test) {
			grunt.log.writeln(`bin => '${process.argv[0]}'`)
			if (process.argv[0].endsWith('node.exe')) {
				grunt.log.writeln('\tnot wrapped')
			} else {
				grunt.log.writeln('\twrapped')
			}

			grunt.log.write(Path.join(Path.dirname(process.argv[0]), 'node.cmd'))
			if (grunt.file.exists(Path.join(Path.dirname(process.argv[0]), 'node.cmd'))) {
				grunt.log.writeln(' exists')
			} else {
				grunt.log.writeln(' does not exist')
			}
		} else if (this.flags.uninstall) {
			if (process.argv[0].endsWith('node.exe')) {
				throw new Error('NodeWrapper not configured')
			}

			grunt.log.write(`Moving '${process.argv[0]}' => '${Path.join(Path.dirname(process.argv[0]), 'node.exe')}'...`)
			Fs.moveSync(process.argv[0], Path.join(Path.dirname(process.argv[0]), 'node.exe'))
			grunt.log.writeln('done')

			grunt.log.write(`Removing NodeWrapper '${Path.join(Path.dirname(process.argv[0]), 'node.cmd')}'...`)
			Fs.rmSync(Path.join(Path.dirname(process.argv[0]), 'node.cmd'))
			grunt.log.writeln('done')
		} else {
			if (!process.argv[0].endsWith('node.exe')) {
				throw new Error('node.exe is not the executing program')
			}

			grunt.log.write(`Adding NodeWrapper '${Path.join(Path.dirname(process.argv[0]), 'node.cmd')}'...`)
			Fs.writeFileSync(Path.join(Path.dirname(process.argv[0]), 'node.cmd'), `@ECHO OFF\nSETLOCAL\n\nSET "NODE_EXE=${Path.join(Path.dirname(process.argv[0]), 'NODE_EXE.exe')}"\nSET NODE_WRAPPED=1 & "%NODE_EXE%" -r @node/core %*\n`, 'utf-8')
			grunt.log.writeln('done')

			grunt.log.write(`Moving '${process.argv[0]}' => '${Path.join(Path.dirname(process.argv[0]), 'NODE_EXE.exe')}'...`)
			Fs.moveSync(process.argv[0], Path.join(Path.dirname(process.argv[0]), 'NODE_EXE.exe'))
			grunt.log.writeln('done')

		}

/*
		let options = this.options({})
		try  {Fs.mkdirSync(Path.resolve(installFolder, options.pkgName), {recursive: true})} catch (e) {}
		Object.keys(options.files).forEach(file => {
			Fs.copyFileSync(Path.resolve('./'+file), Path.resolve(installFolder, options.pkgName, options.files[file]))
		})
		Object.keys(options.pkg).forEach(key => {
			pkg[key] = options.pkg[key]
		})
		Fs.writeFileSync(Path.resolve(installFolder, options.pkgName, 'package.json'), JSON.stringify(pkg, null, 4), 'utf-8')

		let exts = ['.CMD'].concat(process.env.PATHEXT.split(';')).Unique().join(';')
		const cmd = spawnSync('setx', ['/M', 'PATHEXT', exts])
*/
	})
}
