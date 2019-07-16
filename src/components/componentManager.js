import PsVizCube from './ps-viz-cube';
import PsVizScene from './ps-viz-scene';

export const components = {
  PsVizCube,  
  PsVizScene,
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
