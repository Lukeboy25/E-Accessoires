import { calculatePage } from './calculatePage';

it('validate calculate pageNumber', () => {
  const pageNumber1 = 1;
  const pageNumber2 = 2;
  const pageNumber3 = 3;
  const pageNumber4 = 4;
  const pageNumber5 = 5;

  const pageSize = 10;

  expect(calculatePage(pageNumber1, pageSize)).toStrictEqual(0);
  expect(calculatePage(pageNumber2, pageSize)).toStrictEqual(10);
  expect(calculatePage(pageNumber3, pageSize)).toStrictEqual(20);
  expect(calculatePage(pageNumber4, pageSize)).toStrictEqual(30);
  expect(calculatePage(pageNumber5, pageSize)).toStrictEqual(40);
});
