import { useEffect, useState } from "react"

function Address({ currentBusiness, currentLat, currentLong, apiKey }) {

    const [address, setAddress] = useState('')


    useEffect(async () => {
        const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${+currentBusiness.current_lat},${+currentBusiness.current_long}&key=${apiKey}`)
        const json = await result.json()
        // console.log('********', json.results[0])
        setAddress(json.results[0].formatted_address)
    }, [])

    return (
        <>
            {/* <a href={`https://www.google.com/maps/dir/${+currentBusiness.current_lat},${+currentBusiness.current_long}/${currentLat},${currentLong}`} target="_blank" rel="noopener noreferrer"> */}
            {currentLat && currentLong ? (

                <a href={`https://www.google.com/maps/dir/${currentLat},${currentLong}/${+currentBusiness.current_lat},${+currentBusiness.current_long}`} target="_blank" rel="noopener noreferrer">
                    {/* Located at: 555 E street, Washington D.C */}
                    Located at: {address}
                </a>
            ) : (<div>Located at: {address}
            </div>)
            }
        </>
    )
}
export default Address
