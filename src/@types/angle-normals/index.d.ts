declare module 'angle-normals' {
  import { vec3 } from 'gl-matrix';
  function AngleNormals(cells: vec3[], positions: vec3[]): vec3[];
  export = AngleNormals;
}
