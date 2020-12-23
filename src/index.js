import { components, defineComponents } from './components/componentManager';
import latency from './services/Attribute/AnimationLatency';

function init() {
  defineComponents();
}

const PsVizMarkup = {
  components,
  init,
  setLatencyMilliseconds: latency.setAnimationLatency.bind(latency),
};

(function() {
  document.addEventListener('DOMContentLoaded', init);
})();

export default PsVizMarkup;