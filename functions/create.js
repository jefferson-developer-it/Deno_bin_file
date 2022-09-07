export async function create(filename, text="") {
    const text_encode = new TextEncoder()
    await Deno.writeFile(filename, text_encode.encode(text))
}