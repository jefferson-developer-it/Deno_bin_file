import { read } from "./functions/read.js";
import { create } from "./functions/create.js";
const help_text = `
Está faltando argumentos.
-h || --help

file <pathname> <args?>

Se não haver valor de args será verificado se o arquivo existe;
Se sim será lido, se não, será criado

args:
    -r || read <encode?="utf-8">
        > Ler o arquivo
    <text> -w || write
        > Escreve o arquivo (se ele não existir)
    <text> -ow || overwrite 
        > Escreve o arquivo (mesmo se ele existir)
    <text> -a || add 
        > Adiciona texto ao arquivo ou cria ele

encode:
    utf-8;
    byte;
`
const args = Deno.args;

if(!args.length) {
    console.log(help_text);

    Deno.exit()
}


if (args.length == 1) {
    if(args[0] == "-h" || args[0] == "--help"){
        console.log(help_text);
        Deno.exit()
    }
    try {
        console.log(await read(args[0]));
    } catch (_) {
        await create(args[0])
    }
}else if(args[1] == "-r" || args[1] == "read"){
    try {
       console.log(await read(args[0], args[2] || "utf-8"));
    } catch (_) {
        console.log("Este arquivo não existe.");
    }
}else{
    let exist;
    try {
        exist = await read(args[0])
    } catch (_) {
        exist = false;
    }

    switch (args[2]) {
        case "-w":
            if(!exist) create(args[0], args[1])
            else console.log("Arquivo existente, use o -ow se quiser sobrepor.");
            break;
        case "write":
            if(!exist) create(args[0], args[1])
            else console.log("Arquivo existente, use o -ow se quiser sobrepor.");
            break;
        case "-ow":
            create(args[0], args[1])
            break;
        case "overwrite":
            create(args[0], args[1])
            break;
        case "-a":
            if(!exist){
                create(args[0], args[1])
            }else{
                create(args[0], `${exist}${args[1]}`)
            }
            break
        case "add":
            if(!exist){
                create(args[0], args[1])
            }else{
                create(args[0], `${exist}${args[1]}`)
            }
            break;
        default:
            console.log("Operação invalida.");
            break;
    }
}
