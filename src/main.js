const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day'
const btnError = document.querySelector('.error')
const trendingMovies = document.querySelector('.trending-movies')
const imgBaseUrl = 'https://image.tmdb.org/t/p/w300'
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list'
const urlMovieGenrer = 'https://api.themoviedb.org/3/discover/movie?with_genres='
const urlSearchMovie = 'https://api.themoviedb.org/3/search/movie?query='
const urlMovieDetails = 'https://api.themoviedb.org/3/movie/'

function likedMoviesList () {
    const item = JSON.parse(localStorage.getItem('liked_movies'))
    let movies

    if (item) {
        movies = item
    } else {
        movies = {}
    }
    return movies
}

function likeMovie (movie) {
    const likedMovies = likedMoviesList()

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies))
}

let lazyLoader = new IntersectionObserver ((entries) => {
    entries.forEach (entry => {

        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src',url)
        }
            
    })
})

const createMovie = (movies, container, {lazyLoading = false, clean = true}) => {
    if (clean) {container.innerHTML = ''}
    movies.forEach(movie => {
        const article = document.createElement('article')
        const img = document.createElement('img')
        article.append(img)
        img.setAttribute(lazyLoading?'data-img' : 'src' , `${imgBaseUrl}${movie.poster_path}`)
        const btnLike = document.createElement('button')
        btnLike.classList.add('btn-like')
        article.append(btnLike)
        container.append(article)
        likedMoviesList()[movie.id]? btnLike.classList.add('btn-liked') : btnLike.classList.add('btn-like')
        btnLike.onclick = () => {
            btnLike.classList.toggle('btn-liked')
            likeMovie(movie)
            getLikedMovies()
        }
        img.onclick = () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        }
        if (lazyLoading) {
            lazyLoader.observe(img)
        }
    });
}
const getTrendingMovies = async () => {
    const res = await fetch(`${urlTrendingMovies}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    const data = await res.json()
    const movie = data.results
    if (res.status!==200) {
        btnError.classList.remove('inactive')
        btnError.innerHTML = `Ocurrio un error: ${res.status} ${movie.message}`
    }else{
        createMovie(movie,trendingMovies,{lazyLoading : true , clean : true})     
    }
}

const loadTrendingPages = async () => {
    const res = await fetch(`${urlTrendingMovies}`,{
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    const data = await res.json()
    maxPage = data.total_pages
    console.log(maxPage);
    const movies = data.results
    
    if (res.status!==200) {
        btnError.classList.remove('inactive')
        btnError.innerHTML = `Ocurrio un error: ${res.status} ${movie.message}`
    }else{
        createMovie(movies,trendingPages,{lazyLoading : true , clean : true})
        //const btnMoreTrending = document.createElement('button')
        //btnMoreTrending.innerText = 'More'
        //trendingPagesContainer.appendChild(btnMoreTrending)
        //btnMoreTrending.onclick = () => {
        //    btnMoreTrending.remove()
        //    loadTrendingPages(page + 1)
        //}
        
    }
}
const loadPaginetedPages = async () => {

    const {scrollTop,scrollHeight,clientHeight} = document.documentElement
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight
    const pageIsNotMax = page <= maxPage
    if (scrollIsBottom && pageIsNotMax) {
        page++;

        const res = await fetch(`${urlTrendingMovies}?page=${page}`,{
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
            }
        })

        const data = await res.json()
        const movies = data.results;
        createMovie(movies, trendingPages, { lazyLoad: true, clean: false })
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
        genres.forEach(genrer => {
            const div = document.createElement('div')
            const a = document.createElement('a')
            a.setAttribute('id',`id${genrer.id}`)
            a.innerHTML=genrer.name
            div.append(a)
            categoryList.append(div)
            a.onclick = () => {
                location.hash = `#category=${genrer.id}-${genrer.name}`;
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
    maxPage = data.total_pages
    const movies = await data.results
    if (res.status !== 200) {
        console.log('error');
    }else {
        createMovie(movies,categoryMovies,{lazyLoading : true , clean : true})
    }
}

function getCategoryPages  (id)  {
    return async () => {
        const {scrollTop,scrollHeight,clientHeight} = document.documentElement
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight
        const pageIsNotMax = page <= maxPage
        if (scrollIsBottom && pageIsNotMax){
            page++
            const res = await fetch(`${urlMovieGenrer}${id}&page=${page}`,{
                method:'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
                }
            })
        
            const data = await res.json()
            const movies = await data.results
            if (res.status !== 200) {
                console.log('error');
            }else {
                createMovie(movies,categoryMovies,{lazyLoading : true , clean : false})
            }
        }
    }
}

