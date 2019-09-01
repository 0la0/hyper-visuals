import {
  LinearFilter,
  MeshBasicMaterial,
  NearestFilter,
  RGBAFormat,
  ShaderMaterial,
  WebGLRenderTarget
} from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
// import VectorAttribute from '../../Attribute/VectorAttribute';
import sceneManager from '../../SceneManager';
import Shader from '../Shader';
import vertexShader from './AfterImage.vert';
import fragmentShader from './AfterImage.frag';

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_afterimage.html
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/AfterimagePass.js
export default class AfterImageFilter {
  constructor() {
    // Pass.call(this);
    this.paramMap = {
      // amount: new VectorAttribute(this.setAmount.bind(this)),
    };
    this.uniforms = {
      damp: { value: 0.96 },
      tOld: { value: null },
      tNew: { value: null },
      // tDiffuse: { value: null }
    };
    // this.shader = new Shader(uniforms, vertextShader, fragmentShader);

    this.textureComp = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: LinearFilter,
      magFilter: NearestFilter,
      format: RGBAFormat
    });
  
    this.textureOld = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: LinearFilter,
      magFilter: NearestFilter,
      format: RGBAFormat
    });
  
    this.shaderMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
  
    this.compFsQuad = new Pass.FullScreenQuad( this.shaderMaterial );
  
    var material = new MeshBasicMaterial();
    this.copyFsQuad = new Pass.FullScreenQuad( material );


    // sceneManager.addEffect(this.shader);
    // sceneManager.addSceneObject(this);
  }

  dispose() {
    // sceneManager.removeEffect(this.shader);
    // sceneManager.removeSceneObject(this);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
