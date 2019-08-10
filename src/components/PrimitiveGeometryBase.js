import PsVizBase from './ps-viz-base';

export default class PrimitiveGeometryBase extends PsVizBase {
  static get observedAttributes() {
    return [ 'position', 'rotation', 'scale', 'color', 'pos-vel', 'rot-vel', 'scale-vel' ];
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.geometry.setParam(attrName, this.getAttribute(attrName)));
  }

  disconnectedCallback() {
    this.geometry.dispose();
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.geometry.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }

  connect() {
    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.parentNode.graphicsModel.connectTo(this.geometry);
      }
    });
  }
}