const getMovieSearch = async (query) => {
    const res = await fetch(`${urlSearchMovie}${query}`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    const data = await res.json()
    maxPage = data.total_pages
    console.log(page);
    if (res.status!==200) {
        console.log('ocurrio un error'+res.status);
    }else {
        const movie = data.results
        console.log(movie);
        createMovie(movie,searchMovie,{lazyLoading : true , clean : true}) 
    }
}

function getMovieSearchPages  (query)  {
    return async function ()  {
        const {scrollTop,scrollHeight,clientHeight} = document.documentElement
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 50
        const pageIsNotMax = page <= maxPage
        console.log(scrollIsBottom);
        if (scrollIsBottom && pageIsNotMax){
            page++
            const res = await fetch(`${urlSearchMovie}${query}&page=${page}`,{
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
                }
            })
            const data = await res.json()
            const movie = data.results
            createMovie(movie,searchMovie,{lazyLoading : true , clean : false}) 
        }
    }
}


function getLikedMovies () {
    const movieList = Object.values(likedMoviesList())
    console.log(movieList);
    createMovie(movieList,favouriteMovies,{lazyLoading: true, clean: true})
    getTrendingMovies()
}


const getMovieDetails = async (id) => {
    const res = await fetch(`${urlMovieDetails}${id}`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    if (res.status!==200) {
        console.log('ocurrio un error'+res.status);
    }else{
        movieDetails.innerHTML=''
        const data = await res.json()
        const divImgback = document.createElement('img')
        divImgback.setAttribute('src',`${imgBaseUrl}${data.poster_path}`)
        divImgback.classList.add('div-img--back')
        const divCont = document.createElement('div')
        divCont.classList.add('div-cont')
        const divTitles = document.createElement('div')
        divTitles.classList.add('similar-div--titles')
        const title = document.createElement('h2')
        const titleText = document.createTextNode(data.title)
        title.append(titleText)
        const rep = document.createElement('p')
        rep.classList.add('similar-rep')
        rep.innerText = data.vote_average
        divTitles.append(title,rep)
        const description = document.createElement('p')
        description.classList.add('similar-description')
        description.innerText = data.overview
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('categories-list--details')
        const genres = data.genres

        genres.forEach(genrer => {
            const divgenrer = document.createElement('div')
            const a = document.createElement('a')
            a.setAttribute('id',`id${genrer.id}`)
            a.innerHTML=genrer.name
            divgenrer.append(a)
            categoryDiv.append(divgenrer)
        })
        
        const similarTitle = document.createElement('h2')
        similarTitle.innerText = 'Peliculas Similares'
        loadSimilarMovies(id)
        divCont.append(divTitles,description,categoryDiv,similarTitle)
        movieDetails.append(divImgback,divCont)
    }
}
const loadSimilarMovies = async (id) => {
    const res = await fetch(`${urlMovieDetails}${id}/similar`,{
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTY1ZDkyNTYyMGJlZDBkNjFlMTQzZWMwNzA5MDM1OCIsInN1YiI6IjY1MWVmM2JhM2QzNTU3MDBmZjYxZjljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TumRxoDEGKvKFsW118O1yeiuWHAuFuTveS_dMuAGuE8'
        }
    })
    
    if (res.status!=200) {
        console.log('ocurrio un error'+res.status);
    }else{
        const data = await res.json()
        const results = data.results
        const similarDiv = document.createElement('div')
        similarDiv.innerHTML = ''
        results.forEach(movie => {
            similarDiv.classList.add('similar-div--container')
            const article = document.createElement('article')
            const img = document.createElement('img')
            img.setAttribute('src',`${imgBaseUrl}${movie.poster_path}`)
            article.append(img)
            article.onclick = () => getMovieDetails(movie.id)
            similarDiv.append(article)
            movieDetails.append(similarDiv)
        });
    }
}
