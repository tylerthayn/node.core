require('@js/core')

let fs = require('fs-extra')
Define(global, '$fs', fs)
Define(global, 'Fs', fs)

let path = require('path')
Define(global, '$path', path)
Define(global, 'Path', path)


