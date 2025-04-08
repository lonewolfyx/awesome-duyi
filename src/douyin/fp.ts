export const getFp = () => {
    const e = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const t = e.length
    let milliseconds = Date.now()
    let base36 = ''
    while (milliseconds > 0) {
        const remainder = milliseconds % 36
        if (remainder < 10) {
            base36 = remainder.toString() + base36
        } else {
            base36 = String.fromCharCode('a'.charCodeAt(0) + remainder - 10) + base36
        }
        milliseconds = Math.floor(milliseconds / 36)
    }
    const r = base36
    const o = Array(36).fill('')
    o[8] = o[13] = o[18] = o[23] = '_'
    o[14] = '4'

    for (let i = 0; i < 36; i++) {
        if (!o[i]) {
            let n = 0 || Math.floor(Math.random() * t)
            if (i === 19) {
                n = (3 & n) | 8
            }
            o[i] = e[n]
        }
    }
    const ret = 'verify_' + r + '_' + o.join('')
    return ret
}
