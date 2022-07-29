export function getNthChild(htmlEl) {
  // если нет родителя
  if (!htmlEl.parentElement) return htmlEl.tagName.toLowerCase();
  // Если родитель есть, ищем, какой по счету в нем искомый дочерний элемент и возвращаем
  const children = Array.from(htmlEl.parentElement.children);
  const index = children.findIndex((child) => child === htmlEl);
  return `${htmlEl.tagName.toLowerCase()}:nth-child(${index + 1})`;
}

export function getPath(htmlEl) {
  // Если есть id возвращаем его
  if (htmlEl.id) return `#${htmlEl.id}`;
  // Ищем, какой элемент по счету в родителе
  let selector = getNthChild(htmlEl);
  // Если есть классы
  if (htmlEl.hasAttribute('class') && htmlEl.className.length)
    selector = `${selector}.${htmlEl.className.split(' ').join('.')}`;
  // Идем вверх по дереву и строим цепочку селектов типа div > div, параллельно добавляем классы и id к элементам
  // eslint-disable-next-line no-cond-assign, no-param-reassign
  while ((htmlEl = htmlEl.parentElement)) {
    // Если дошли до body, выходим из цикла
    if (htmlEl.tagName === 'BODY') {
      selector = `body>${selector}`;
      break;
    } else {
      let parentSelector;
      // если есть родитель с id, выходим и начинаем путь с него
      if (htmlEl.id) {
        selector = `#${htmlEl.id}>${selector}`;
        break;
      }
      // добавляем nth-child на каждого найденого родителя
      parentSelector = getNthChild(htmlEl);
      // добавляем классы на каждого найденого родителя
      parentSelector = htmlEl.hasAttribute('class')
        ? `${parentSelector}.${htmlEl.className.split(' ').join('.')}`
        : parentSelector;

      selector = `${parentSelector}>${selector}`;
    }
  }

  return selector;
}
