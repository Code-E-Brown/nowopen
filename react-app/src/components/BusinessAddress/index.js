import { useEffect, useState } from "react"

function Address({ currentBusiness, currentLat, currentLong, apiKey }) {

    const [address, setAddress] = useState('')


    // useEffect(async () => {
    //     const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${+currentBusiness.currentBusiness.current_lat},${+currentBusiness.currentBusiness.current_long}&key=${apiKey}`)
    //     console.log('**************L OOKS', result)
    // }, [])

    return (
        <a href={`https://www.google.com/maps/dir/${+currentBusiness.current_lat},${+currentBusiness.current_long}/${currentLat},${currentLong}`} target="_blank" rel="noopener noreferrer">
            {/* Located at: 555 E street, Washington D.C */}
            Get directions!
        </a>
    )
}
export default Address
