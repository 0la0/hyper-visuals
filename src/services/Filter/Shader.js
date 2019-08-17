import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

export default class Shader {
  constructor(uniforms, vertexShader, fragmentShader) {
    this.shaderPass = new ShaderPass({ uniforms, vertexShader, fragmentShader, });
        
  }

  setUniform(key, value) {
    const uniform = this.shaderPass.uniforms[key];
    if (!uniform) {
      throw new Error(`Shader.setUniform ${key} does not exist`);
    }
    uniform.value = value;   
  }
}
