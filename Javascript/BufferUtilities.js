export class BufferUtilities {
    static CreateBuffer(device, data) {
        if (!(data instanceof Float32Array) && !(data instanceof Uint16Array) && !Array.isArray(data)) {
            throw new Error("Data must be an instance of a typed array or an array");
        }

        const TypeOfArray = data.constructor; // get the data type of data parameter

        console.log(TypeOfArray);
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: TypeOfArray === Float32Array ? (GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) : (GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST),
            mappedAtCreation: true
        });

        new TypeOfArray(buffer.getMappedRange()).set(data); // creating new data type base on what data type of data parameter
        buffer.unmap();
        return buffer;
    }

    static CreateVertexBuffer(device, data) {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });
        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
    }

    static CreateIndexBuffer(device, data) {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });
        new Uint16Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
    }

    static CreateUniformBuffer(device, data){
        return device.createBuffer({
            size: data.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            mappedAtCreation: false
        });
    }
}