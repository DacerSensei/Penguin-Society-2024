struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
    @location(1) textureCoordinates: vec2f
}

@vertex
fn VertexMain(@location(0) position: vec2f, @location(1) color: vec3f, @location(2) textureCoordinates: vec2f) -> VertexOut
{
    var output: VertexOut;

    output.position = vec4f(position, 0.0, 1.0);
    output.color = vec4f(color, 1.0);
    output.textureCoordinates = textureCoordinates;
    return output;
}

@group(0) @binding(0)
var texSampler: sampler;

@group(0) @binding(1)
var tex: texture_2d<f32>;

@fragment
fn FragmentMain(fragData: VertexOut) -> @location(0) vec4f
{
    var textureColor = textureSample(tex, texSampler, fragData.textureCoordinates);
    return fragData.color * textureColor;
}