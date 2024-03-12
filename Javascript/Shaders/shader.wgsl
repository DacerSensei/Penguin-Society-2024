struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) textureCoordinates: vec2f,
    @location(1) color: vec4f
}

@group(0) @binding(0)
var<uniform> projectionViewMatrix: mat4x4f;

@vertex
fn VertexMain(@location(0) position: vec2f, @location(1) textureCoordinates: vec2f, @location(2) color: vec3f) -> VertexOut
{
    var output: VertexOut;

    output.position = projectionViewMatrix * vec4f(position, 0.0, 1.0);
    output.textureCoordinates = textureCoordinates;
    output.color = vec4f(color, 1.0);
    return output;
}

@group(1) @binding(0)
var textureSampler: sampler;

@group(1) @binding(1)
var texture: texture_2d<f32>;

@fragment
fn FragmentMain(fragData: VertexOut) -> @location(0) vec4f
{
    var textureColor = textureSample(texture, textureSampler, fragData.textureCoordinates);
    return fragData.color * textureColor;
}