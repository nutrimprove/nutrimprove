import { getString } from './api';

describe('getString', () => {
  it('returns a string when passed a number', () => {
    expect(getString(1234)).toBe('1234');
    expect(getString(14)).toBe('14');
    expect(getString(1.1618)).toBe('1.1618');
  });

  it('trims whitespace at either end', () => {
    expect(getString(' leadingandtrailing ')).toEqual(
      'leadingandtrailing'
    );
  });

  it('returns lowercased letters', () => {
    expect(getString('UPPER')).toEqual('upper');
    expect(getString('someUpper')).toEqual('someupper');
    expect(getString('PYTHON_CONSTANT')).toEqual('python_constant');
  });
});
