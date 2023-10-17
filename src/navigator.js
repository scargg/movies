headerButton.addEventListener('click', () => {
    location.hash = '#search='+headerInput.value;
  });

  header2DivImg.addEventListener('click', () => {
    location.hash = '#home';
  });

window.addEventListener('load', navigator,true)
window.addEventListener('hashchange', navigator,false)

function navigator () {
    (location.hash.startsWith('#search='))? renderSearch():
    (location.hash.startsWith('#movie='))? renderMovie():
    (location.hash.startsWith('#category='))? renderCategory(): renderHome()

    location.hash
}

const renderSearch = () => {
    header2.classList.add('inactive')
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    headerArrow.classList.remove('inactive')
    movieDetails.classList.add('inactive')
    searchMovie.classList.remove('inactive')
    const url = location.hash.split('=')
    getMovieSearch(url[1])
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
    const url = location.hash.split('=')
    const urlId = url[1].split('-')
    header2Title.setAttribute('id',`id${urlId[0]}`)
    header2Title.innerHTML = urlId[1]
    loadCategoryMovie(urlId[0])
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
    getGenres()
    getTrendingMovies()
}

