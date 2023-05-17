import MainExtension from '@';

test('plugin is a Promise', () => {
  expect(MainExtension).toBeInstanceOf(Promise);
});
