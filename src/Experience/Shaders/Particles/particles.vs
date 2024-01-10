

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x) * cos(modelPosition.z);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 100.0;
    gl_PointSize *= (1.0 / - viewPosition.z);


}