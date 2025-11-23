/*
 * - Пагінація
 1. Отримати посилання на елементи
 2. Зробити запит за новинами, зробити ф-ю, яка буде шукати articles
 * - вказати параметри сторінка і кількість на сторінці
 4. Обробка submit форми - Завантажуємо статті при надсиланні форми
 5.  Завантажуємо статті при натисканні на кнопку «Завантажити ще»
 * - Оновлюємо сторінку в параметрах запиту
 3. Створити ф-ю renderMarkup - Малюємо статті
 * - Скидаємо значення при пошуку за новим критерієм

// ДОДАТКОВО
// Валідація інпуту
// Налаштувати появу і зникненя кнопки load more
// Налаштувати спінер
// Слідкувати за правильною сторінкою(скидати значення page)
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 *
 * Додатково
 * створити клас NewsApiService в якому буде реалізована вся логіка роботи
 * з публічним API: зберігання параметрів запиту (query, page),
 * методи отримання статтей fetchArticles, incrementPage, resetPage,
 * геттери та сеттери запиту. js-articles-container https://newsapi.org/v2/everything?q=keyword&apiKey=API_KEY
 */ 
// const API_KEY = 'ccbf2b8d847e4e1ba3713150a403ae30';
const API_KEY = '4330ebfabc654a6992c2aa792f3173a3';
const BASE_URL = 'https://newsapi.org/v2/'
const articlesContainer = document.querySelector(".js-articles-container")
const loadMoreBtn = document.querySelector(".btn-primary")
const form = document.querySelector(".js-search-form")
const tamplate = document.querySelector("#news-templ")

let page = 1;
let qery = '';

function renderNews(news) {
  // по id знаходимо тег template і його контент у вигляді рядка(innerHTML)
  const newsTamplate = tamplate.innerHTML;
  // .compile() запускає компіляцію шаблону pokemonTempl і повертає функцію template,
  const template = Handlebars.compile(newsTamplate);
  // далі викликаємо ф-цію template з даними pokemon і отримуємо рядок-результат
  const markup = template(news);
  articlesContainer.insertAdjacentHTML( 'beforeend' , markup);
}



const onSubmitForm = (event) => {
    event.preventDefault()
    console.log(event.currentTarget.elements.query.value)
    page = 1;
    qery = event.currentTarget.elements.query.value;
fetchNews()
.then((result) => {
    renderNews(result.articles)
})
.catch((error) => console.log(error)
)

}

const fetchNews = () =>{
    return fetch(`${BASE_URL}everything?q=${qery}d&apiKey=${API_KEY}&pageSize=12&page=${page}`)
    .then((result) =>{
// console.log(result)
return result.json()
    })
}

const onClickLoadMore = (event) =>{
page += 1;
fetchNews()
}


form.addEventListener("submit" , onSubmitForm)

loadMoreBtn.addEventListener("click" , onClickLoadMore)




