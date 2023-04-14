export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка данных на странице
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  // Добавление элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
