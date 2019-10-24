import PrimitiveGeometryComponents from './PrimitiveGeometryComponents';
import PsVizBackground from './hyper-viz-background';
import PsVizCamera from './hyper-viz-camera';
import PsVizFilterAfterImage from './hyper-viz-filter-afterimage';
import PsVizFilterClouds from './hyper-viz-filter-cloud';
import PsVizFilterOscillate from './hyper-viz-filter-oscillate';
import PsVizFilterPixelate from './hyper-viz-filter-pixelate';
import PsVizLight from './hyper-viz-light';
import PsVizRepeat from './hyper-viz-repeat';
import PsVizScene from './hyper-viz-scene';
import PsVizSubScene from './hyper-viz-sub-scene';

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
