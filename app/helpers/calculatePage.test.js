import { calculatePage } from './calculatePage';

it('validate calculate pageNumber', () => {
  const pageNumber1 = 1;
  const pageNumber2 = 2;
  const pageNumber3 = 3;
  const pageNumber4 = 4;
  const pageNumber5 = 5;

  expect(calculatePage(pageNumber1)).toStrictEqual(0);
  expect(calculatePage(pageNumber2)).toStrictEqual(10);
  expect(calculatePage(pageNumber3)).toStrictEqual(20);
  expect(calculatePage(pageNumber4)).toStrictEqual(30);
  expect(calculatePage(pageNumber5)).toStrictEqual(40);
});
