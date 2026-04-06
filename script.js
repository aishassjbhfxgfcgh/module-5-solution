(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "data/categories.json";

  // Утилита AJAX уже есть
  var $ajaxUtils = window.$ajaxUtils;

  // Загружаем главную страницу
  document.addEventListener("DOMContentLoaded", function () {
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML);
  });

  // 🔥 STEP 1: случайная категория
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  // 🔥 STEP 2: вставка HTML
  function buildAndShowHomeHTML(categories) {
    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {

      var randomCategory = chooseRandomCategory(categories);

      // ⚠️ ОБЯЗАТЕЛЬНО с кавычками!
      var randomCategoryShortName = "'" + randomCategory.short_name + "'";

      homeHtml = insertProperty(
        homeHtml,
        "randomCategoryShortName",
        randomCategoryShortName
      );

      insertHtml("#main-content", homeHtml);
    }, false);
  }

  // Вставка HTML в страницу
  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  }

  // Замена {{property}}
  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  }

  global.$dc = dc;

})(window);
