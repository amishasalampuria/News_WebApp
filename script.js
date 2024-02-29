const API = '8c849680f7db4a44a72630aee9ed23d1';
const url ='https://newsapi.org/v2/everything?q=';

window.addEventListener('load', ()=>(fetchNews("India")));

function reload(){
   window.location.reload();
}


async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API}`);
   const data =  await res.json();
   getData(data.articles);
}
function getData(articles){
   const cardsContainer = document.getElementById('cards-container');
   const newsCardTemplate = document.getElementById('template-news-card'); 

   cardsContainer.innerHTML = '';

   articles.forEach((article) =>{
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillData(cardClone, article);
      cardsContainer.appendChild(cardClone);
   })
}

   function fillData(cardClone, article){
      
      const newsImg = cardClone.getElementById("news-img");
      const newsTitle = cardClone.getElementById("news-title");
      const newsSource = cardClone.getElementById("news-source");
      const newsDesc = cardClone.getElementById("news-desc");

      newsImg.src = article.urlToImage;
      newsTitle.innerHTML = article.title;
      newsDesc.innerHTML =article.description;

      const date = new Date(article.publishedAt).toLocaleString("en-US", {
         timeZone: "Asia/Kolkata",
     });

     newsSource.innerHTML =` ${article.source.name} - ${date}`;

     cardClone.firstElementChild.addEventListener('click',()=>{
         window.open(article.url, "_blank");
     })

   }
   
   let currSelectedNav = null;
   function clickedNavItem(id){
      fetchNews(id);
      const InpTxt =  document.getElementById("text");
      InpTxt.value = '';
      const navItem = document.getElementById(id);
      currSelectedNav?.classList.remove('active');
      currSelectedNav = navItem;
      currSelectedNav.classList.add('active');
   }

   const searchText = document.getElementById("text");
   const searchBtn =  document.getElementById("btn");
   
   searchBtn.addEventListener('click', ()=>{
      const query = searchText.value;
      if(!query) return;
      fetchNews(query);
      currSelectedNav?.classList.remove('active');
      currSelectedNav = null;
   
   })
   
