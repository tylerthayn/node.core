require('@js/core')
let Fs = require('fs-extra')
let Path = require('path')

module.exports = function(grunt) {
	grunt.registerTask('NpmAlias', 'Npm install aliases', function() {

		let npmInstall = Path.join(Path.dirname(require.resolve('npm')), 'install.js')
		let npmInstallBackup = Path.join(Path.dirname(require.resolve('npm')), '~install.js')

		if (this.flags.uninstall) {
			grunt.log.write(`Restoring backup file '${npmInstallBackup}' => '${npmInstall}'...`)
			Fs.copySync(npmInstallBackup, npmInstall)
			grunt.log.writeln('done')
		} else {
			let aliasFn = Fs.readFileSync('NpmAlias/Alias.js', 'utf-8')

			grunt.log.write(`Backing up file '${npmInstall}' => '${npmInstallBackup}'...`)
			Fs.copySync(npmInstall, npmInstallBackup)
			grunt.log.writeln('done')

			grunt.log.write(`Modifying '${npmInstall}'...`)
			let source = Fs.readFileSync(npmInstall, 'utf-8')
			source = source.replace(/function Installer \(where, dryrun, args, opts\) {/i, 'function Installer (where, dryrun, args, opts) {\n\targs = Alias(...args)\n')
			Fs.writeFileSync(npmInstall, source+'\n\n'+aliasFn, 'utf-8')
			grunt.log.writeln('done')
		}

	})
}
