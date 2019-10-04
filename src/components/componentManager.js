import PrimitiveGeometryComponents from './PrimitiveGeometryComponents';
import PsVizBackground from './ps-viz-background';
import PsVizCamera from './ps-viz-camera';
import PsVizFilterAfterImage from './ps-viz-filter-afterimage';
import PsVizFilterClouds from './ps-viz-filter-cloud';
import PsVizFilterOscillate from './ps-viz-filter-oscillate';
import PsVizFilterPixelate from './ps-viz-filter-pixelate';
import PsVizLight from './ps-viz-light';
import PsVizRepeat from './ps-viz-repeat';
import PsVizScene from './ps-viz-scene';
import PsVizSubScene from './ps-viz-sub-scene';

export const components = Object.assign({}, PrimitiveGeometryComponents, {
  PsVizBackground,
  PsVizCamera,
  PsVizFilterAfterImage,
  PsVizFilterClouds,
  PsVizFilterOscillate,
  PsVizFilterPixelate,
  PsVizLight,
  PsVizRepeat,
  PsVizScene,
  PsVizSubScene,
});

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
