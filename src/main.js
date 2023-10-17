const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/day'
const btnError = document.querySelector('.error')
const trendingMovies = document.querySelector('.trending-movies')
const imgBaseUrl = 'https://image.tmdb.org/t/p/w300'
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list'
const urlMovieGenrer = 'https://api.themoviedb.org/3/discover/movie?with_genres='
const urlSearchMovie = 'https://api.themoviedb.org/3/search/movie?query='
const urlMovieDetails = 'https://api.themoviedb.org/3/movie/'


let lazyLoader = new IntersectionObserver ((entries) => {
    entries.forEach (entry => {

        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src',url)
        }
            
    })
})

const createMovie = (movies,container,lazyLoading = false) => {
    container.innerHTML = ''
    movies.forEach(movie => {
        const article = document.createElement('article')
        const img = document.createElement('img')
        article.append(img)
        img.setAttribute(lazyLoading?'data-img' : 'src' , `${imgBaseUrl}${movie.poster_path}`)
        container.append(article)
        article.onclick = () => {
            location.hash = `#movie=${movie.id}-${movie.title}`;
        }
        if (lazyLoading) {
            lazyLoader.observe(img)
        }
    });
}
const getTrendingMovies = async () => {
    const res = await fetch(`${urlTrendingMovies}?api_key=${apiKey}`)
    const data = await res.json()
    const movie = data.results
    if (res.status!==200) {
        btnError.classList.remove('inactive')
        btnError.innerHTML = `Ocurrio un error: ${res.status} ${movie.message}`
    }else{
        createMovie(movie,trendingMovies,true)     
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
    const movies = await data.results
    if (res.status !== 200) {
        console.log('error');
    }else {
        createMovie(movies,categoryMovies,true)
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
    if (res.status!==200) {
        console.log('ocurrio un error'+res.status);
    }else {
        const movie = data.results
        if (movie.length!=0) {
            createMovie(movie,searchMovie,true)
        }else{
            const h2 = document.createElement('h2')
            h2.innerText = 'No tenemos el titulo'
            searchMovie.append(h2)
        }
    }
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
