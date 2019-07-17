import PsVizCone from './ps-viz-cone';
import PsVizCube from './ps-viz-cube';
import PsVizRepeat from './ps-viz-repeat';
import PsVizScene from './ps-viz-scene';

export const components = {
  PsVizCone,
  PsVizCube,
  PsVizRepeat,
  PsVizScene,
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
