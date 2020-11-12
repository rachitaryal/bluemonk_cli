const fs = require('fs')

const createDir = (dirPath) => {
    fs.mkdirSync(process.cwd() + dirPath, {recursive: true }, (error)=> {
        if(error){
            console.log('Error: ', error)
        } else {
            // console.log('Directory Created!')
        }
    })
}

const createFile = (fileName, fileContent) =>{
    fs.writeFile(fileName, fileContent, (error)=>{
        if(error){
            console.log('Error: ', error)
        } else {
            // console.log('Directory Created!')
        }
    })
}

const pinch_directory = (app_name) => {
    const createApp = `/src/${app_name}`
    const createControllers = `${createApp}/Controllers`
    const createRoutes = `${createApp}/Routes`
    const createModels = `${createApp}/Models`
    const createServices = `${createApp}/Services`

    createDir(createApp)
    createDir(createControllers)
    createDir(createRoutes)
    createDir(createModels)
    createDir(createServices)
}

const pinch_files = (app_name) =>{
    const routes_file = `./src/${app_name}/Routes/${app_name}Route.js`
    const model_file = `./src/${app_name}/Models/${app_name}Model.js`
    const service_file = `./src/${app_name}/Services/${app_name}Service.js`
    const controller_file = `./src/${app_name}/Controllers/${app_name}Controller.js`
    const routes_file_content = 'import {} from '
    createFile(routes_file, routes_file_content)
    createFile(model_file, routes_file_content)
    createFile(service_file, routes_file_content)
    createFile(controller_file, routes_file_content)
}


const arguments = process.argv 
const args_create_app_command = arguments[2].toString()
const args_app_name = arguments[3].toString()

const args_first_character = args_app_name.charAt(0).toUpperCase()
const remaining_characters = args_app_name.slice(1, args_app_name.length)
const combined_app_name = args_first_character + remaining_characters


if(args_create_app_command === 'createapp' || 'create_app'){
    pinch_directory(combined_app_name)
    console.log(`${combined_app_name} app created`) ; 
    pinch_files(combined_app_name)
    // createFile(`./${combined_app_name}/test.js`, 'something')
}else{
    console.log(` Hint: node pincher.js createapp <app_name>`)
}
  
