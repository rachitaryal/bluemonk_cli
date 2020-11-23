const fs = require('fs')
const path = require('path')
const {console_logger} = require('./ConsoleLogger')

//to create directories
const createDir = (dirPath) => {
    try{
        fs.mkdirSync(process.cwd() + dirPath, {recursive: true})
    }catch(err){
        console_logger(`Error: ${err}`)
    }
}

// to create file with empty content
const createFile = (filePath, fileContent='') =>{
    fs.writeFile(filePath, fileContent, (error)=>{
        if(error){
            console_logger(`Error: ${error}`)
        } 
    })
} 

// to create file with content 
const createFileWithContent = (srcFilePath, destFilePath) => {
    //"srcFilePath" is the file to be read from and "destFilePath" is the file to be written to
    fs.readFile(srcFilePath, 'utf8', function(err, fileContent){ 
        createFile(destFilePath, fileContent)
    })
} 

// to copy source file to destiontion file
const copyFile = (source_file, destination_file) =>{
    fs.copyFile(source_file, destination_file, (error) => {
        if (error) console_logger(`Error: ${error}`);
    });
}

const copyFileSync = ( source, target ) => {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

const copyFolderRecursiveSync = ( source, target ) => {
    let files = [];

    // Check if folder needs to be created or integrated
    let targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            let curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

class MakeUsers {
    src_path = '/src'
    cwd = process.cwd()
    monk_src = path.join(__dirname + '/../src')
    monk_users_app = `${this.monk_src}/Users`

    createUsersApp(){
        // source Users dir
        const cwd = this.cwd
        const monk_users_app = this.monk_users_app

        //destination Users dir
        const users_app = `${cwd}/src/`

        copyFolderRecursiveSync(monk_users_app, users_app)

    }
}

class Pinch{
    name
    src_path = '/src'
    cwd = process.cwd()
    // monk_src = '../../Monk/src'
    //Monk/Library/src/Root/Server
    //./node_modules/Monk/Library/src/
    //path.join(__dirname + '/../src/')
    monk_src = path.join(__dirname + '/../src/')
    monk_root = `${this.monk_src}/Root`
    monk_app = `${this.monk_src}/App`

    constructor(name){
        this.name = name
    }

    source(){
        /* 
            creates root/(project_name) dir for project
            creates Routes.ts, Server.ts and Setup.ts files in root
            copies the content of Routes.ts, Server.ts and Setup.ts from Monk to current project root
        */
        const project_name = this.name
        const cwd = this.cwd
        const src = this.src_path
        const monk_src = this.monk_src
        const root = `${src}/${project_name}`
        const monk_root = this.monk_root

        //destination root files
        const server_file = `.${root}/Server.ts`
        const routes_file = `.${root}/Routes.ts`
        const setup_file = `.${root}/Setup.ts`

        //source root files
        const monk_server_file = `${monk_root}/Server.ts`
        const monk_routes_file = `${monk_root}/Routes.ts`
        const monk_setup_file = `${monk_root}/Setup.ts`

        //destination .json file 
        const package_json_file = `${cwd}/package.json`
        const tsconfig_json_file = `${cwd}/tsconfig.json`

        //source .json file
        const monk_package_json_file = `${monk_src}/package.json`
        const monk_tsconfig_json_file = `${monk_src}/tsconfig.json`

        try {
            //creates the project name directory
            createDir(root)

            //create server, routes, setup files
            createFileWithContent(monk_server_file, server_file)
            createFileWithContent(monk_routes_file, routes_file)
            createFileWithContent(monk_setup_file, setup_file)      
            
            //create package.json and tsconfig files
            createFileWithContent(monk_package_json_file, package_json_file)
            createFileWithContent(monk_tsconfig_json_file, tsconfig_json_file)

        } catch (error) {
            console_logger(`Error: ${error}`)
        }
    }

    app_directory(){
         /*
            creates app directory with required folder/dir 
        */
        const src = this.src_path
        const app_name = this.name
        const App = `${src}/${app_name}`
        const Controllers = `${App}/Controllers`
        const Routes = `${App}/Routes`
        const Models = `${App}/Models`
        const Services = `${App}/Services`

        try {
            createDir(App)
            createDir(Controllers)
            createDir(Routes)
            createDir(Models)
            createDir(Services)
        } catch (error) {
            console_logger(`Error: ${error}`)
        }

    }

    app_files(){
        /*
            creates @_(import_utility).ts files for app 
            copies the content of Monk App Routes.ts file to current app routes file
        */
        const src = this.src_path
        const monk_app = this.monk_app
        const app_name = this.name
        const dot_path = `.${src}`

        //destination files
        const service_namespace = `${dot_path}/${app_name}/Services/@_service.ts`
        const routes_namespace = `${dot_path}/${app_name}/Routes/@_routes.ts`
        const model_namespace = `${dot_path}/${app_name}/Models/@_model.ts`
        const controller_namespace = `${dot_path}/${app_name}/Controllers/@_controller.ts`

        //destination route file
        const routes_file = `${dot_path}/${app_name}/Routes/${app_name}Routes.ts`
        //source route file
        const monk_routes_file = `${monk_app}/Routes/AppRoutes.ts`

        try {
            createFile(routes_namespace)
            createFile(model_namespace)
            createFile(service_namespace)
            createFile(controller_namespace)

            createFileWithContent(monk_routes_file, routes_file)
            
        } catch (error) {
            console_logger(`Error: ${error}`)
        }
    }
}

module.exports =  {Pinch, MakeUsers}
