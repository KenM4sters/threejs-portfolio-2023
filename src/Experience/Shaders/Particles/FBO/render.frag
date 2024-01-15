varying vec2 vUv;
varying vec4 vColor;

void main()
{
    gl_FragColor = vec4(vUv.xy, 1.0, 1.0);
    gl_FragColor = vColor;

}
