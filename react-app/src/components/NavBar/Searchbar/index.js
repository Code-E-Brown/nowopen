import styles from '../NavBar.module.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useHistory } from 'react-router';

const Searchbar = ({ apiKey }) => {

    const [address, setAddress] = useState('')
    const [searchParams, setSearchParams] = useState({})
    const [searchCategory, setSearchCategory] = useState('all')
    const [coordinates, setCoordinates] = useState(null)
    // console.log('COORDS', coordinates)
    const history = useHistory()

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        console.log('hi', latLng)
        setCoordinates(latLng)
        setAddress(value)
        // console.log(results)
    }

    console.log(address)
    // const handleSetAddress = (e) => {
    //     setAddress(e)
    // }
    const handleSearchClick = () => {
        if (coordinates && address) {
            const searchInput = {
                searchCategory: searchCategory === 'all' ? searchCategory : +searchCategory,
                coordinates,
            }
            history.push(`/businesses/search/${coordinates.lat}/${coordinates.lng}/${searchCategory}`)
            // console.log(searchInput)
        }



    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    });

    return (
        <div className={styles.searchDiv}>
            <select defaultValue='What are you searching for?' onChange={e => setSearchCategory(e.target.value)} className={styles.searchInput} type='text'>
                <option className={styles.categoryPlaceHolder} disabled>What are you searching for?</option>
                <option value='1'>Food</option>
                <option value='2'>Retail</option>
                <option value='3'>Event</option>
                <option value='all'>All of the above!</option>
            </select>

            <label className={styles.searchLineLabel}></label>
            {isLoaded && (

                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={styles.searchFlex}>

                            <input {...getInputProps({ placeholder: "address, city, state or zip" })} className={styles.searchInput} type='text'></input>
                            <div style={{ position: 'absolute', height: '500px' }} >
                                <div style={{ height: "55%" }}></div>

                                <div>
                                    {loading ? <div>Loading...</div> : null}
                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? 'rgb(244, 57, 57)' : 'white',
                                            color: suggestion.active ? 'white' : 'black',
                                            fontWeight: suggestion.active ? '700' : '400',
                                            // position: "absolute",
                                            // top: "200px",
                                            // height: '500px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            width: '395px',
                                            alignItems: 'center',
                                            borderBottom: 'solid',
                                            height: '40px',
                                            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans- serif",
                                            zIndex: 900,
                                        }
                                        return (

                                            <div key={suggestion.description}{...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            )
            }
            {/* <input className={styles.searchInput} type='text'></input> */}
            <div className={styles.redSearchBox} onClick={handleSearchClick}>
                <svg
                    className={styles.magnifyingGlass}
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="50" height="50"
                    viewBox="0 0 172 172"
                    style={{ fill: 'white' }}
                ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M72.24,10.32c-32.33062,0 -58.48,26.14938 -58.48,58.48c0,32.33063 26.14938,58.48 58.48,58.48c11.54281,0 22.22563,-3.38625 31.2825,-9.1375l42.2475,42.2475l14.62,-14.62l-41.71,-41.6025c7.49813,-9.83625 12.04,-22.02406 12.04,-35.3675c0,-32.33062 -26.14937,-58.48 -58.48,-58.48zM72.24,24.08c24.76531,0 44.72,19.95469 44.72,44.72c0,24.76531 -19.95469,44.72 -44.72,44.72c-24.76531,0 -44.72,-19.95469 -44.72,-44.72c0,-24.76531 19.95469,-44.72 44.72,-44.72z"></path></g></g></svg>
            </div>
        </div >
    )
}

export default Searchbar
