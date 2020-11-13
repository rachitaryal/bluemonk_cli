const fs = require('fs')
const {Pinch} = require('./Monk/pinch')
const {console_logger} = require('./Monk/console_logger')


const arguments = process.argv 
if(!arguments[3]){
    console_logger('Incomplete Command')
    return
}
const command = arguments[2].toString()
const name = arguments[3].toString()

const getName = () => {
    const name_first_character = name.charAt(0).toUpperCase()
    const name_remaining_characters = name.slice(1, name.length)
    const final_name = name_first_character + name_remaining_characters
    return final_name
}


const valid_commands = ["startproject", "start_project", "createapp", "create_app"]
if(!valid_commands.includes(command)){
    console_logger('Invalid Command')
}
const startproject_commands = ["startproject", "start_project"]
if(startproject_commands.includes(command)){
    const src_dir = `./src/`
    if(fs.existsSync(src_dir)){
        console_logger("Project has already been initiated")
        return
    }
    const project_name = getName()
    const pinch = new Pinch(project_name)
    pinch.source()
    console_logger("Project created")
}

const createapp_command = ["createapp", "create_app"]
if(createapp_command.includes(command)){
    const src_dir = './src/'

    if(!fs.existsSync(src_dir)){
        console_logger(`Project has not been created yet.\nRun: "node monk.js startproject <project_name>"`)
        return
    }

    const app_name = getName()
    const app_dir = `src/${app_name}`
    if(fs.existsSync(app_dir)){
        console_logger(`${app_name} app already exists...`)
        return
    }
    const pinch = new Pinch(app_name)
    pinch.app_directory()
    pinch.app_files()
    console_logger(`${app_name} app created`)

}

