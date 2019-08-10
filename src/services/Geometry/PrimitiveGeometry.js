import {
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
  CircleBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  DodecahedronBufferGeometry,
  DoubleSide,
  FrontSide,
  MeshLambertMaterial,
  OctahedronBufferGeometry,
  PlaneBufferGeometry,
  SphereBufferGeometry,
  TetrahedronBufferGeometry,
  TorusBufferGeometry,
} from 'three';
import BaseGeomtry from './BaseGeometry';

const baseSize = 5;
const getMaterial = (side = FrontSide) => new MeshLambertMaterial({ side });

export class Box extends BaseGeomtry {
  constructor() {
    super(
      new BoxBufferGeometry(baseSize, baseSize, baseSize),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Circle extends BaseGeomtry {
  constructor() {
    super(
      new CircleBufferGeometry(baseSize, 16),
      getMaterial(DoubleSide)
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Cone extends BaseGeomtry {
  constructor() {
    super(
      new ConeBufferGeometry(baseSize, 20, 32),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Cylinder extends BaseGeomtry {
  constructor() {
    super(
      new CylinderBufferGeometry(baseSize, baseSize, baseSize * 2),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Dodecahedron extends BaseGeomtry {
  constructor() {
    super(
      new DodecahedronBufferGeometry(baseSize),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Octahedron extends BaseGeomtry {
  constructor() {
    super(
      new OctahedronBufferGeometry(baseSize),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Plane extends BaseGeomtry {
  constructor() {
    super(
      new PlaneBufferGeometry(baseSize, baseSize),
      getMaterial(DoubleSide)
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Sphere extends BaseGeomtry {
  constructor() {
    super(
      new SphereBufferGeometry(baseSize),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Tetrahedron extends BaseGeomtry {
  constructor() {
    super(
      new TetrahedronBufferGeometry(baseSize),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Triangle extends BaseGeomtry {
  static getTriangleGeometry(size) {
    const triangleGeometry = new BufferGeometry();
    const positions = new Float32Array([
      -size, -size, 0,
      -size, size, 0,
      size, size, 0
    ])
    triangleGeometry.addAttribute('position', new BufferAttribute(positions, 3))
    return triangleGeometry;
  }

  constructor() {
    super(
      Triangle.getTriangleGeometry(baseSize),
      getMaterial(DoubleSide)
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Ring extends BaseGeomtry {
  constructor() {
    super(
      new TorusBufferGeometry(baseSize, 1),
      getMaterial()
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}