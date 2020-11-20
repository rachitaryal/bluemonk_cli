const console_logger = (command_string) =>{
    const blue_color = `\x1b[34m%s\x1b[0m`
    const border_top = "|||||||||||||||||||| M O N K ||||||||||||||||||||"
    const border_bottom = "|||||||||||||||||||||||||||||||||||||||||||||||||"
    console.log(`${border_top}\n`)
    console.log(blue_color,`\t${command_string}\n`)
    console.log(border_bottom)
}

module.exports =  {console_logger}