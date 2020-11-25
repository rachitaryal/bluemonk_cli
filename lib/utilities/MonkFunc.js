const fs = require('fs')
const path = require('path')
const {Pinch, console_logger} = require('./@_utilities')
const { MakeUsers } = require('./Pinch')


const monk_func = (args) => {
    if(!args[3]){
        console_logger('\tIncomplete Command')
        return
    }

    const command = args[2].toString()
    const name= args[3].toString()

    //to capitalize the first letter of app and project
    const getName = () => {
        const name_first_character = name.charAt(0).toUpperCase()
        const name_remaining_characters = name.slice(1, name.length)
        const final_name = name_first_character + name_remaining_characters
        return final_name
    }

    const startproject_commands = ['startproject', 'start_project', 'project']
    const createapp_commands = ['createapp', 'create_app', 'app']
    const createusersapp_commands = ['make', 'add']

    const valid_commands = [...startproject_commands, ...createapp_commands, ...createusersapp_commands]
    if(!valid_commands.includes(command)){
        console_logger('\tInvalid Command')
    }

    //monk project <project_name>
    if(startproject_commands.includes(command)){
        const cwd = process.cwd()
        const src_dir = path.join(cwd + '/src')

        const package_json_file = path.join(cwd + '/package.json')
        const tsconfig_file = path.join(cwd + '/tsconfig.json')

        if(fs.existsSync(src_dir) && fs.existsSync(package_json_file) && fs.existsSync(tsconfig_file)){
            console_logger('\tProject has already been initiated\n\tRun: "monk app <app_name>"')
            return
        }

        if(fs.existsSync(src_dir) || fs.existsSync(package_json_file) || fs.existsSync(tsconfig_file)){
            console_logger(`\tstart project in an empty directory`)
            return
        }
        
        const project_name = getName()
        const pinch = new Pinch(project_name)
        pinch.source()
        console_logger(`\tProject "${project_name}" Created`)
    }


    //monk app <app_name>
    if(createapp_commands.includes(command)){

        const cwd = process.cwd()
        const src_dir = path.join(cwd + '/src')

        const package_json_file = path.join(cwd + '/package.json')
        const tsconfig_file = path.join(cwd + '/tsconfig.json')

        if(!fs.existsSync(src_dir) || !fs.existsSync(package_json_file) || !fs.existsSync(tsconfig_file)){
            console_logger(`\tProject has not been created yet.\n\tStart project in an empty directory.\n\tRun: "monk project <project_name>"`)
            return
        }
        const app_name = getName()
        const app_dir = `src/${app_name}`
        if(fs.existsSync(app_dir)){
            console_logger(`\tApp ${app_name} already exists.`)
            return
        }
        const pinch = new Pinch(app_name)
        pinch.app_directory()
        pinch.app_files()        
        console_logger(`\t"${app_name}" app created`)

    }

    // monk make users
    if(createusersapp_commands.includes(command)){
        const cwd = process.cwd()
        const src_dir = path.join(cwd + '/src')

        const package_json_file = path.join(cwd + '/package.json')
        const tsconfig_file = path.join(cwd + '/tsconfig.json')

        if(!fs.existsSync(src_dir) || !fs.existsSync(package_json_file) || !fs.existsSync(tsconfig_file)){
            console_logger(`\tProject has not been created yet.\n\tStart project in an empty directory.\n\tRun: "monk project <project_name>"`)
            return
        }

        const name_command = ['users', 'Users', 'user', 'User']
        if(!name_command.includes(name)){
            console_logger(`\tInvalid Command`)
            return
        }
        const app_dir = `src/Users`
        if(fs.existsSync(app_dir)){
            console_logger(`\tApp "Users" already exists.`)
            return
        }

        const makeUser = new MakeUsers()
        makeUser.createUsersApp()
        console_logger(`\t"Users" module added`)
    }
    


}

module.exports = {monk_func}