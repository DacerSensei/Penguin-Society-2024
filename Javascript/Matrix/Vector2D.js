// @ts-nocheck
import * as Matrix from "./MatrixCommon.js";

/**
 * 2 Dimensional Vector
 * @module Vector2D
 */

/**
 * Creates a new, empty Vector2D
 *
 * @returns {Vector2D} a new 2D vector
 */
export function Create() {
  let out = new Matrix.ARRAY_TYPE(2);
  if (Matrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}

/**
 * Creates a new Vector2D initialized with values from an existing vector
 *
 * @param {ReadonlyVector2D} a vector to clone
 * @returns {Vector2D} a new 2D vector
 */
export function Clone(a) {
  let out = new Matrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new Vector2D initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2D} a new 2D vector
 */
export function FromValues(x, y) {
  let out = new Matrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one Vector2D to another
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the source vector
 * @returns {Vector2D} out
 */
export function Copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a Vector2D to the given values
 *
 * @param {Vector2D} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2D} out
 */
export function Set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

/**
 * Divides two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

/**
 * Math.ceil the components of a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to ceil
 * @returns {Vector2D} out
 */
export function Ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}

/**
 * Math.floor the components of a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to floor
 * @returns {Vector2D} out
 */
export function Floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}

/**
 * Returns the minimum of two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

/**
 * Returns the maximum of two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Vector2D} out
 */
export function Max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

/**
 * symmetric round the components of a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to round
 * @returns {Vector2D} out
 */
export function Round(out, a) {
  out[0] = Matrix.round(a[0]);
  out[1] = Matrix.round(a[1]);
  return out;
}

/**
 * Scales a Vector2D by a scalar number
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vector2D} out
 */
export function Scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

/**
 * Adds two Vector2D's after scaling the second operand by a scalar value
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {Vector2D} out
 */
export function ScaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two Vector2D's
 *
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Number} distance between a and b
 */
export function Distance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two Vector2D's
 *
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Number} squared distance between a and b
 */
export function SquaredDistance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return x * x + y * y;
}

/**
 * Calculates the length of a Vector2D
 *
 * @param {ReadonlyVector2D} a vector to calculate length of
 * @returns {Number} length of a
 */
export function Length(a) {
  var x = a[0], y = a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a Vector2D
 *
 * @param {ReadonlyVector2D} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export function SquaredLength(a) {
  var x = a[0],
    y = a[1];
  return x * x + y * y;
}

/**
 * Negates the components of a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to negate
 * @returns {Vector2D} out
 */
export function Negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

/**
 * Returns the inverse of the components of a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to invert
 * @returns {Vector2D} out
 */
export function Inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}

/**
 * Normalize a Vector2D
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a vector to normalize
 * @returns {Vector2D} out
 */
export function Normalize(out, a) {
  var x = a[0],
    y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }
  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}

/**
 * Calculates the dot product of two Vector2D's
 *
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {Number} dot product of a and b
 */
export function Dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two Vector2D's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @returns {vec3} out
 */
export function Cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

/**
 * Performs a linear interpolation between two Vector2D's
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the first operand
 * @param {ReadonlyVector2D} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {Vector2D} out
 */
export function Lerp(out, a, b, t) {
  var ax = a[0],
    ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {Vector2D} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {Vector2D} out
 */
export function Random(out, scale) {
  scale = scale === undefined ? 1.0 : scale;
  var r = Matrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

/**
 * Transforms the Vector2D with a mat2
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {Vector2D} out
 */
export function TransformMat2(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}

/**
 * Transforms the Vector2D with a mat2d
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {Vector2D} out
 */
export function TransformMat2d(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

/**
 * Transforms the Vector2D with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {Vector2D} out
 */
export function TransformMat3(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}

/**
 * Transforms the Vector2D with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {Vector2D} out the receiving vector
 * @param {ReadonlyVector2D} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {Vector2D} out
 */
export function TransformMat4(out, a, m) {
  let x = a[0];
  let y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Rotate a 2D vector
 * @param {Vector2D} out The receiving Vector2D
 * @param {ReadonlyVector2D} a The Vector2D point to rotate
 * @param {ReadonlyVector2D} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {Vector2D} out
 */
export function Rotate(out, a, b, rad) {
  //Translate point to the origin
  let p0 = a[0] - b[0],
    p1 = a[1] - b[1],
    sinC = Math.sin(rad),
    cosC = Math.cos(rad);

  //perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];

  return out;
}

/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVector2D} a The first operand
 * @param {ReadonlyVector2D} b The second operand
 * @returns {Number} The angle in radians
 */
export function Angle(a, b) {
  let x1 = a[0],
    y1 = a[1],
    x2 = b[0],
    y2 = b[1],
    // mag is the product of the magnitudes of a and b
    mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
    // mag &&.. short circuits if mag == 0
    cosine = mag && (x1 * x2 + y1 * y2) / mag;
  // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

/**
 * Set the components of a Vector2D to zero
 *
 * @param {Vector2D} out the receiving vector
 * @returns {Vector2D} out
 */
export function Zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVector2D} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function ToString(a) {
  return "Vector2D(" + a[0] + ", " + a[1] + ")";
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVector2D} a The first vector.
 * @param {ReadonlyVector2D} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function ExactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVector2D} a The first vector.
 * @param {ReadonlyVector2D} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function Equals(a, b) {
  let a0 = a[0],
    a1 = a[1];
  let b0 = b[0],
    b1 = b[1];
  return (
    Math.abs(a0 - b0) <=
      Matrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <=
      Matrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1))
  );
}

/**
 * Alias for {@link Vector2D.Length}
 * @function
 */
export const len = Length;

/**
 * Alias for {@link Vector2D.Subtract}
 * @function
 */
export const sub = Subtract;

/**
 * Alias for {@link Vector2D.Multiply}
 * @function
 */
export const mul = Multiply;

/**
 * Alias for {@link Vector2D.Divide}
 * @function
 */
export const div = Divide;

/**
 * Alias for {@link Vector2D.Distance}
 * @function
 */
export const dist = Distance;

/**
 * Alias for {@link Vector2D.SquaredDistance}
 * @function
 */
export const sqrDist = SquaredDistance;

/**
 * Alias for {@link Vector2D.SquaredLength}
 * @function
 */
export const sqrLen = SquaredLength;

/**
 * Perform some operation over an array of Vector2Ds.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each Vector2D. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of Vector2Ds to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
export const forEach = (function() {
  let vec = Create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
})();