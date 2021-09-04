const {spawn} = require("child_process");
const fs = require("fs");

class Info {
    constructor(width, height, format, bytes) {
        this.width = width;
        this.height = height;
        this.format = format;
        this.size = this.human_filesize(bytes);
    }
    
    human_filesize(bytes) {
        let hsz = ['B', 'K', 'M', 'G', 'T', 'P'];
        let factor = Math.floor((String(bytes).length - 1) / 3);
        return (bytes / Math.pow(1024, factor)).toFixed(4) + hsz[factor];
    }
    
    toString() {
        return JSON.stringify(this);
    }
}

/**
 * Read File to Buffer
 * @param {string} path
 * @return {Buffer}
 */
function read_to_buffer(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, ((err, data) => {
            if (err) reject(err);
            resolve(Buffer.from(data, 'binary'));
        }));
        
    });
}


/**
 * @param {string} cmd
 * @param {*[]|IArguments} args
 * @param {string|Buffer} src
 * @param {string} output_encoding
 * @return {Promise<Buffer>}
 */
function _exec(cmd, args = [], src, output_encoding = 'utf8') {
    const child = spawn(cmd, args, {shell: true});
    
    child.stdout.setEncoding(output_encoding);
    child.stderr.setEncoding('utf8');
    
    let out = "";
    
    return new Promise((resolve, reject) => {
        try {
            child.stderr.on('data', (data) => {
                return reject(data)
            });
            child.stdout.on('data', (data) => {
                if (out) out += data;
                else out = data;
                // resolve(data);
            });
            child.on('close', (code) => {
                resolve(out);
            });
        } catch (e) {
            reject(e)
        }
        if (src instanceof Buffer) child.stdin.end(src);
    });
}

/**
 * Identify an image
 * @param data
 * @return {Promise<Info>}
 */
function identify(data) {
    let args = [];
    if (data instanceof Buffer) args.push('-');
    else args.push(data);
    
    return new Promise((resolve, reject) => {
        _exec('identify', args, data)
            .then(value => {
                let parts = value.split(' ');
                let format = parts[1];
                let geometry = parts[2].split('x');
                let file_size = (data instanceof Buffer) ? data.length : fs.statSync(data).size;
                resolve(new Info(geometry[0], geometry[1], format.toLowerCase(), file_size));
            }).catch(reason => {
            reject(reason);
        });
        
    });
}

/**
 * Convert a Image
 * @param {string|Buffer} data Image path or Buffer
 * @param {Object} args Params from imagemagick convert. Checkout: {@link https://imagemagick.org/script/convert.php}
 * @param {string} to_file
 * @return {Promise<Buffer>}
 */
function convert(data, args = {}, to_file = '') {
    let format = 'png';
    let _arguments = ['-'];
    
    if (typeof data == "string") _arguments = [data];
    
    for (const p in args) {
        if (p.toLowerCase() === 'format') {
            format = args[p] ? args[p].toLowerCase() : format;
        } else {
            if (args[p]) {
                _arguments.push(`-${p}`);
                _arguments.push(args[p]);
            }
        }
    }
    
    if (to_file === '') _arguments.push(`${format}:-`);
    else _arguments.push(to_file);
    
    
    return new Promise((resolve, reject) => {
        _exec('convert', _arguments, data, 'binary')
            .then(async value => {
                let buffer = null;
                if (to_file === '') {
                    buffer = Buffer.from(value, 'binary');
                } else {
                    buffer = await read_to_buffer(to_file)
                }
                resolve(buffer);
            }).catch(reason => {
            reject(reason);
        });
        
    });
}

let qim = {identify, convert, read_to_buffer};

module.exports = qim;
