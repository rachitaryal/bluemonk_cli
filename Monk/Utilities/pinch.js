const fs = require('fs')

const createDir = (dirPath) => {
    fs.mkdirSync(process.cwd() + dirPath, {recursive: true }, (error)=> {
        if(error){
            console.log('Error: ', error)
        } 
    })
}

const createFile = (fileName, fileContent='') =>{
    fs.writeFile(fileName, fileContent, (error)=>{
        if(error){
            console.log('Error: ', error)
        } 
    })
}

const copyFile = (source_file, destination_file) =>{
    fs.copyFile(source_file, destination_file, (error) => {
    if (error) console.log('Error: ', error);
    });
}

class Pinch{

    constructor(name){
        this.name = name
        this.src_path = '/src/'
        this.monk_src = `./Monk/src/`
        this.monk_root = `${this.monk_src}/Root`
        this.monk_app = `${this.monk_src}/App`
    }

    source(){
        /* 
            creates root/(project_name) dir for project
            creates Routes.js and Server.js files in root
            copies the content of Routes.js and Server.js from Monk to current project root
        */

        const project_name = this.name || 'Root'
        const src = this.src_path || `/src/`
        const root = `${src}/${project_name}`
        const monk_root = this.monk_root
    
        const server_file = `.${root}/Server.js`
        const routes_file = `.${root}/Routes.js`
        const setup_file = `.${root}/Setup.js`

        const monk_server_file = `${monk_root}/Server.js`
        const monk_routes_file = `${monk_root}/Routes.js`
        const monk_setup_file = `${monk_root}/Setup.js`
    
        createDir(root)
        createFile(server_file)
        createFile(routes_file)
        createFile(setup_file)
        copyFile(monk_server_file, server_file)
        copyFile(monk_routes_file, routes_file)
        copyFile(monk_setup_file, setup_file)
    }

    app_directory(){
        /*
            creates app directory with required folder/dir 
        */

        const src = this.src_path || `/src/`

        const app_name = this.name
        const App = `/${src}/${app_name}`
        const Controllers = `${App}/Controllers`
        const Routes = `${App}/Routes`
        const Models = `${App}/Models`
        const Services = `${App}/Services`

        createDir(App)
        createDir(Controllers)
        createDir(Routes)
        createDir(Models)
        createDir(Services)
    }

    app_files(){
        /*
            creates namespace files for app 
            copies the content of Monk App Routes.js file to current app routes file
        */

        const src = this.src_path || `/src/`
        const monk_app = this.monk_app
        const app_name = this.name
        const dot_path = `.${src}`
        const service_namespace = `${dot_path}/${app_name}/Services/@_service.js`
        const routes_namespace = `${dot_path}/${app_name}/Routes/@_routes.js`
        const model_namespace = `${dot_path}/${app_name}/Models/@_model.js`
        const controller_namespace = `${dot_path}/${app_name}/Controllers/@_controller.js`

        const common_file_content = '//import {} '

        const routes_file = `${dot_path}${app_name}/Routes/${app_name}Routes.js`
        const monk_routes_file = `${monk_app}/Routes/AppRoutes.js`
        

        //namespace files
        createFile(routes_namespace, common_file_content)
        createFile(model_namespace, common_file_content)
        createFile(service_namespace, common_file_content)
        createFile(controller_namespace, common_file_content)

        //create app routes file
        createFile(routes_file)

        //coping routes file from monk/src/app/routes/approutes.js to current app routes.js
        copyFile(monk_routes_file, routes_file)
    }
        
}

class ServeMonk{
    serve(){
        const monk_dir = `./Monk/`
        const package_json_file = './package.json'
        const monk_package_json_file = `${monk_dir}/package.json`

        copyFile(monk_package_json_file, package_json_file)
    }
}

module.exports = {
    Pinch,
    ServeMonk
}