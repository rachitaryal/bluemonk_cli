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

const startproject_commands = ["startproject", "start_project", "project"]
const createapp_commands = ["createapp", "create_app", "app"]

const valid_commands = [...startproject_commands, ...createapp_commands]
if(!valid_commands.includes(command)){
    console_logger('Invalid Command')
}
if(startproject_commands.includes(command)){
    const src_dir = `./src/`
    if(fs.existsSync(src_dir)){
        console_logger(`Project has already been initiated\n\tRun: "node monk.js createapp <app_name>"`)
        return
    }
    const project_name = getName()
    const pinch = new Pinch(project_name)
    pinch.source()
    console_logger("Project created")
}

if(createapp_commands.includes(command)){
    const src_dir = './src/'

    if(!fs.existsSync(src_dir)){
        console_logger(`Project has not been created yet.\n\tRun: "node monk.js startproject <project_name>"`)
        return
    }

    const app_name = getName()
    const app_dir = `src/${app_name}`
    if(fs.existsSync(app_dir)){
        console_logger(`App "${app_name}" already exists...`)
        return
    }
    const pinch = new Pinch(app_name)
    pinch.app_directory()
    pinch.app_files()
    console_logger(`${app_name} app created`)

}

