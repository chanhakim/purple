const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('531cd611b17d4513bafd22e8836383d8');

newsapi.v2.everything({
  q: 'health',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2021-1-13',
  to: '2021-1-30',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});