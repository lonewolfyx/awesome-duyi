export function getMsToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < 107; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength)
        result += characters[randomIndex]
    }

    return result
}
