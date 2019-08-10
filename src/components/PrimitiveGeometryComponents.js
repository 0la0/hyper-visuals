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

class PsVizBox extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-box';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Box();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizCircle extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-circle';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Circle();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizCone extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-cone';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Cone();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizCylinder extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-cylinder';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Cylinder();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizDodecahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-dodecahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Dodecahedron();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizOctahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-octahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Octahedron();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizPlane extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-plane';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Plane();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizSphere extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-sphere';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Sphere();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizTetrahedron extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-tetrahedron';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Tetrahedron();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizTriangle extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-triangle';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Triangle();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

class PsVizRing extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-ring';
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new Ring();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

export default {
  PsVizBox,
  PsVizCircle,
  PsVizCone,
  PsVizCylinder,
  PsVizDodecahedron,
  PsVizOctahedron,
  PsVizPlane,
  PsVizSphere,
  PsVizTetrahedron,
  PsVizTriangle,
  PsVizRing,
};