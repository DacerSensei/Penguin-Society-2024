export class Texture {
    constructor(texture, sampler, id, width, height){
        this.Texture = texture;
        this.Sampler = sampler;
        this.Id = id;
        this.Width = width;
        this.Height = height;
    }

    /**
     * Creates an instance of Texture.
     * @param {GPUDevice} device - Instance of GPU device in WebGPU.
     * @param {Image} image - Instance of Image.
     */
    static async CreateTexture(device, image){
        const texture = device.createTexture({
            size: {
                width: image.width,
                height: image.height,
            },
            format: "rgba8unorm",
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT
        });

        const data = await createImageBitmap(image);

        device.queue.copyExternalImageToTexture(
            { source: data },
            { texture: texture },
            {
                width: image.width,
                height: image.height
            }
        );

        const sampler = device.createSampler({
            magFilter: "nearest",
            minFilter: "nearest"
        });

        return new Texture(texture, sampler, image.src, image.width, image.height);
    }

    /**
     * Creates an instance of Texture from URL.
     * @param {GPUDevice} device - Instance of GPU device in WebGPU.
     * @param {string} url - URL string.
     */
    static async CreateTextureFromURL(device, url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = (error) => {
                console.error("Failed to load image", error);
                reject(error);
            };
        })
        .then(image => Texture.CreateTexture(device, image))
        .catch(error => {
            console.error("Error loading texture:", error);
            throw error;
        });
    }
}