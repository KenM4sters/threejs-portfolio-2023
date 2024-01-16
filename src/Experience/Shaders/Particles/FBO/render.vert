//float texture containing the positions of each particle
uniform float uTime;
uniform float uSize;
uniform sampler2D uPositions;
varying vec2 vUv;
varying vec4 vColor;

varying float size;
void main() {
    vUv = uv;
    vec4 pos = texture2D(uPositions, vUv);

    float angle = atan(pos.y, pos.x);

    vColor = vec4(0.3, 0.5, 1.0, 0.7 + 0.45*sin(angle + uTime * 10.0));

    vec4 modelPosition = modelMatrix * vec4(pos.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize;
    gl_PointSize *= (1.0 / - viewPosition.z);


}
