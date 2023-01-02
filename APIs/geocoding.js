require('dotenv').config()
const request = require('request-promise')


const geocoding = async (address) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.API_ACCESS_KEY}&query=${address}`

    try {
        if (address.length < 3) throw new Error('You must provide at least 3 characters')

        const response = await request(url)
        const coords = JSON.parse(response)

        if (!coords.data[0]) throw new Error('Location not found! enter a valid name')

        return coords.data[0]
    } catch (e) {
        throw e
    }
}

module.exports = geocoding