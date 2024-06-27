const API_KEY = '3044ed5bc92946e78cf38e09f9773b92';
const url = 'https://newsapi.org/v2/everything?q=';

function reload() {
  window.location.reload();
}

window.addEventListener('load', () => fetchnews('India'));

async function fetchnews(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  // fetch is a async operation used to get some info from the server
  const data = await response.json();
  bindData(data.articles);
}
function bindData(articles) {
  const maincardcontainer = document.getElementById('maincontainer');
  const templatednews = document.getElementById('templatenews');
  maincardcontainer.innerHTML = '';
  articles.forEach((element) => {
    if (!element.urlToImage) return;
    const clone = templatednews.content.cloneNode(true);
    // clone.innerHTML= templatenews.innerHTML;
    filldata(clone, element);
    maincardcontainer.appendChild(clone);
  });
}

function filldata(clone, element) {
  const newsimage = clone.querySelector('#news-image');
  const newstitle = clone.querySelector('#newstitle');
  const newssource = clone.querySelector('#news-source');
  const newsdesc = clone.querySelector('#news-desc');
  newsimage.src = element.urlToImage;
  newstitle.innerHTML = element.title;
  newsdesc.innerHTML = element.description;
  newssource.innerHTML = element.source.name;
  clone.firstElementChild.addEventListener('click', () => {
    window.open(element.url, '_blank');
  });
}
let check = null;
function navigation(id) {
  fetchnews(id);
  const currentselectedoption = document.getElementById(id);
  if (check != null) {
    check.classList.remove('active');
  }
  check = currentselectedoption;
  check.classList.add('active');
}

const searchtext = document.getElementById('search-text');
const searchbutton = document.getElementById('search-button');

searchbutton.addEventListener('click', () => {
  if (searchtext.value == null) {
    return;
  }
  fetchnews(searchtext.value);
  check.classList.remove('active');
  check = null;
});
