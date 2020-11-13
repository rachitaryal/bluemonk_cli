const console_logger = (command_string) =>{
    const blue_color = `\x1b[34m%s\x1b[0m`
    console.log("========================================\n")
    console.log(blue_color,`${command_string}\n`)
    console.log("========================================")
}

module.exports = {
    console_logger
}