import { Euler, Quaternion, Vector3 } from 'three';
import InstancedMesh from './InstanceMeshProvider';

class GeoProperties {
  constructor() {
    this.position = new Vector3();
    this.positionVelocity = new Vector3();
    this.rotation = new Vector3(),
    this.rotationVelocity = new Vector3(),
    this.scale = new Vector3();
  }
}

export default class Repeater {
  constructor(geometry, material, vars) {
    const numInstances = vars.repeatX * vars.repeatY * vars.repeatZ;

    // TODO: rename this.mesh to this.cluster..
    this.mesh = new InstancedMesh(
      geometry,
      material,
      numInstances,
      true,  // dynamic
      false, // color
      true,  // uniform scale
    );
    this.vars = vars;
    this.geoProperties = new Array(numInstances).fill(null).map(_ => new GeoProperties());
    this.reset();
  }

  reset() {
    const _q = new Quaternion(1, 0, 0, 1);

    const halfX = (this.vars.repeatX * this.vars.strideX) / 2;
    const halfY = (this.vars.repeatY * this.vars.strideY) / 2;
    const halfZ = (this.vars.repeatZ * this.vars.strideZ) / 2;

    this.geoProperties.forEach((geoProperty, index) => {
      const z = index % this.vars.repeatZ;
      const y = Math.floor(index / this.vars.repeatZ) % this.vars.repeatY;
      const x = Math.floor(index / (this.vars.repeatY * this.vars.repeatZ)) % this.vars.repeatX;
      const posX = x * this.vars.strideX - halfX;
      const posY = y * this.vars.strideY - halfY;
      const posZ = z * this.vars.strideZ - halfZ;
      geoProperty.position = new Vector3(posX, posY, posZ);
      geoProperty.positionVelocity = new Vector3(this.vars.positionVelocityX, this.vars.positionVelocityY, this.vars.positionVelocityZ);
      geoProperty.rotation = new Vector3(this.vars.rotateX, this.vars.rotateY, this.vars.rotateZ);
      geoProperty.rotationVelocity = new Vector3(this.vars.rotateVelocityX, this.vars.rotateVelocityY, this.vars.rotateVelocityZ);
      geoProperty.scale = new Vector3(this.vars.sizeX, this.vars.sizeY, this.vars.sizeZ);
    });

    this.geoProperties.forEach((geoProperty, index) => {
      this.mesh.setQuaternionAt(index , _q.setFromEuler(new Euler().setFromVector3(geoProperty.rotation, 'XYZ')));
      this.mesh.setPositionAt(index , geoProperty.position);
      this.mesh.setScaleAt(index , geoProperty.scale);
    });
  }

  update(elapsedTime) {
    
  }

  dispose() {
    console.log('TODO: Repeater.dispose');
  }

  getThreeMesh() {
    return this.mesh;
  }
}
