export async function read(filename, encode="utf-8") {
    const text_decode_default = new TextDecoder("utf-8")
    const file = await Deno.readFile(filename);

    return encode == "utf-8"? text_decode_default.decode(file): file
}