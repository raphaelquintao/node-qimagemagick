const {spawn} = require('child_process');
const fs = require('fs');

// console.log('TEST');

class Info {
    constructor(width, height, format) {
        this.width = width;
        this.height = height;
        this.format = format;
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
            if(err) reject(err);
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
            // reject(e)
        }
        if (src instanceof Buffer) child.stdin.end(src);
    });
}

/**
 *
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
                let size = parts[2].split('x');
                resolve(new Info(size[0], size[1], format.toLowerCase()));
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
    let arguments = ['-'];
    
    if (typeof data == "string") arguments = [data];
    
    console.log(to_file !== '');
    
    for (const p in args) {
        if (p.toLowerCase() === 'format') {
            format = args[p] ? args[p].toLowerCase() : format;
        } else {
            if (args[p]) {
                arguments.push(`-${p}`);
                arguments.push(args[p]);
            }
        }
    }
    
    if (to_file === '') arguments.push(`${format}:-`);
    else arguments.push(to_file);
    
    
    return new Promise((resolve, reject) => {
        _exec('convert', arguments, data, 'binary')
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

module.exports = {identify, convert, read_to_buffer};
