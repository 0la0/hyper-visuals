import PrimitiveGeometryBase from './PrimitiveGeometryBase';
import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Octahedron,
  Plane,
  Sphere,
  Tetrahedron,
  Triangle,
  Ring,
} from '../services/Geometry/PrimitiveGeometry';

class HyperVizBox extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-box';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Box();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizCircle extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-circle';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Circle();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizCone extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-cone';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Cone();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizCylinder extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-cylinder';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Cylinder();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizDodecahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-dodecahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Dodecahedron();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizOctahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-octahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Octahedron();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizPlane extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-plane';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Plane();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizSphere extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-sphere';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Sphere();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizTetrahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-tetrahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Tetrahedron();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizTriangle extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-triangle';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Triangle();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

class HyperVizRing extends PrimitiveGeometryBase {
  static get tag() {
    return 'h-viz-ring';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Ring();
    super.setValuesFromAttributes(HyperVizCone.observedAttributes);
    super.connect();
  }
}

export default {
  HyperVizBox,
  HyperVizCircle,
  HyperVizCone,
  HyperVizCylinder,
  HyperVizDodecahedron,
  HyperVizOctahedron,
  HyperVizPlane,
  HyperVizSphere,
  HyperVizTetrahedron,
  HyperVizTriangle,
  HyperVizRing,
};