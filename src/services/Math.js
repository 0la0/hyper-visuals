import { Vector3 } from 'three';

export function getRandomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

export function parseParens(stringValue) {
  const index1 = stringValue.indexOf('(');
  const index2 = stringValue.lastIndexOf(')');
  if (index1 < 0 || index2 < 0) {
    return { ok: false, value: '' };
  }
  const value = stringValue.substring(index1 + 1, index2);
  return { ok: true, value };
}

export function numericOrDefault(stringValue = '', defaultValue = 0) {
  const numericValue = parseFloat(stringValue, 10);
  if (Number.isNaN(numericValue)) {
    return defaultValue;
  }
  return numericValue;
}

export function getRandomVector(magnitude = 1) {
  return new Vector3(
    getRandomSign() * Math.random() * magnitude,
    getRandomSign() * Math.random() * magnitude,
    getRandomSign() * Math.random() * magnitude
  );
}
