import { capitalizeLastName } from './capitalize';

it('validate capitalize name', () => {
  const name1 = 'First';
  const name2 = 'first';

  expect(capitalizeLastName(name1)).toStrictEqual('First');
  expect(capitalizeLastName(name2)).toStrictEqual('First');
});

it('validate capitalize last name', () => {
  const name1 = 'Danas';
  const name2 = 'van de aan Danas';
  const name3 = 'de danas';
  const name4 = 'Van Danas';
  const name5 = 'danas';
  const name6 = 'van der schans';
  const name7 = 'van der Schans';

  expect(capitalizeLastName(name1)).toStrictEqual('Danas');
  expect(capitalizeLastName(name2)).toStrictEqual('van de aan Danas');
  expect(capitalizeLastName(name3)).toStrictEqual('de Danas');
  expect(capitalizeLastName(name4)).toStrictEqual('Van Danas');
  expect(capitalizeLastName(name5)).toStrictEqual('Danas');
  expect(capitalizeLastName(name6)).toStrictEqual('van der Schans');
  expect(capitalizeLastName(name7)).toStrictEqual('van der Schans');
});
