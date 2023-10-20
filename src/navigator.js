let maxPage
let page = 1
let infiniteScroll

headerButton.addEventListener('click', () => {
    let query = headerInput.value
    location.hash = '#search='+query;
  });

header2DivImg.addEventListener('click', () => {
    history.back();
  });
seeMore.addEventListener('click',() => {
    location.hash = '#trends'
})
window.addEventListener('load', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, false)
window.addEventListener('hashchange', ()=>{page = 1;console.log(page);})

function navigator () {

    if(infiniteScroll){window.removeEventListener('scroll',infiniteScroll, false); infiniteScroll = undefined}

    (location.hash.startsWith('#trends'))? renderTrends():
    (location.hash.startsWith('#search='))? renderSearch():
    (location.hash.startsWith('#movie='))? renderMovie():
    (location.hash.startsWith('#category='))? renderCategory(): renderHome()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if(infiniteScroll){window.addEventListener('scroll',infiniteScroll, false)}

}

const renderTrends = () => {
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    trendingPagesContainer.classList.remove('inactive')
    headerArrow.classList.remove('inactive')
    header2.classList.add('inactive')
    searchMovie.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    movieDetails.classList.add('inactive')
    favourites.classList.add('inactive')
    loadTrendingPages()
    infiniteScroll = loadPaginetedPages
}
const renderSearch = () => {
    headerForm.classList.remove('inactive')
    trendingPagesContainer.classList.add('inactive')
    header2.classList.add('inactive')
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    headerArrow.classList.remove('inactive')
    movieDetails.classList.add('inactive')
    searchMovie.classList.remove('inactive')
    favourites.classList.add('inactive')
    const url = location.hash.split('=')
    console.log(url[1])
    getMovieSearch(url[1])
    infiniteScroll = getMovieSearchPages(url[1])
}

const renderMovie = () => {
    categoriesContainer.classList.add('inactive')
    movieDetails.classList.remove('inactive')
    trendingContainer.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    searchMovie.classList.add('inactive')
    headerArrow.classList.remove('inactive')
    headerTitle.classList.add('inactive')
    headerForm.classList.add('inactive')
    header2.classList.add('inactive')
    trendingPagesContainer.classList.add('inactive')
    favourites.classList.add('inactive')
    const url = location.hash.split('=')
    const urlId = url[1].split('-')
    getMovieDetails(urlId[0])
}

const renderCategory = () => {
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    header2.classList.remove('inactive')
    header2DivImg.classList.remove('inactive')
    categoryMovies.classList.remove('inactive')
    searchMovie.classList.add('inactive')
    movieDetails.classList.add('inactive')
    trendingPagesContainer.classList.add('inactive')
    favourites.classList.add('inactive')
    const url = location.hash.split('=')
    const urlId = url[1].split('-')
    header2Title.setAttribute('id',`id${urlId[0]}`)
    header2Title.innerHTML = urlId[1]
    loadCategoryMovie(urlId[0])
    infiniteScroll = getCategoryPages(urlId[0])

}

const renderHome = () => {
    headerForm.classList.remove('inactive')
    header.classList.remove('inactive')
    trendingContainer.classList.remove('inactive')
    categoriesContainer.classList.remove('inactive')
    headerTitle.classList.remove('inactive')
    header2.classList.add('inactive')
    headerArrow.classList.add('inactive')
    movieDetails.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    searchMovie.classList.add('inactive')
    trendingPagesContainer.classList.add('inactive')
    favourites.classList.remove('inactive')
    getGenres()
    getTrendingMovies()
    getLikedMovies()
}

