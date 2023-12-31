attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;


varying vec2 vTexCoord;

void main() {

	vec4 positionVec4 = vec4(aPosition, 1.0);

	if (aTexCoord.x > 0.5) {
		positionVec4 = vec4(1,1,1,1);	
	}

	gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

	vTexCoord = aTexCoord;
}
