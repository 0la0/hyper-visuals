import ContinuousAttribute from './ContinuousAttribute';
import MessageAttribute from './MessageAttribute';
import ModulationAttribute from './ModulationAttribute';
import { numericOrDefault, parseParens, } from '../Math';

// TODO: include fn name in parseParens response
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
  if (stringValue.indexOf('mod') === 0) {
    const parsedFn = parseParens(stringValue);
    if (!parsedFn.ok) {
      return numericValue;
    }
    return new ModulationAttribute(parsedFn.value);
  }
  return numericValue;
}
