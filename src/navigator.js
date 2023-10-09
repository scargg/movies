window.addEventListener('load', navigator,false)
window.addEventListener('hashchange', navigator,false)

function navigator () {
    console.log({location});
    (location.hash.startsWith('#trends'))? renderTrends():
    (location.hash.startsWith('#search='))? renderSearch():
    (location.hash.startsWith('#movie='))? renderMovie():
    (location.hash.startsWith('#category='))? renderCategory(): renderHome()
}

const renderTrends = () => {
    console.log('trends');
}

const renderSearch = () => {
    console.log('search');
    header2.classList.add('inactive')
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    headerArrow.classList.remove('inactive')
}

const renderMovie = () => {
    console.log('movie');
    categoriesContainer.classList.add('inactive')
    movieDetails.classList.remove('inactive')
    trendingContainer.classList.add('inactive')
    categoryMovies.classList.add('inactive')
    searchMovie.classList.add('inactive')
    headerArrow.classList.remove('inactive')
    headerTitle.classList.add('inactive')
    headerForm.classList.add('inactive')
    header2.classList.add('inactive')

}

const renderCategory = () => {
    console.log('category');
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
    header2.classList.remove('inactive')
    header2DivImg.classList.remove('inactive')
}

const renderHome = () => {
    header2.classList.add('inactive')
    getTrendingMovies()
    getGenres()
    trendingContainer.classList.remove('inactive')
    categoriesContainer.classList.remove('inactive')
    header.classList.remove('inactive')
    headerArrow.classList.add('inactive')
    headerForm.classList.remove('inactive')
    headerTitle.classList.remove('inactive')
    movieDetails.classList.add('inactive')
}


