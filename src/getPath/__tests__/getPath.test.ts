import { getPath, getNthChild } from '../getPath';

const rawHTML = '<body><div><ul><li id="firstLi">1</li>2<li>3</li>4<li>5</li>6<li class="red">7</li></ul></div></body>';
const parser = new DOMParser();
const document = parser.parseFromString(rawHTML, 'text/html');

test('getNthChild should return tag', () => {
  const element = getNthChild(document.querySelector('html'));
  expect(element).toBe('html');
});

test('getNthChild should return tags nth-child', () => {
  const element = getNthChild(document.querySelector('div'));
  expect(element).toBe('div:nth-child(1)');
});

test('getPath should return id', () => {
  const element = document.querySelector('li:first-child');
  const selector = getPath(element);
  expect(selector).toBe('#firstLi');
});

test('getPath should return class', () => {
  const element = document.querySelector('li:last-child');
  const selector = getPath(element);
  expect(selector).toMatch('.red');
});

test('getPath should return unique path', () => {
  const element = document.querySelector('li:nth-child(2)');
  const selector = getPath(element);
  const amountOfElements = document.querySelectorAll(selector).length;
  expect(amountOfElements).toBe(1);
});
