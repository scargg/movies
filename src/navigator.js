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
}

const renderMovie = () => {
    console.log('movie');
}

const renderCategory = () => {
    console.log('category');
    header2.classList.remove('inactive')
    header.classList.add('inactive')
    trendingContainer.classList.add('inactive')
    categoriesContainer.classList.add('inactive')
}

const renderHome = () => {
    header2.classList.add('inactive')
    getTrendingMovies()
    getGenres()
    trendingContainer.classList.remove('inactive')
    categoriesContainer.classList.remove('inactive')
    header.classList.remove('inactive')
}


