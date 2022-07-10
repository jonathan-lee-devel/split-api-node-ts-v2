import {makeCreateProperty} from '../create-property';

describe('Create property', () => {
  it('When makeCreateProperty Then createProperty',
      async () => {
        const createProperty = makeCreateProperty(
            // @ts-ignore
            () => {
            },
            {},
            () => {
            },
        );
        expect(createProperty).not.toBeNull();
        expect(createProperty).toBeInstanceOf(Function);
      });
  it('When createProperty Then id generated',
      async () => {
        let isIdGenerated = false;
        const createProperty = makeCreateProperty(
            // @ts-ignore
            () => {
              isIdGenerated = true;
            },
            {},
            () => {

            },
        );

        // @ts-ignore
        await createProperty({}, 'title', [], []);
        expect(isIdGenerated).toBeTruthy();
      });
});
