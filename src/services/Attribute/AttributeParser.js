import ContinuousAttribute from './ContinuousAttribute';
import MessageAttribute from './MessageAttribute';
import { numericOrDefault, parseParens, } from '../Math';

export function parseAttribute(stringValue) {
  const numericValue = numericOrDefault(stringValue, 0);
  if (stringValue.indexOf('addr') === 0) {
    const parsedAddress = parseParens(stringValue);
    if (!parsedAddress.ok) {
      return numericValue;
    }
    return new MessageAttribute(parsedAddress.value);
  }
  if (stringValue.indexOf('fn') === 0) {
    const parsedFn = parseParens(stringValue);
    if (!parsedFn.ok) {
      return numericValue;
    }
    return new ContinuousAttribute(parsedFn.value);
  }
  return numericValue;
}
