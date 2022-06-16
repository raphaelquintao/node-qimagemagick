import { spawn } from 'child_process';
import fs from 'fs';
import axios from 'axios';

export interface ConvertOptions {
    /** geometry     adaptively blur pixels; decrease effect near edges */
    'adaptive-blur'?: string,
    /** geometry   adaptively resize image with data dependent triangulation. */
    'adaptive-resize'?: string,
    /** geometry  adaptively sharpen pixels; increase effect near edges */
    'adaptive-sharpen'?: string,
    /** join images into a single multi-image file */
    'adjoin'?: string,
    /** matrix  affine transform matrix */
    'affine'?: string,
    /** on, activate, off, deactivate, set, opaque, copy", transparent, extract, background, or shape the alpha channel */
    'alpha'?: string,
    /** geometry text     annotate the image with text */
    'annotate'?: string,
    /** remove pixel-aliasing */
    'antialias'?: string,
    /** append an image sequence */
    'append'?: string,
    /** value     decipher image with this password */
    'authenticate'?: string,
    /** automagically adjust gamma level of image */
    'auto-gamma'?: string,
    /** automagically adjust color levels of image */
    'auto-level'?: string,
    /** automagically orient image */
    'auto-orient'?: string,
    /** method  automatically perform image thresholding */
    'auto-threshold'?: string,
    /** color   background color */
    'background'?: string,
    /** iterations   measure performance */
    'bench'?: string,
    /** value     add bias when convolving an image */
    'bias'?: string,
    /** geometry    non-linear, edge-preserving, and noise-reducing smoothing filter */
    'bilateral-blur'?: string,
    /** value  force all pixels below the threshold into black */
    'black-threshold'?: string,
    /** point     chromaticity blue primary point */
    'blue-primary'?: string,
    /** factor  simulate a scene at nighttime in the moonlight */
    'blue-shift'?: string,
    /** geometry  reduce image noise and reduce detail levels */
    'blur'?: string,
    /** geometry    surround image with a border of color */
    'border'?: string,
    /** color  border color */
    'bordercolor'?: string,
    /** geometry   improve brightness / contrast of the image */
    'brightness-contrast'?: string,
    /** geometry     use a multi-stage algorithm to detect a wide range of edges in the image */
    'canny'?: string,
    /** string     assign a caption to an image */
    'caption'?: string,
    /** filename   color correct with a color decision list */
    'cdl'?: string,
    /** type   apply option to select image channels */
    'channel'?: string,
    /** radius    simulate a charcoal drawing */
    'charcoal'?: string,
    /** geometry  remove pixels from the image interior */
    'chop'?: string,
    /** geometry     contrast limited adaptive histogram equalization */
    'clahe'?: string,
    /** set each pixel whose value is below zero to zero and any the pixel whose value is above the quantum range to the quantum range (e.g. 65535) otherwise the pixel value remains unchanged. */
    'clamp'?: string,
    /** clip along the first path from the 8BIM profile */
    'clip'?: string,
    /** filename     associate clip mask with the image */
    'clip-mask'?: string,
    /** id   clip along a named path from the 8BIM profile */
    'clip-path'?: string,
    /** index    clone an image */
    'clone'?: string,
    /** apply a color lookup table to the image */
    'clut'?: string,
    /** connectivity  connected-components uniquely labeled, choose from 4 or 8 way connectivity */
    'connected-components'?: string,
    /** geometry  improve the contrast in an image by `stretching' the range of intensity value */
    'contrast-stretch'?: string,
    /** merge a sequence of images */
    'coalesce'?: string,
    /** value     colorize the image with the fill color */
    'colorize'?: string,
    /** matrix    apply color correction to the image. */
    'color-matrix'?: string,
    /** value   preferred number of colors in the image */
    'colors'?: string,
    /** type    set image colorspace */
    'colorspace'?: string,
    /** start-color-stop-color     force all pixels in the color range to white otherwise black */
    'color-threshold'?: string,
    /** combine a sequence of images */
    'combine'?: string,
    /** string     annotate image with comment */
    'comment'?: string,
    /** compare image */
    'compare'?: string,
    /** perform complex mathematics on an image sequence */
    'complexoperator'?: string,
    /** operator   set image composite operator */
    'compose'?: string,
    /** composite image */
    'composite'?: string,
    /** type  image compression type */
    'compress'?: string,
    /** enhance or reduce the image contrast */
    'contrast'?: string,
    /** coefficients  apply a convolution kernel to the image */
    'convolve'?: string,
    /** geometry offset   copy pixels from one area of an image to another */
    'copy'?: string,
    /** geometry  crop the image */
    'crop'?: string,
    /** amount   cycle the image colormap */
    'cycle'?: string,
    /** filename  convert cipher pixels to plain */
    'decipher'?: string,
    /** events   display copious debugging information */
    'debug'?: string,
    /** format:option   define one or more image format options */
    'define'?: string,
    /** break down an image sequence into constituent parts */
    'deconstruct'?: string,
    /** centiseconds     display the next image after pausing */
    'delay'?: string,
    /** index   delete the image from the image sequence */
    'delete'?: string,
    /** geometry   horizontal and vertical density of the image */
    'density'?: string,
    /** value    image depth */
    'depth'?: string,
    /** reduce the speckles within an image */
    'despeckle'?: string,
    /** type     render text right-to-left or left-to-right */
    'direction'?: string,
    /** server     get image or font from this X server */
    'display'?: string,
    /** method     layer disposal method */
    'dispose'?: string,
    /** port  launch a distributed pixel cache server */
    'distribute-cache'?: string,
    /** type coefficients  distort image */
    'distort'?: string,
    /** method  apply error diffusion to image */
    'dither'?: string,
    /** string    annotate the image with a graphic primitive */
    'draw'?: string,
    /** count,indexes    duplicate an image one or more times */
    'duplicate'?: string,
    /** radius    apply a filter to detect edges in the image */
    'edge'?: string,
    /** radius  emboss an image */
    'emboss'?: string,
    /** filename  convert plain pixels to cipher pixels */
    'encipher'?: string,
    /** type  text encoding type */
    'encoding'?: string,
    /** type    endianness (MSB or LSB) of the image */
    'endian'?: string,
    /** apply a digital filter to enhance a noisy image */
    'enhance'?: string,
    /** perform histogram equalization to an image */
    'equalize'?: string,
    /** operator value    evaluate an arithmetic, relational, or logical expression */
    'evaluate'?: string,
    /** operator     evaluate an arithmetic, relational, or logical expression for an image sequence */
    'evaluate-sequence'?: string,
    /** geometry    set the image size */
    'extent'?: string,
    /** geometry   extract area from image */
    'extract'?: string,
    /** name    render text with this font family */
    'family'?: string,
    /** distance  analyze image features (e.g. contract, correlations, etc.). */
    'features'?: string,
    /** implements the discrete Fourier transform (DFT) */
    'fft'?: string,
    /** color     color to use when filling a graphic primitive */
    'fill'?: string,
    /** type    use this filter when resizing an image */
    'filter'?: string,
    /** flatten a sequence of images */
    'flatten'?: string,
    /** flip image in the vertical direction */
    'flip'?: string,
    /** geometry color   floodfill the image with color */
    'floodfill'?: string,
    /** flop image in the horizontal direction */
    'flop'?: string,
    /** name  render text with this font */
    'font'?: string,
    /** string  output formatted image characteristics */
    'format'?: string,
    /** geometry     surround image with an ornamental border */
    'frame'?: string,
    /** name  apply a function to the image */
    'function'?: string,
    /** distance  colors within this distance are considered equal */
    'fuzz'?: string,
    /** expression  apply mathematical expression to an image channel(s) */
    'fx'?: string,
    /** value    level of gamma correction */
    'gamma'?: string,
    /** geometry     reduce image noise and reduce detail levels */
    'gaussian-blur'?: string,
    /** geometry  preferred size or location of the image */
    'geometry'?: string,
    /** type   horizontal and vertical text placement */
    'gravity'?: string,
    /** method   convert image to grayscale */
    'grayscale'?: string,
    /** point    chromaticity green primary point */
    'green-primary'?: string,
    /** print program options */
    'help'?: string,
    /** geometry   identify lines in the image */
    'hough-lines'?: string,
    /** identify the format and characteristics of the image */
    'identify'?: string,
    /** implements the inverse discrete Fourier transform (DFT) */
    'ift'?: string,
    /** type    reference illuminant */
    'illuminant'?: string,
    /** amount     implode image pixels about the center */
    'implode'?: string,
    /** index   insert last image into the image sequence */
    'insert'?: string,
    /** Calculate the sum of values (pixel values) in the image */
    'integral'?: string,
    /** method   method to generate an intensity value from a pixel */
    'intensity'?: string,
    /** type    type of rendering intent when managing the image color */
    'intent'?: string,
    /** type     type of image interlacing scheme */
    'interlace'?: string,
    /** value    the space between two text lines */
    'interline-spacing'?: string,
    /** method     pixel color interpolation method */
    'interpolate'?: string,
    /** value    the space between two words */
    'interword-spacing'?: string,
    /** value  the space between two characters */
    'kerning'?: string,
    /** geometry    K means color reduction */
    'kmeans'?: string,
    /** geometry  edge preserving noise reduction filter */
    'kuwahara'?: string,
    /** string   assign a label to an image */
    'label'?: string,
    /** geometry   local adaptive thresholding */
    'lat'?: string,
    /** method  optimize or compare image layers */
    'layers'?: string,
    /** value    adjust the level of image contrast */
    'level'?: string,
    /** type value   pixel cache resource limit */
    'limit'?: string,
    /** geometry    linear with saturation histogram stretch */
    'linear-stretch'?: string,
    /** geometry    rescale image with seam-carving */
    'liquid-rescale'?: string,
    /** type  Color, Configure, Delegate, Format, Magic, Module, Resource, or Type */
    'list'?: string,
    /** format     format of debugging information */
    'log'?: string,
    /** iterations    add Netscape loop extension to your GIF animation */
    'loop'?: string,
    /** color   frame color */
    'mattecolor'?: string,
    /** radius  apply a median filter to the image */
    'median'?: string,
    /** geometry    delineate arbitrarily shaped clusters in the image */
    'mean-shift'?: string,
    /** type    measure differences between images with this metric */
    'metric'?: string,
    /** radius    make each pixel the 'predominant color' of the neighborhood */
    'mode'?: string,
    /** value     vary the brightness, saturation, and hue */
    'modulate'?: string,
    /** display image moments. */
    'moments'?: string,
    /** monitor progress */
    'monitor'?: string,
    /** transform image to black and white */
    'monochrome'?: string,
    /** value    morph an image sequence */
    'morph'?: string,
    /** method kernel   apply a morphology method to the image */
    'morphology'?: string,
    /** geometry   simulate motion blur */
    'motion-blur'?: string,
    /** replace each pixel with its complementary color */
    'negate'?: string,
    /** radius   add or reduce noise in an image */
    'noise'?: string,
    /** transform image to span the full range of colors */
    'normalize'?: string,
    /** color   change this color to the fill color */
    'opaque'?: string,
    /** NxN     ordered dither the image */
    'ordered-dither'?: string,
    /** type    image orientation */
    'orient'?: string,
    /** geometry  size and location of an image canvas (setting) */
    'page'?: string,
    /** radius   simulate an oil painting */
    'paint'?: string,
    /** set each pixel whose value is less than |epsilon| to -epsilon or epsilon (whichever is closer) otherwise the pixel value remains unchanged. */
    'perceptible'?: string,
    /** efficiently determine image attributes */
    'ping'?: string,
    /** value    font point size */
    'pointsize'?: string,
    /** angle     simulate a Polaroid picture */
    'polaroid'?: string,
    /** terms     build a polynomial from the image sequence and the corresponding terms (coefficients and degree pairs). */
    'poly'?: string,
    /** levels   reduce the image to a limited number of color levels */
    'posterize'?: string,
    /** value    set the maximum number of significant digits to be printed */
    'precision'?: string,
    /** type   image preview type */
    'preview'?: string,
    /** string   interpret string and print to console */
    'print'?: string,
    /** image-filter   process the image with a custom image filter */
    'process'?: string,
    /** filename   add, delete, or apply an image profile */
    'profile'?: string,
    /** value  JPEG/MIFF/PNG compression level */
    'quality'?: string,
    /** colorspace    reduce image colors in this colorspace */
    'quantize'?: string,
    /** suppress all warning messages */
    'quiet'?: string,
    /** angle  radial blur the image */
    'radial-blur'?: string,
    /** value    lighten/darken image edges to create a 3-D effect */
    'raise'?: string,
    /** low, high     random threshold the image */
    'random-threshold'?: string,
    /** low-black, low-white, high-white, high-black   perform either hard or soft thresholding within some range of values in an image */
    'range-threshold'?: string,
    /** filename     associate a read mask with the image */
    'read-mask'?: string,
    /** point  chromaticity red primary point */
    'red-primary'?: string,
    /** pay attention to warning messages. */
    'regard-warnings'?: string,
    /** geometry    apply options to a portion of the image */
    'region'?: string,
    /** filename     transform image colors to match this set of colors */
    'remap'?: string,
    /** render vector graphics */
    'render'?: string,
    /** geometry    size and location of an image canvas */
    'repage'?: string,
    /** geometry  change the resolution of an image */
    'resample'?: string,
    /** geometry    resize the image */
    'resize'?: string,
    /** settings remain in effect until parenthesis boundary. */
    'respect-parentheses'?: string,
    /** geometry  roll an image vertically or horizontally */
    'roll'?: string,
    /** degrees     apply Paeth rotation to the image */
    'rotate'?: string,
    /** geometry    scale image with pixel sampling */
    'sample'?: string,
    /** geometry   horizontal and vertical sampling factor */
    'sampling-factor'?: string,
    /** geometry     scale the image */
    'scale'?: string,
    /** value    image scene number */
    'scene'?: string,
    /** value     seed a new sequence of pseudo-random numbers */
    'seed'?: string,
    /** values     segment an image */
    'segment'?: string,
    /** geometry    selectively blur pixels within a contrast threshold */
    'selective-blur'?: string,
    /** separate an image channel into a grayscale image */
    'separate'?: string,
    /** threshold   simulate a sepia-toned photo */
    'sepia-tone'?: string,
    /** attribute value    set an image attribute */
    'set'?: string,
    /** degrees  shade the image using a distant light source */
    'shade'?: string,
    /** geometry    simulate an image shadow */
    'shadow'?: string,
    /** geometry   sharpen the image */
    'sharpen'?: string,
    /** geometry     shave pixels from the image edges */
    'shave'?: string,
    /** geometry     slide one edge of the image along the X or Y axis */
    'shear'?: string,
    /** geometry    increase the contrast without saturating highlights or shadows */
    'sigmoidal-contrast'?: string,
    /** offset   smush an image sequence together */
    'smush'?: string,
    /** geometry  width and height of image */
    'size'?: string,
    /** geometry    simulate a pencil sketch */
    'sketch'?: string,
    /** threshold     negate all pixels above the threshold level */
    'solarize'?: string,
    /** sorts pixels within each scanline in ascending order of intensity */
    'sort-pixels'?: string,
    /** geometry    splice the background color into the image */
    'splice'?: string,
    /** radius  displace image pixels by a random amount */
    'spread'?: string,
    /** type geometry    replace each pixel with corresponding statistic from the neighborhood */
    'statistic'?: string,
    /** strip image of all profiles and comments */
    'strip'?: string,
    /** color   graphic primitive stroke color */
    'stroke'?: string,
    /** value  graphic primitive stroke width */
    'strokewidth'?: string,
    /** type   render text with this font stretch */
    'stretch'?: string,
    /** type     render text with this font style */
    'style'?: string,
    /** indexes   swap two images in the image sequence */
    'swap'?: string,
    /** degrees  swirl image pixels about the center */
    'swirl'?: string,
    /** synchronize image to storage device */
    'synchronize'?: string,
    /** mark the image as modified */
    'taint'?: string,
    /** filename   name of texture to tile onto the image background */
    'texture'?: string,
    /** value    threshold the image */
    'threshold'?: string,
    /** geometry     create a thumbnail of the image */
    'thumbnail'?: string,
    /** filename  tile image when filling a graphic primitive */
    'tile'?: string,
    /** geometry   set the image tile offset */
    'tile-offset'?: string,
    /** value     tint the image with the fill color */
    'tint'?: string,
    /** affine transform image */
    'transform'?: string,
    /** color  make this color transparent within the image */
    'transparent'?: string,
    /** color    transparent color */
    'transparent-color'?: string,
    /** flip image in the vertical direction and rotate 90 degrees */
    'transpose'?: string,
    /** flop image in the horizontal direction and rotate 270 degrees */
    'transverse'?: string,
    /** value    color tree depth */
    'treedepth'?: string,
    /** trim image edges */
    'trim'?: string,
    /** type  image type */
    'type'?: string,
    /** color   annotation bounding box color */
    'undercolor'?: string,
    /** discard all but one of any pixel color. */
    'unique-colors'?: string,
    /** type     the units of image resolution */
    'units'?: string,
    /** geometry   sharpen the image */
    'unsharp'?: string,
    /** print detailed information about the image */
    'verbose'?: string,
    /** print version information */
    'version'?: string,
    /** FlashPix viewing transforms */
    'view'?: string,
    /** geometry  soften the edges of the image in vignette style */
    'vignette'?: string,
    /** method   access method for pixels outside the boundaries of the image */
    'virtual-pixel'?: string,
    /** geometry  alter an image along a sine wave */
    'wave'?: string,
    /** threshold  removes noise from the image using a wavelet transform */
    'wavelet-denoise'?: string,
    /** type    render text with this font weight */
    'weight'?: string,
    /** point  chromaticity white point */
    'white-point'?: string,
    /** value  force all pixels above the threshold into white */
    'white-threshold'?: string,
    /** filename     write images to this file */
    'write'?: string,
    /** filename    associate a write mask with the image */
    'write-mask'?: string,
}

