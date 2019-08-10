import PrimitiveGeometryComponents from './PrimitiveGeometryComponents';
import PsVizRepeat from './ps-viz-repeat';
import PsVizScene from './ps-viz-scene';

export const components = Object.assign({}, PrimitiveGeometryComponents, {
  PsVizRepeat,
  PsVizScene,
});

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
