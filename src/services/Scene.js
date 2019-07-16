import {
  AmbientLight,
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';

function buildDefaultScene(cameraFar) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const widthHeightRatio = windowWidth / windowHeight;
  const camera = new PerspectiveCamera(65, widthHeightRatio, 1, cameraFar || 201);
  const scene = new Scene();
  const renderer = new WebGLRenderer();
  camera.aspect = widthHeightRatio;
  scene.background = new Color(0x000000);
  scene.add(camera);
  renderer.setSize(windowWidth, windowHeight);
  return { camera, scene, renderer };
}

class SceneWrapper {
  constructor() {
    const ambientLight = new AmbientLight(0xFFFFFF);
    const { camera, scene, renderer } = buildDefaultScene();
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.scene.add(ambientLight);
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(renderer.domElement));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

const sceneWrapper = new SceneWrapper();
export default sceneWrapper;
