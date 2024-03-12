export class Texture {
    constructor(texture, sampler){
        this.Texture = texture;
        this.Sampler = sampler;
    }

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

        return new Texture(texture, sampler);
    }

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
            throw error; // Propagate the error further
        });
    }
}