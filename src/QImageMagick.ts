import { spawn } from 'child_process';
import fs from 'fs';
import axios from 'axios';

export interface ConvertOptions {
    /** adaptively blur pixels; decrease effect near edges
     * {@link http://www.imagemagick.org/script/command-line-options.php#adaptive-blur} */
    'adaptive-blur'?: string,
    /** adaptively resize image with data dependent triangulation.
     * {@link http://www.imagemagick.org/script/command-line-options.php#adaptive-resize} */
    'adaptive-resize'?: string,
    /** adaptively sharpen pixels; increase effect near edges
     * {@link http://www.imagemagick.org/script/command-line-options.php#adaptive-sharpen} */
    'adaptive-sharpen'?: string,
    /** join images into a single multi-image file
     * {@link http://www.imagemagick.org/script/command-line-options.php#adjoin} */
    'adjoin'?: string,
    /** affine transform matrix
     * {@link http://www.imagemagick.org/script/command-line-options.php#affine} */
    'affine'?: string,
    /** on, activate, off, deactivate, set, opaque, copy", transparent, extract, background, or shape the alpha channel
     * {@link http://www.imagemagick.org/script/command-line-options.php#alpha} */
    'alpha'?: string,
    /** geometry text     annotate the image with text
     * {@link http://www.imagemagick.org/script/command-line-options.php#annotate} */
    'annotate'?: string,
    /** remove pixel-aliasing
     * {@link http://www.imagemagick.org/script/command-line-options.php#antialias} */
    'antialias'?: string,
    /** append an image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#append} */
    'append'?: string,
    /** value     decipher image with this password
     * {@link http://www.imagemagick.org/script/command-line-options.php#authenticate} */
    'authenticate'?: string,
    /** automagically adjust gamma level of image
     * {@link http://www.imagemagick.org/script/command-line-options.php#auto-gamma} */
    'auto-gamma'?: string,
    /** automagically adjust color levels of image
     * {@link http://www.imagemagick.org/script/command-line-options.php#auto-level} */
    'auto-level'?: string,
    /** automagically orient image
     * {@link http://www.imagemagick.org/script/command-line-options.php#auto-orient} */
    'auto-orient'?: string,
    /** method  automatically perform image thresholding
     * {@link http://www.imagemagick.org/script/command-line-options.php#auto-threshold} */
    'auto-threshold'?: string,
    /** color   background color
     * {@link http://www.imagemagick.org/script/command-line-options.php#background} */
    'background'?: string,
    /** iterations   measure performance
     * {@link http://www.imagemagick.org/script/command-line-options.php#bench} */
    'bench'?: string,
    /** value     add bias when convolving an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#bias} */
    'bias'?: string,
    /** geometry    non-linear, edge-preserving, and noise-reducing smoothing filter
     * {@link http://www.imagemagick.org/script/command-line-options.php#bilateral-blur} */
    'bilateral-blur'?: string,
    /** value  force all pixels below the threshold into black
     * {@link http://www.imagemagick.org/script/command-line-options.php#black-threshold} */
    'black-threshold'?: string,
    /** point     chromaticity blue primary point
     * {@link http://www.imagemagick.org/script/command-line-options.php#blue-primary} */
    'blue-primary'?: string,
    /** factor  simulate a scene at nighttime in the moonlight
     * {@link http://www.imagemagick.org/script/command-line-options.php#blue-shift} */
    'blue-shift'?: string,
    /** geometry  reduce image noise and reduce detail levels
     * {@link http://www.imagemagick.org/script/command-line-options.php#blur} */
    'blur'?: string,
    /** geometry    surround image with a border of color
     * {@link http://www.imagemagick.org/script/command-line-options.php#border} */
    'border'?: string,
    /** color  border color
     * {@link http://www.imagemagick.org/script/command-line-options.php#bordercolor} */
    'bordercolor'?: string,
    /** geometry   improve brightness / contrast of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#brightness-contrast} */
    'brightness-contrast'?: string,
    /** geometry     use a multi-stage algorithm to detect a wide range of edges in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#canny} */
    'canny'?: string,
    /** string     assign a caption to an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#caption} */
    'caption'?: string,
    /** filename   color correct with a color decision list
     * {@link http://www.imagemagick.org/script/command-line-options.php#cdl} */
    'cdl'?: string,
    /** type   apply option to select image channels
     * {@link http://www.imagemagick.org/script/command-line-options.php#channel} */
    'channel'?: string,
    /** radius    simulate a charcoal drawing
     * {@link http://www.imagemagick.org/script/command-line-options.php#charcoal} */
    'charcoal'?: string,
    /** geometry  remove pixels from the image interior
     * {@link http://www.imagemagick.org/script/command-line-options.php#chop} */
    'chop'?: string,
    /** geometry     contrast limited adaptive histogram equalization
     * {@link http://www.imagemagick.org/script/command-line-options.php#clahe} */
    'clahe'?: string,
    /** set each pixel whose value is below zero to zero and any the pixel whose value is above the quantum range to the quantum range (e.g. 65535) otherwise the pixel value remains unchanged.
     * {@link http://www.imagemagick.org/script/command-line-options.php#clamp} */
    'clamp'?: string,
    /** clip along the first path from the 8BIM profile
     * {@link http://www.imagemagick.org/script/command-line-options.php#clip} */
    'clip'?: string,
    /** filename     associate clip mask with the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#clip-mask} */
    'clip-mask'?: string,
    /** id   clip along a named path from the 8BIM profile
     * {@link http://www.imagemagick.org/script/command-line-options.php#clip-path} */
    'clip-path'?: string,
    /** index    clone an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#clone} */
    'clone'?: string,
    /** apply a color lookup table to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#clut} */
    'clut'?: string,
    /** connectivity  connected-components uniquely labeled, choose from 4 or 8 way connectivity
     * {@link http://www.imagemagick.org/script/command-line-options.php#connected-components} */
    'connected-components'?: string,
    /** geometry  improve the contrast in an image by `stretching' the range of intensity value
     * {@link http://www.imagemagick.org/script/command-line-options.php#contrast-stretch} */
    'contrast-stretch'?: string,
    /** merge a sequence of images
     * {@link http://www.imagemagick.org/script/command-line-options.php#coalesce} */
    'coalesce'?: string,
    /** value     colorize the image with the fill color
     * {@link http://www.imagemagick.org/script/command-line-options.php#colorize} */
    'colorize'?: string,
    /** matrix    apply color correction to the image.
     * {@link http://www.imagemagick.org/script/command-line-options.php#color-matrix} */
    'color-matrix'?: string,
    /** value   preferred number of colors in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#colors} */
    'colors'?: string,
    /** type    set image colorspace
     * {@link http://www.imagemagick.org/script/command-line-options.php#colorspace} */
    'colorspace'?: string,
    /** start-color-stop-color     force all pixels in the color range to white otherwise black
     * {@link http://www.imagemagick.org/script/command-line-options.php#color-threshold} */
    'color-threshold'?: string,
    /** combine a sequence of images
     * {@link http://www.imagemagick.org/script/command-line-options.php#combine} */
    'combine'?: string,
    /** string     annotate image with comment
     * {@link http://www.imagemagick.org/script/command-line-options.php#comment} */
    'comment'?: string,
    /** compare image
     * {@link http://www.imagemagick.org/script/command-line-options.php#compare} */
    'compare'?: string,
    /** perform complex mathematics on an image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#complexoperator} */
    'complexoperator'?: string,
    /** operator   set image composite operator
     * {@link http://www.imagemagick.org/script/command-line-options.php#compose} */
    'compose'?: string,
    /** composite image
     * {@link http://www.imagemagick.org/script/command-line-options.php#composite} */
    'composite'?: string,
    /** type  image compression type
     * {@link http://www.imagemagick.org/script/command-line-options.php#compress} */
    'compress'?: string,
    /** enhance or reduce the image contrast
     * {@link http://www.imagemagick.org/script/command-line-options.php#contrast} */
    'contrast'?: string,
    /** coefficients  apply a convolution kernel to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#convolve} */
    'convolve'?: string,
    /** geometry offset   copy pixels from one area of an image to another
     * {@link http://www.imagemagick.org/script/command-line-options.php#copy} */
    'copy'?: string,
    /** geometry  crop the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#crop} */
    'crop'?: string,
    /** amount   cycle the image colormap
     * {@link http://www.imagemagick.org/script/command-line-options.php#cycle} */
    'cycle'?: string,
    /** filename  convert cipher pixels to plain
     * {@link http://www.imagemagick.org/script/command-line-options.php#decipher} */
    'decipher'?: string,
    /** events   display copious debugging information
     * {@link http://www.imagemagick.org/script/command-line-options.php#debug} */
    'debug'?: string,
    /** format:option   define one or more image format options
     * {@link http://www.imagemagick.org/script/command-line-options.php#define} */
    'define'?: string,
    /** break down an image sequence into constituent parts
     * {@link http://www.imagemagick.org/script/command-line-options.php#deconstruct} */
    'deconstruct'?: string,
    /** centiseconds     display the next image after pausing
     * {@link http://www.imagemagick.org/script/command-line-options.php#delay} */
    'delay'?: string,
    /** index   delete the image from the image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#delete} */
    'delete'?: string,
    /** geometry   horizontal and vertical density of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#density} */
    'density'?: string,
    /** value    image depth
     * {@link http://www.imagemagick.org/script/command-line-options.php#depth} */
    'depth'?: string,
    /** reduce the speckles within an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#despeckle} */
    'despeckle'?: string,
    /** type     render text right-to-left or left-to-right
     * {@link http://www.imagemagick.org/script/command-line-options.php#direction} */
    'direction'?: string,
    /** server     get image or font from this X server
     * {@link http://www.imagemagick.org/script/command-line-options.php#display} */
    'display'?: string,
    /** method     layer disposal method
     * {@link http://www.imagemagick.org/script/command-line-options.php#dispose} */
    'dispose'?: string,
    /** port  launch a distributed pixel cache server
     * {@link http://www.imagemagick.org/script/command-line-options.php#distribute-cache} */
    'distribute-cache'?: string,
    /** type coefficients  distort image
     * {@link http://www.imagemagick.org/script/command-line-options.php#distort} */
    'distort'?: string,
    /** method  apply error diffusion to image
     * {@link http://www.imagemagick.org/script/command-line-options.php#dither} */
    'dither'?: string,
    /** string    annotate the image with a graphic primitive
     * {@link http://www.imagemagick.org/script/command-line-options.php#draw} */
    'draw'?: string,
    /** count,indexes    duplicate an image one or more times
     * {@link http://www.imagemagick.org/script/command-line-options.php#duplicate} */
    'duplicate'?: string,
    /** radius    apply a filter to detect edges in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#edge} */
    'edge'?: string,
    /** radius  emboss an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#emboss} */
    'emboss'?: string,
    /** filename  convert plain pixels to cipher pixels
     * {@link http://www.imagemagick.org/script/command-line-options.php#encipher} */
    'encipher'?: string,
    /** type  text encoding type
     * {@link http://www.imagemagick.org/script/command-line-options.php#encoding} */
    'encoding'?: string,
    /** type    endianness (MSB or LSB) of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#endian} */
    'endian'?: string,
    /** apply a digital filter to enhance a noisy image
     * {@link http://www.imagemagick.org/script/command-line-options.php#enhance} */
    'enhance'?: string,
    /** perform histogram equalization to an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#equalize} */
    'equalize'?: string,
    /** operator value    evaluate an arithmetic, relational, or logical expression
     * {@link http://www.imagemagick.org/script/command-line-options.php#evaluate} */
    'evaluate'?: string,
    /** operator     evaluate an arithmetic, relational, or logical expression for an image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#evaluate-sequence} */
    'evaluate-sequence'?: string,
    /** geometry    set the image size
     * {@link http://www.imagemagick.org/script/command-line-options.php#extent} */
    'extent'?: string,
    /** geometry   extract area from image
     * {@link http://www.imagemagick.org/script/command-line-options.php#extract} */
    'extract'?: string,
    /** name    render text with this font family
     * {@link http://www.imagemagick.org/script/command-line-options.php#family} */
    'family'?: string,
    /** distance  analyze image features (e.g. contract, correlations, etc.).
     * {@link http://www.imagemagick.org/script/command-line-options.php#features} */
    'features'?: string,
    /** implements the discrete Fourier transform (DFT)
     * {@link http://www.imagemagick.org/script/command-line-options.php#fft} */
    'fft'?: string,
    /** color     color to use when filling a graphic primitive
     * {@link http://www.imagemagick.org/script/command-line-options.php#fill} */
    'fill'?: string,
    /** type    use this filter when resizing an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#filter} */
    'filter'?: string,
    /** flatten a sequence of images
     * {@link http://www.imagemagick.org/script/command-line-options.php#flatten} */
    'flatten'?: string,
    /** flip image in the vertical direction
     * {@link http://www.imagemagick.org/script/command-line-options.php#flip} */
    'flip'?: string,
    /** geometry color   floodfill the image with color
     * {@link http://www.imagemagick.org/script/command-line-options.php#floodfill} */
    'floodfill'?: string,
    /** flop image in the horizontal direction
     * {@link http://www.imagemagick.org/script/command-line-options.php#flop} */
    'flop'?: string,
    /** name  render text with this font
     * {@link http://www.imagemagick.org/script/command-line-options.php#font} */
    'font'?: string,
    /** string  output formatted image characteristics
     * {@link http://www.imagemagick.org/script/command-line-options.php#format} */
    'format'?: string,
    /** geometry     surround image with an ornamental border
     * {@link http://www.imagemagick.org/script/command-line-options.php#frame} */
    'frame'?: string,
    /** name  apply a function to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#function} */
    'function'?: string,
    /** distance  colors within this distance are considered equal
     * {@link http://www.imagemagick.org/script/command-line-options.php#fuzz} */
    'fuzz'?: string,
    /** expression  apply mathematical expression to an image channel(s)
     * {@link http://www.imagemagick.org/script/command-line-options.php#fx} */
    'fx'?: string,
    /** value    level of gamma correction
     * {@link http://www.imagemagick.org/script/command-line-options.php#gamma} */
    'gamma'?: string,
    /** geometry     reduce image noise and reduce detail levels
     * {@link http://www.imagemagick.org/script/command-line-options.php#gaussian-blur} */
    'gaussian-blur'?: string,
    /** geometry  preferred size or location of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#geometry} */
    'geometry'?: string,
    /** horizontal and vertical text placement
     * {@link http://www.imagemagick.org/script/command-line-options.php#gravity'?: 'NorthWest' | 'North'| 'NorthEast' | 'West' | 'Center' | 'East' | 'SouthWest' | 'South' | 'SouthEast} */
    'gravity'?: 'NorthWest' | 'North' | 'NorthEast' | 'West' | 'Center' | 'East' | 'SouthWest' | 'South' | 'SouthEast',
    /** method   convert image to grayscale
     * {@link http://www.imagemagick.org/script/command-line-options.php#grayscale} */
    'grayscale'?: string,
    /** point    chromaticity green primary point
     * {@link http://www.imagemagick.org/script/command-line-options.php#green-primary} */
    'green-primary'?: string,
    /** print program options
     * {@link http://www.imagemagick.org/script/command-line-options.php#help} */
    'help'?: string,
    /** geometry   identify lines in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#hough-lines} */
    'hough-lines'?: string,
    /** identify the format and characteristics of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#identify} */
    'identify'?: string,
    /** implements the inverse discrete Fourier transform (DFT)
     * {@link http://www.imagemagick.org/script/command-line-options.php#ift} */
    'ift'?: string,
    /** type    reference illuminant
     * {@link http://www.imagemagick.org/script/command-line-options.php#illuminant} */
    'illuminant'?: string,
    /** amount     implode image pixels about the center
     * {@link http://www.imagemagick.org/script/command-line-options.php#implode} */
    'implode'?: string,
    /** index   insert last image into the image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#insert} */
    'insert'?: string,
    /** Calculate the sum of values (pixel values) in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#integral} */
    'integral'?: string,
    /** method   method to generate an intensity value from a pixel
     * {@link http://www.imagemagick.org/script/command-line-options.php#intensity} */
    'intensity'?: string,
    /** type    type of rendering intent when managing the image color
     * {@link http://www.imagemagick.org/script/command-line-options.php#intent} */
    'intent'?: string,
    /** type     type of image interlacing scheme
     * {@link http://www.imagemagick.org/script/command-line-options.php#interlace} */
    'interlace'?: string,
    /** value    the space between two text lines
     * {@link http://www.imagemagick.org/script/command-line-options.php#interline-spacing} */
    'interline-spacing'?: string,
    /** method     pixel color interpolation method
     * {@link http://www.imagemagick.org/script/command-line-options.php#interpolate} */
    'interpolate'?: string,
    /** value    the space between two words
     * {@link http://www.imagemagick.org/script/command-line-options.php#interword-spacing} */
    'interword-spacing'?: string,
    /** value  the space between two characters
     * {@link http://www.imagemagick.org/script/command-line-options.php#kerning} */
    'kerning'?: string,
    /** geometry    K means color reduction
     * {@link http://www.imagemagick.org/script/command-line-options.php#kmeans} */
    'kmeans'?: string,
    /** geometry  edge preserving noise reduction filter
     * {@link http://www.imagemagick.org/script/command-line-options.php#kuwahara} */
    'kuwahara'?: string,
    /** string   assign a label to an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#label} */
    'label'?: string,
    /** geometry   local adaptive thresholding
     * {@link http://www.imagemagick.org/script/command-line-options.php#lat} */
    'lat'?: string,
    /** method  optimize or compare image layers
     * {@link http://www.imagemagick.org/script/command-line-options.php#layers} */
    'layers'?: string,
    /** value    adjust the level of image contrast
     * {@link http://www.imagemagick.org/script/command-line-options.php#level} */
    'level'?: string,
    /** type value   pixel cache resource limit
     * {@link http://www.imagemagick.org/script/command-line-options.php#limit} */
    'limit'?: string,
    /** geometry    linear with saturation histogram stretch
     * {@link http://www.imagemagick.org/script/command-line-options.php#linear-stretch} */
    'linear-stretch'?: string,
    /** geometry    rescale image with seam-carving
     * {@link http://www.imagemagick.org/script/command-line-options.php#liquid-rescale} */
    'liquid-rescale'?: string,
    /** type  Color, Configure, Delegate, Format, Magic, Module, Resource, or Type
     * {@link http://www.imagemagick.org/script/command-line-options.php#list} */
    'list'?: string,
    /** format     format of debugging information
     * {@link http://www.imagemagick.org/script/command-line-options.php#log} */
    'log'?: string,
    /** iterations    add Netscape loop extension to your GIF animation
     * {@link http://www.imagemagick.org/script/command-line-options.php#loop} */
    'loop'?: string,
    /** color   frame color
     * {@link http://www.imagemagick.org/script/command-line-options.php#mattecolor} */
    'mattecolor'?: string,
    /** radius  apply a median filter to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#median} */
    'median'?: string,
    /** geometry    delineate arbitrarily shaped clusters in the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#mean-shift} */
    'mean-shift'?: string,
    /** type    measure differences between images with this metric
     * {@link http://www.imagemagick.org/script/command-line-options.php#metric} */
    'metric'?: string,
    /** radius    make each pixel the 'predominant color' of the neighborhood
     * {@link http://www.imagemagick.org/script/command-line-options.php#mode} */
    'mode'?: string,
    /** value     vary the brightness, saturation, and hue
     * {@link http://www.imagemagick.org/script/command-line-options.php#modulate} */
    'modulate'?: string,
    /** display image moments.
     * {@link http://www.imagemagick.org/script/command-line-options.php#moments} */
    'moments'?: string,
    /** monitor progress
     * {@link http://www.imagemagick.org/script/command-line-options.php#monitor} */
    'monitor'?: string,
    /** transform image to black and white
     * {@link http://www.imagemagick.org/script/command-line-options.php#monochrome} */
    'monochrome'?: string,
    /** value    morph an image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#morph} */
    'morph'?: string,
    /** method kernel   apply a morphology method to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#morphology} */
    'morphology'?: string,
    /** geometry   simulate motion blur
     * {@link http://www.imagemagick.org/script/command-line-options.php#motion-blur} */
    'motion-blur'?: string,
    /** replace each pixel with its complementary color
     * {@link http://www.imagemagick.org/script/command-line-options.php#negate} */
    'negate'?: string,
    /** radius   add or reduce noise in an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#noise} */
    'noise'?: string,
    /** transform image to span the full range of colors
     * {@link http://www.imagemagick.org/script/command-line-options.php#normalize} */
    'normalize'?: string,
    /** color   change this color to the fill color
     * {@link http://www.imagemagick.org/script/command-line-options.php#opaque} */
    'opaque'?: string,
    /** NxN     ordered dither the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#ordered-dither} */
    'ordered-dither'?: string,
    /** type    image orientation
     * {@link http://www.imagemagick.org/script/command-line-options.php#orient} */
    'orient'?: string,
    /** geometry  size and location of an image canvas (setting)
     * {@link http://www.imagemagick.org/script/command-line-options.php#page} */
    'page'?: string,
    /** radius   simulate an oil painting
     * {@link http://www.imagemagick.org/script/command-line-options.php#paint} */
    'paint'?: string,
    /** set each pixel whose value is less than |epsilon| to -epsilon or epsilon (whichever is closer) otherwise the pixel value remains unchanged.
     * {@link http://www.imagemagick.org/script/command-line-options.php#perceptible} */
    'perceptible'?: string,
    /** efficiently determine image attributes
     * {@link http://www.imagemagick.org/script/command-line-options.php#ping} */
    'ping'?: string,
    /** value    font point size
     * {@link http://www.imagemagick.org/script/command-line-options.php#pointsize} */
    'pointsize'?: string,
    /** angle     simulate a Polaroid picture
     * {@link http://www.imagemagick.org/script/command-line-options.php#polaroid} */
    'polaroid'?: string,
    /** terms     build a polynomial from the image sequence and the corresponding terms (coefficients and degree pairs).
     * {@link http://www.imagemagick.org/script/command-line-options.php#poly} */
    'poly'?: string,
    /** levels   reduce the image to a limited number of color levels
     * {@link http://www.imagemagick.org/script/command-line-options.php#posterize} */
    'posterize'?: string,
    /** value    set the maximum number of significant digits to be printed
     * {@link http://www.imagemagick.org/script/command-line-options.php#precision} */
    'precision'?: string,
    /** type   image preview type
     * {@link http://www.imagemagick.org/script/command-line-options.php#preview} */
    'preview'?: string,
    /** string   interpret string and print to console
     * {@link http://www.imagemagick.org/script/command-line-options.php#print} */
    'print'?: string,
    /** image-filter   process the image with a custom image filter
     * {@link http://www.imagemagick.org/script/command-line-options.php#process} */
    'process'?: string,
    /** filename   add, delete, or apply an image profile
     * {@link http://www.imagemagick.org/script/command-line-options.php#profile} */
    'profile'?: string,
    /** value  JPEG/MIFF/PNG compression level
     * {@link http://www.imagemagick.org/script/command-line-options.php#quality} */
    'quality'?: string,
    /** colorspace    reduce image colors in this colorspace
     * {@link http://www.imagemagick.org/script/command-line-options.php#quantize} */
    'quantize'?: string,
    /** suppress all warning messages
     * {@link http://www.imagemagick.org/script/command-line-options.php#quiet} */
    'quiet'?: string,
    /** angle  radial blur the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#radial-blur} */
    'radial-blur'?: string,
    /** value    lighten/darken image edges to create a 3-D effect
     * {@link http://www.imagemagick.org/script/command-line-options.php#raise} */
    'raise'?: string,
    /** low, high     random threshold the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#random-threshold} */
    'random-threshold'?: string,
    /** low-black, low-white, high-white, high-black   perform either hard or soft thresholding within some range of values in an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#range-threshold} */
    'range-threshold'?: string,
    /** filename     associate a read mask with the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#read-mask} */
    'read-mask'?: string,
    /** point  chromaticity red primary point
     * {@link http://www.imagemagick.org/script/command-line-options.php#red-primary} */
    'red-primary'?: string,
    /** pay attention to warning messages.
     * {@link http://www.imagemagick.org/script/command-line-options.php#regard-warnings} */
    'regard-warnings'?: string,
    /** geometry    apply options to a portion of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#region} */
    'region'?: string,
    /** filename     transform image colors to match this set of colors
     * {@link http://www.imagemagick.org/script/command-line-options.php#remap} */
    'remap'?: string,
    /** render vector graphics
     * {@link http://www.imagemagick.org/script/command-line-options.php#render} */
    'render'?: string,
    /** geometry    size and location of an image canvas
     * {@link http://www.imagemagick.org/script/command-line-options.php#repage} */
    'repage'?: string,
    /** geometry  change the resolution of an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#resample} */
    'resample'?: string,
    /** geometry    resize the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#resize} */
    'resize'?: string,
    /** settings remain in effect until parenthesis boundary.
     * {@link http://www.imagemagick.org/script/command-line-options.php#respect-parentheses} */
    'respect-parentheses'?: string,
    /** geometry  roll an image vertically or horizontally
     * {@link http://www.imagemagick.org/script/command-line-options.php#roll} */
    'roll'?: string,
    /** degrees     apply Paeth rotation to the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#rotate} */
    'rotate'?: string,
    /** geometry    scale image with pixel sampling
     * {@link http://www.imagemagick.org/script/command-line-options.php#sample} */
    'sample'?: string,
    /** geometry   horizontal and vertical sampling factor
     * {@link http://www.imagemagick.org/script/command-line-options.php#sampling-factor} */
    'sampling-factor'?: string,
    /** geometry     scale the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#scale} */
    'scale'?: string,
    /** value    image scene number
     * {@link http://www.imagemagick.org/script/command-line-options.php#scene} */
    'scene'?: string,
    /** value     seed a new sequence of pseudo-random numbers
     * {@link http://www.imagemagick.org/script/command-line-options.php#seed} */
    'seed'?: string,
    /** values     segment an image
     * {@link http://www.imagemagick.org/script/command-line-options.php#segment} */
    'segment'?: string,
    /** geometry    selectively blur pixels within a contrast threshold
     * {@link http://www.imagemagick.org/script/command-line-options.php#selective-blur} */
    'selective-blur'?: string,
    /** separate an image channel into a grayscale image
     * {@link http://www.imagemagick.org/script/command-line-options.php#separate} */
    'separate'?: string,
    /** threshold   simulate a sepia-toned photo
     * {@link http://www.imagemagick.org/script/command-line-options.php#sepia-tone} */
    'sepia-tone'?: string,
    /** attribute value    set an image attribute
     * {@link http://www.imagemagick.org/script/command-line-options.php#set} */
    'set'?: string,
    /** degrees  shade the image using a distant light source
     * {@link http://www.imagemagick.org/script/command-line-options.php#shade} */
    'shade'?: string,
    /** geometry    simulate an image shadow
     * {@link http://www.imagemagick.org/script/command-line-options.php#shadow} */
    'shadow'?: string,
    /** geometry   sharpen the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#sharpen} */
    'sharpen'?: string,
    /** geometry     shave pixels from the image edges
     * {@link http://www.imagemagick.org/script/command-line-options.php#shave} */
    'shave'?: string,
    /** geometry     slide one edge of the image along the X or Y axis
     * {@link http://www.imagemagick.org/script/command-line-options.php#shear} */
    'shear'?: string,
    /** geometry    increase the contrast without saturating highlights or shadows
     * {@link http://www.imagemagick.org/script/command-line-options.php#sigmoidal-contrast} */
    'sigmoidal-contrast'?: string,
    /** offset   smush an image sequence together
     * {@link http://www.imagemagick.org/script/command-line-options.php#smush} */
    'smush'?: string,
    /** geometry  width and height of image
     * {@link http://www.imagemagick.org/script/command-line-options.php#size} */
    'size'?: string,
    /** geometry    simulate a pencil sketch
     * {@link http://www.imagemagick.org/script/command-line-options.php#sketch} */
    'sketch'?: string,
    /** threshold     negate all pixels above the threshold level
     * {@link http://www.imagemagick.org/script/command-line-options.php#solarize} */
    'solarize'?: string,
    /** sorts pixels within each scanline in ascending order of intensity
     * {@link http://www.imagemagick.org/script/command-line-options.php#sort-pixels} */
    'sort-pixels'?: string,
    /** geometry    splice the background color into the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#splice} */
    'splice'?: string,
    /** radius  displace image pixels by a random amount
     * {@link http://www.imagemagick.org/script/command-line-options.php#spread} */
    'spread'?: string,
    /** type geometry    replace each pixel with corresponding statistic from the neighborhood
     * {@link http://www.imagemagick.org/script/command-line-options.php#statistic} */
    'statistic'?: string,
    /** strip image of all profiles and comments
     * {@link http://www.imagemagick.org/script/command-line-options.php#strip} */
    'strip'?: string,
    /** color   graphic primitive stroke color
     * {@link http://www.imagemagick.org/script/command-line-options.php#stroke} */
    'stroke'?: string,
    /** value  graphic primitive stroke width
     * {@link http://www.imagemagick.org/script/command-line-options.php#strokewidth} */
    'strokewidth'?: string,
    /** type   render text with this font stretch
     * {@link http://www.imagemagick.org/script/command-line-options.php#stretch} */
    'stretch'?: string,
    /** type     render text with this font style
     * {@link http://www.imagemagick.org/script/command-line-options.php#style} */
    'style'?: string,
    /** indexes   swap two images in the image sequence
     * {@link http://www.imagemagick.org/script/command-line-options.php#swap} */
    'swap'?: string,
    /** degrees  swirl image pixels about the center
     * {@link http://www.imagemagick.org/script/command-line-options.php#swirl} */
    'swirl'?: string,
    /** synchronize image to storage device
     * {@link http://www.imagemagick.org/script/command-line-options.php#synchronize} */
    'synchronize'?: string,
    /** mark the image as modified
     * {@link http://www.imagemagick.org/script/command-line-options.php#taint} */
    'taint'?: string,
    /** filename   name of texture to tile onto the image background
     * {@link http://www.imagemagick.org/script/command-line-options.php#texture} */
    'texture'?: string,
    /** value    threshold the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#threshold} */
    'threshold'?: string,
    /** geometry     create a thumbnail of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#thumbnail} */
    'thumbnail'?: string,
    /** filename  tile image when filling a graphic primitive
     * {@link http://www.imagemagick.org/script/command-line-options.php#tile} */
    'tile'?: string,
    /** geometry   set the image tile offset
     * {@link http://www.imagemagick.org/script/command-line-options.php#tile-offset} */
    'tile-offset'?: string,
    /** value     tint the image with the fill color
     * {@link http://www.imagemagick.org/script/command-line-options.php#tint} */
    'tint'?: string,
    /** affine transform image
     * {@link http://www.imagemagick.org/script/command-line-options.php#transform} */
    'transform'?: string,
    /** color  make this color transparent within the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#transparent} */
    'transparent'?: string,
    /** color    transparent color
     * {@link http://www.imagemagick.org/script/command-line-options.php#transparent-color} */
    'transparent-color'?: string,
    /** flip image in the vertical direction and rotate 90 degrees
     * {@link http://www.imagemagick.org/script/command-line-options.php#transpose} */
    'transpose'?: string,
    /** flop image in the horizontal direction and rotate 270 degrees
     * {@link http://www.imagemagick.org/script/command-line-options.php#transverse} */
    'transverse'?: string,
    /** value    color tree depth
     * {@link http://www.imagemagick.org/script/command-line-options.php#treedepth} */
    'treedepth'?: string,
    /** trim image edges
     * {@link http://www.imagemagick.org/script/command-line-options.php#trim} */
    'trim'?: string,
    /** type  image type
     * {@link http://www.imagemagick.org/script/command-line-options.php#type} */
    'type'?: string,
    /** color   annotation bounding box color
     * {@link http://www.imagemagick.org/script/command-line-options.php#undercolor} */
    'undercolor'?: string,
    /** discard all but one of any pixel color.
     * {@link http://www.imagemagick.org/script/command-line-options.php#unique-colors} */
    'unique-colors'?: string,
    /** type     the units of image resolution
     * {@link http://www.imagemagick.org/script/command-line-options.php#units} */
    'units'?: string,
    /** geometry   sharpen the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#unsharp} */
    'unsharp'?: string,
    /** print detailed information about the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#verbose} */
    'verbose'?: string,
    /** print version information
     * {@link http://www.imagemagick.org/script/command-line-options.php#version} */
    'version'?: string,
    /** FlashPix viewing transforms
     * {@link http://www.imagemagick.org/script/command-line-options.php#view} */
    'view'?: string,
    /** geometry  soften the edges of the image in vignette style
     * {@link http://www.imagemagick.org/script/command-line-options.php#vignette} */
    'vignette'?: string,
    /** method   access method for pixels outside the boundaries of the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#virtual-pixel} */
    'virtual-pixel'?: string,
    /** geometry  alter an image along a sine wave
     * {@link http://www.imagemagick.org/script/command-line-options.php#wave} */
    'wave'?: string,
    /** threshold  removes noise from the image using a wavelet transform
     * {@link http://www.imagemagick.org/script/command-line-options.php#wavelet-denoise} */
    'wavelet-denoise'?: string,
    /** type    render text with this font weight
     * {@link http://www.imagemagick.org/script/command-line-options.php#weight} */
    'weight'?: string,
    /** point  chromaticity white point
     * {@link http://www.imagemagick.org/script/command-line-options.php#white-point} */
    'white-point'?: string,
    /** value  force all pixels above the threshold into white
     * {@link http://www.imagemagick.org/script/command-line-options.php#white-threshold} */
    'white-threshold'?: string,
    /** filename     write images to this file
     * {@link http://www.imagemagick.org/script/command-line-options.php#write} */
    'write'?: string,
    /** filename    associate a write mask with the image
     * {@link http://www.imagemagick.org/script/command-line-options.php#write-mask} */
    'write-mask'?: string,
}

