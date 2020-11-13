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

class Pinch{

    constructor(name){
        this.name = name
        this.src_path = '/src/'
    }

    source(){
        const project_name = this.name || 'Root'
        const createSrc = this.src_path || `/src/`
        const createRoot = `${createSrc}/${project_name}`
    
        const createServer = `.${createRoot}/Server.js`
        const serverContent = `//pass server content here`
    
        createDir(createRoot)
        createFile(createServer, serverContent)
    }

    app_directory(){
        const createSrc = this.src_path || `/src/`
        const app_name = this.name
        const createApp = `/${createSrc}/${app_name}`
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

    app_files(){
        const createSrc = this.src_path || `/src/`
        const app_name = this.name
        const dot_path = `.${createSrc}`
        const service_namespace = `${dot_path}${app_name}/Services/@_service.js`
        const routes_namespace = `${dot_path}${app_name}/Routes/@_routes.js`
        const model_namespace = `${dot_path}${app_name}/Models/@_model.js`
        const controller_namespace = `${dot_path}${app_name}/Controllers/@_controller.js`

        const common_file_content = '//import {} '
        const routes_file = `${dot_path}${app_name}/Routes/${app_name}Routes.js`
        const routes_file_content = `import run from "../Dispatcher/dispatch"\nimport Router from "express/router"`

        //namespace files
        createFile(routes_namespace, common_file_content)
        createFile(model_namespace, common_file_content)
        createFile(service_namespace, common_file_content)
        createFile(controller_namespace, common_file_content)
        createFile(routes_file, routes_file_content)
    }
        
}

module.exports.default = Pinch