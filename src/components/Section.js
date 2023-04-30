export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка данных на странице
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }

  // Добавление элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