class Info {
    width: number;
    height: number;
    page_width?: number;
    page_height?: number;
    format: string;
    depth: string;
    colorspace: string;
    size: string;

    constructor(groups: any, file_size_in_bytes: number) {
        this.width = parseInt(groups?.page_width) || 0;
        this.height = parseInt(groups?.page_height) || 0;
        // this.page_width = parseInt(groups?.page_width) || 0;
        // this.page_height = parseInt(groups?.page_height) || 0;
        this.format = groups?.format;
        this.depth = groups?.depth;
        this.colorspace = groups?.colorspace;
        this.size = this.human_filesize(file_size_in_bytes);
    }

    human_filesize(bytes: number) {
        let hsz = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
        let factor = Math.floor((String(bytes).length - 1) / 3);
        return (bytes / Math.pow(1024, factor)).toFixed(4) + hsz[factor];
    }

    toString() {
        return JSON.stringify(this);
    }
}

export class QIM {
    /**
     * @param {string} cmd
     * @param {*[]|IArguments} args
     * @param {string | Buffer} src
     * @param {BufferEncoding} output_encoding
     * @return {Promise<String>}
     */
    private static _exec(cmd: string, args: string[] = [], src: string | Buffer, output_encoding = 'utf8' as BufferEncoding): Promise<String> {
        const child = spawn(cmd, args, {shell: true});

        child.stdout.setEncoding(output_encoding);

        let out: any = undefined;

        // console.log(args);

        return new Promise((resolve, reject) => {
            child.stdin.on('error', (err) => {
                reject(err);
            });

            child.stderr.on('data', (data) => {
                // console.log('stderr error');
                reject(data);
            });
            child.stdout.on('data', (data) => {
                if (out) out += data;
                else out = data;
            });
            child.stdout.on('end', () => {
                // console.log('end');
                resolve(out);
            });
            child.on('close', () => {
                // console.log('close', message);
                resolve(out);
            });

            if (src instanceof Buffer) child.stdin?.write(src);
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
    public static read_to_buffer(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            if (path.startsWith('http')) {
                axios.get(path, {responseType: 'arraybuffer'}).then(value => {
                    resolve(value.data);
                }).catch(reason => {
                    reject(reason.toString());
                });
            } else {
                fs.readFile(path, (err, data) => {
                    if (err) reject(err);
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
    static async identify(data: string | Buffer): Promise<Info> {
        const regex = /^\S+\s(?<format>\S+)\s(?<width>\d+)x(?<height>\d+)\s(?<page_width>\d+)x(?<page_height>\d+)\+(?<x_offset>\d+)\+(?<y_offset>\d+)\s(?<depth>\S+)\s(?<colorspace>\S+)/;
        let args: string[] = ['-'];

        let buffer = (data instanceof Buffer) ? data : await QIM.read_to_buffer(data);

        return new Promise((resolve, reject) => {
            QIM._exec('identify', args, buffer)
                .then(value => {
                    let groups = value.match(regex)?.groups;
                    resolve(new Info(groups, buffer.length));
                })
                .catch(reason => {
                    reject(reason);
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
    static async convert(data: string | Buffer, args: ConvertOptions = {} as ConvertOptions, to_file = ''): Promise<Buffer> {
        let format = '';
        let _arguments: string[] = ['-'];

        for (const p in args) {
            if (p.toLowerCase() === 'format') {
                format = args.format || format;
            } else {
                _arguments.push(`-${p}`);
                // @ts-ignore
                _arguments.push(args[p]);
            }
        }

        let buffer = (data instanceof Buffer) ? data : await QIM.read_to_buffer(data);

        // _arguments.push(typeof data == 'string' ? data : '-');

        _arguments.push(format ? `${format}:-` : '-');


        return new Promise((resolve, reject) => {
            QIM._exec('convert', _arguments, buffer, 'binary')
                .then(async value => {
                    let buffer = Buffer.from(value, 'binary');
                    if (to_file) fs.writeFile(to_file, buffer, () => {
                        reject(`Failed to write file to: '${to_file}'`);
                    });
                    resolve(buffer);
                })
                .catch(reason => {
                    reject(reason);
                });

        });
    }
}

export const qim = QIM;
