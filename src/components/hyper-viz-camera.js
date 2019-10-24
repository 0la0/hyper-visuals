import HyperVizBase from './hyper-viz-base';
import CameraModel from '../services/Camera';

let instanceIsConnected = false;

export default class PsVizCamera extends HyperVizBase {
  static get tag() {
    return 'h-viz-camera';
  }

  static get observedAttributes() {
    return [ 'position', 'rotation', ];
  }

  connectedCallback() {
    if (instanceIsConnected) {
      console.error('Error, cannot have multiple h-viz-camera');
      return;
    } else {
      instanceIsConnected = true;
    }
    super.connectedCallback();
    this.cameraModel = new CameraModel();
    this.setValuesFromAttributes(PsVizCamera.observedAttributes);
  }

  disconnectedCallback() {
    instanceIsConnected = false;
    this.cameraModel.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.cameraModel.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.cameraModel.setParam(attrName, newVal);
  }
}
