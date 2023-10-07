const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day'
const btnError = document.querySelector('.error')
const trendingMovies = document.querySelector('.trending-movies')
const imgBaseUrl = 'https://image.tmdb.org/t/p/w300'
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list'
const urlMovieGenrer = 'https://api.themoviedb.org/3/discover/movie?with_genres='
header2DivImg.onclick = () => location.hash = '#home'
const btnSeeMore = document.querySelector('.seeMore')

const getTrendingMovies = async () => {
    const res = await fetch(`${urlTrendingMovies}?api_key=${apiKey}`)
    const data = await res.json()
    const movie = data.results
    console.log(movie);
    if (res.status!==200) {
        btnError.classList.remove('inactive')
        btnError.innerHTML = `Ocurrio un error: ${res.status} ${movie.message}`
    }else{
        trendingMovies.innerHTML= ''
        movie.forEach(movie => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            img.setAttribute('src',`${imgBaseUrl}${movie.poster_path}`)
            article.append(img)
            trendingMovies.append(article)
        });
    }
}

const getGenres = async () => {
    const res = await fetch(`${urlGenres}?api_key=${apiKey}`)
    const data = await res.json()
    if (res.status!=200) {
        console.log('ocurrio un error '+res.status);
    }else{
        const categoryList = document.querySelector('.categories-list')
        categoryList.innerHTML=''
        const genres = data.genres
        console.log(genres);
        genres.forEach(genrer => {
            const div = document.createElement('div')
            const a = document.createElement('a')
            a.setAttribute('id',`id${genrer.id}`)
            a.innerHTML=genrer.name
            div.append(a)
            categoryList.append(div)
            a.onclick = () => {
                location.hash = '#category='
                header2Title.setAttribute('id',`id${genrer.id}`)
                header2Title.innerHTML = genrer.name
                loadCategoryMovie(genrer.id)
            }
        })
    }
}
const loadCategoryMovie = async (id) => {
    const res = await fetch(`${urlMovieGenrer}${id}`,{
        method:'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    const data = await res.json()
    const movies = await data.results
    console.log(movies);
    categoryMovies.innerHTML = ''
    movies.forEach(movie => {
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute('src',`${imgBaseUrl}${movie.poster_path}`)
        article.append(img)
        categoryMovies.append(article)
    });
}

