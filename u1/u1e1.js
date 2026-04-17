// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

// MGG - recoger todos los items js-item y transformarlos en un array
var getItems = function () {
  var items = document.querySelectorAll(".js-item");
  var result = [];
  items.forEach(function (item) {
    result.push({
      id: item.getAttribute("data-id"),
      es: item.getAttribute("data-es"),
      en: item.getAttribute("data-en"),
    });
  });
  return result;
};

// MGG - vaciar el contenido del nodo con clase js-list
var emptyList = function () {
  var list = document.querySelector(".js-list");
  list.innerHTML = "";
};

// MGG - renderizar una lista de items en un nodo con clase js-list
var renderList = function (itemList, lang) {
  emptyList();
  var list = document.querySelector(".js-list");
  itemList.forEach(function (item) {
    var li = document.createElement("li");
    li.className = "js-item";
    li.setAttribute("data-id", item.id);
    li.setAttribute("data-es", item.es);
    li.setAttribute("data-en", item.en);
    li.textContent = item[lang];
    list.appendChild(li);
  });
};

// MGG - añadir la clase highlight a un item con un id concreto
var updateItemStyle = function (idItem) {
  var item = document.querySelector('.js-item[data-id="' + idItem + '"]');
  if (item) {
    item.classList.add("highlight");
  }
};

// MGG - ejecutar las funciones
const words = getItems();
renderList(words, "en");
updateItemStyle("2");
updateItemStyle("4");
