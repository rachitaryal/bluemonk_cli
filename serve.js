const fs = require('fs')
const monk_dir = './Monk/'
const monk_utilities = `${monk_dir}@_utilities`
const {console_logger, ServeMonk} = require(monk_utilities)


const arguments = process.argv 
const action = arguments[2].toString()

const valid_actions = ['monk', 'blue_monk', 'bluemonk']
if(!valid_actions.includes(action)){
    console_logger('Invalid Action')
    return
}
const package_json = `./package.json`
if(fs.existsSync(package_json)){
    console_logger(`Monk Has Already Been Served`)
    return
}
const serve_monk = new ServeMonk()
serve_monk.serve()
console_logger(`Monk Served`)