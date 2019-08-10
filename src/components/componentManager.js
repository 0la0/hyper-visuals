import PrimitiveGeometryComponents from './PrimitiveGeometryComponents';
import PsVizBackground from './ps-viz-background';
import PsVizCamera from './ps-viz-camera';
import PsVizLight from './ps-viz-light';
import PsVizRepeat from './ps-viz-repeat';
import PsVizScene from './ps-viz-scene';

export const components = Object.assign({}, PrimitiveGeometryComponents, {
  PsVizBackground,
  PsVizCamera,
  PsVizLight,
  PsVizRepeat,
  PsVizScene,
});

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
