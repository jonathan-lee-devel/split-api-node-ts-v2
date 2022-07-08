import {makeGetProperty} from '../get-property';

describe('Get property', () => {
  it('When makeGetProperty Then getProperty', async () => {
    // @ts-ignore
    const getProperty = makeGetProperty({});
    expect(getProperty).not.toBeNull();
    expect(getProperty).toBeInstanceOf(Function);
  });
});
