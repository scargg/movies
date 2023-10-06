const trendingMovies = document.querySelector('.trending-movies')
const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day'
const btnError = document.querySelector('.error')
const trendingContainer = document.querySelector('.trending-movies')
const imgBaseUrl = 'https://image.tmdb.org/t/p/w300'
const getTrendingMovies = async () => {
    const res = await fetch(`${urlTrendingMovies}?api_key=${apiKey}`)
    const data = await res.json()
    const movie = data.results
    console.log(movie);
    if (res.status!==200) {
        btnError.classList.remove('inactive')
        btnError.innerHTML = `Ocurrio un error: ${res.status} ${movie.message}`
    }else{
        trendingContainer.innerHTML= ''
        movie.forEach(movie => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            img.setAttribute('src',`${imgBaseUrl}${movie.poster_path}`)
            article.append(img)
            trendingContainer.append(article)
        });
    }
}
getTrendingMovies()