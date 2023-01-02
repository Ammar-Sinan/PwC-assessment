mapboxgl.accessToken = 'pk.eyJ1Ijoic2luYW4wMCIsImEiOiJjbGNkaXJtZTkwZTdmM3dwdTl1eWJxaTR6In0.E_ufz0f44EbyI-EL0-13Fg'

const success = (position) => {
    showMap(position.coords)
    console.log('TESST:', position)
}

const error = () => {
    //in case browser failed to identify the user location
    const coords = {
        longitude: 35.9106,
        latitude: 31.9539
    }
    showMap(coords)  
}

navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true })

const showMap = ({ longitude, latitude }) => {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        cooperativeGestures: true,
        zoom: 13
    });

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav)
}

const showError = (error) => {
    document.getElementById('error').innerHTML = error
}

const showQueryResult = (city, country) => {
    let text = city + ', ' + country
    if (!city) {
         text = ''
    }
    document.getElementById('search-result').innerHTML = text
}

const searchForm = document.querySelector('form')
const search = document.querySelector('input')
let searchResult = document.querySelector('#search-result')

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    let location = search.value
    
    try {
        const response = await fetch(`/search?address=${location}`)

        if (!response.ok) {
            const e = await response.text()
            throw new Error(e)
        }
        const result = await response.json();
        searchResult = result.location.city + ',' + result.location.country
        showMap(result.location)
        showQueryResult(result.location.name, result.location.country)
        showError('')
    } catch (e) {
        showError(e.message)
        showQueryResult('', '')
    }
})