class Info {
    width: number;
    height: number;
    page_width?: number;
    page_height?: number;
    offset_x?: number;
    offset_y?: number;
    format: string;
    depth: string;
    colorspace: string;
    size: string;

    constructor(groups: any, file_size_in_bytes: number) {
        this.width = parseInt(groups?.width) || 0;
        this.height = parseInt(groups?.height) || 0;
        this.page_width = parseInt(groups?.page_width) || 0;
        this.page_height = parseInt(groups?.page_height) || 0;
        this.offset_x = parseInt(groups?.offset_x) || 0;
        this.offset_y = parseInt(groups?.offset_y) || 0;
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

/**
 * @param {string} cmd
 * @param {*[]|IArguments} args
 * @param {string | Buffer} src
 * @param {BufferEncoding} output_encoding
 * @return {Promise<String>}
 */
function _exec(cmd: string, args: string[] = [], src: string | Buffer, output_encoding = 'utf-8' as BufferEncoding): Promise<String> {
    const child = spawn(cmd, args, {shell: true});

    child.stdout.setEncoding(output_encoding);

    let out: any = undefined;
    let err: any = undefined;

    // console.log(args);

    return new Promise((resolve, reject) => {
        child.stdin.on('error', (err) => {
            // console.log('stdin error');
            reject(err);
        });

        child.stderr.on('data', (data) => {
            // console.log('stderr data');
            if (err) err += data;
            else err = data;
        });
        child.stdout.on('data', (data) => {
            // console.log('stdout data');
            if (out) out += data;
            else out = data;
        });
        child.stdout.on('end', () => {
            // console.log('end');
            if (err) {
                reject(err.toString());
            } else {
                resolve(out);
            }

        });
        child.on('close', () => {
            // console.log('close');
            // if (!err) resolve(out);
            // else reject(err.toString());
        });

        if (src instanceof Buffer) child.stdin?.write(src);
        child.stdin.end();
    });
}

// function buffer_mime(buffer: string | Buffer) {
//     let args = ['--mime', '--brief'];
//
//     args.push(typeof buffer == 'string' ? buffer : '-');
//
//     return new Promise((resolve, reject) => {
//         _exec('file', args, buffer)
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
function read_to_buffer(path: string): Promise<Buffer> {
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
async function identify(data: string | Buffer): Promise<Info> {
    const regex = /^\S+\s(?<format>\S+)\s(?<width>\d+)x(?<height>\d+)\s(?<page_width>\d+)x(?<page_height>\d+)\+(?<offset_x>\d+)\+(?<offset_y>\d+)\s(?<depth>\S+)\s(?<colorspace>\S+)/;
    let args: string[] = ['-'];

    let buffer = (data instanceof Buffer) ? data : await read_to_buffer(data);

    return new Promise((resolve, reject) => {
        _exec('identify', args, buffer)
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
async function convert(data: string | Buffer, args: ConvertOptions = {} as ConvertOptions, to_file = ''): Promise<Buffer> {
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

    let buffer = (data instanceof Buffer) ? data : await read_to_buffer(data);

// _arguments.push(typeof data == 'string' ? data : '-');

    _arguments.push(format ? `${format}:-` : '-');


    return new Promise((resolve, reject) => {
        _exec('convert', _arguments, buffer, 'binary')
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

function get_version() {
    let dir = __dirname.replace(/(qimagemagick|node-qimagemagick).*/, '$1/');
    let data = fs.readFileSync(`${dir}/package.json`).toString();
    return JSON.parse(data).version;
}

const version = get_version();

export const QIM = {read_to_buffer, identify, convert, version};

export const qim = QIM;

export { read_to_buffer, identify, convert, version };


