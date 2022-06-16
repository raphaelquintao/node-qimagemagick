"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qim = exports.QIM = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
class Info {
    constructor(groups, file_size_in_bytes) {
        this.width = parseInt(groups === null || groups === void 0 ? void 0 : groups.page_width) || 0;
        this.height = parseInt(groups === null || groups === void 0 ? void 0 : groups.page_height) || 0;
        // this.page_width = parseInt(groups?.page_width) || 0;
        // this.page_height = parseInt(groups?.page_height) || 0;
        this.format = groups === null || groups === void 0 ? void 0 : groups.format;
        this.depth = groups === null || groups === void 0 ? void 0 : groups.depth;
        this.colorspace = groups === null || groups === void 0 ? void 0 : groups.colorspace;
        this.size = this.human_filesize(file_size_in_bytes);
    }
    human_filesize(bytes) {
        let hsz = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
        let factor = Math.floor((String(bytes).length - 1) / 3);
        return (bytes / Math.pow(1024, factor)).toFixed(4) + hsz[factor];
    }
    toString() {
        return JSON.stringify(this);
    }
}
class QIM {
    /**
     * @param {string} cmd
     * @param {*[]|IArguments} args
     * @param {string | Buffer} src
     * @param {BufferEncoding} output_encoding
     * @return {Promise<String>}
     */
    static _exec(cmd, args = [], src, output_encoding = 'utf8') {
        const child = (0, child_process_1.spawn)(cmd, args, { shell: true });
        child.stdout.setEncoding(output_encoding);
        let out = undefined;
        // console.log(args);
        return new Promise((resolve, reject) => {
            var _a;
            child.stdin.on('error', (err) => {
                reject(err);
            });
            child.stderr.on('data', (data) => {
                // console.log('stderr error');
                reject(data);
            });
            child.stdout.on('data', (data) => {
                if (out)
                    out += data;
                else
                    out = data;
            });
            child.stdout.on('end', () => {
                // console.log('end');
                resolve(out);
            });
            child.on('close', (message) => {
                // console.log('close', message);
                resolve(out);
            });
            if (src instanceof Buffer)
                (_a = child.stdin) === null || _a === void 0 ? void 0 : _a.write(src);
            child.stdin.end();
        });
    }
    // static buffer_mime(buffer: string | Buffer) {
    //     let args = ['--mime', '--brief'];
    //
    //     args.push(typeof buffer == 'string' ? buffer : '-');
    //
    //     return new Promise((resolve, reject) => {
    //         QIM._exec('file', args, buffer)
    //             .then(value => {
    //                 resolve(value);
    //             })
    //             .catch(reason => {
    //                 reject(reason);
    //             });
    //     });
    // }
    /**
     * Read File to Buffer
     * @param path Sys path or remote url
     * @return {Promise<Buffer>}
     */
    static read_to_buffer(path) {
        return new Promise((resolve, reject) => {
            if (path.startsWith('http')) {
                axios_1.default.get(path, { responseType: 'arraybuffer' }).then(value => {
                    resolve(value.data);
                }).catch(reason => {
                    reject(reason.toString());
                });
            }
            else {
                fs_1.default.readFile(path, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }
        });
    }
    /**
     * Identify an image
     * @param {string | Buffer} data
     * @returns {Promise<Info>}
     */
    static identify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = /^\S+\s(?<format>\S+)\s(?<width>\d+)x(?<height>\d+)\s(?<page_width>\d+)x(?<page_height>\d+)\+(?<x_offset>\d+)\+(?<y_offset>\d+)\s(?<depth>\S+)\s(?<colorspace>\S+)/;
            let args = ['-'];
            let buffer = (data instanceof Buffer) ? data : yield QIM.read_to_buffer(data);
            return new Promise((resolve, reject) => {
                QIM._exec('identify', args, buffer)
                    .then(value => {
                    var _a;
                    let groups = (_a = value.match(regex)) === null || _a === void 0 ? void 0 : _a.groups;
                    resolve(new Info(groups, buffer.length));
                })
                    .catch(reason => {
                    reject(reason);
                });
            });
        });
    }
    /**
     * Convert an Image
     * @param {string|Buffer} data Image path or Buffer
     * @param {ConvertOptions} args Params from imagemagick convert. Checkout: {@link https://imagemagick.org/script/convert.php}
     * @param {string} to_file
     * @return {Promise<Buffer>}
     */
    static convert(data, args = {}, to_file = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let format = '';
            let _arguments = ['-'];
            for (const p in args) {
                if (p.toLowerCase() === 'format') {
                    format = args.format || format;
                }
                else {
                    _arguments.push(`-${p}`);
                    // @ts-ignore
                    _arguments.push(args[p]);
                }
            }
            let buffer = (data instanceof Buffer) ? data : yield QIM.read_to_buffer(data);
            // _arguments.push(typeof data == 'string' ? data : '-');
            _arguments.push(format ? `${format}:-` : '-');
            return new Promise((resolve, reject) => {
                QIM._exec('convert', _arguments, buffer, 'binary')
                    .then((value) => __awaiter(this, void 0, void 0, function* () {
                    let buffer = Buffer.from(value, 'binary');
                    if (to_file)
                        fs_1.default.writeFile(to_file, buffer, err => {
                            reject(`Failed to write file to: '${to_file}'`);
                        });
                    resolve(buffer);
                }))
                    .catch(reason => {
                    reject(reason);
                });
            });
        });
    }
}
exports.QIM = QIM;
exports.qim = QIM;
