import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import s from './map.module.css'
export default function Index() {
  const location = useLocation()
  const [longitude, setLongitude] = useState(null)
  const [latitude, setLatitude] = useState(null)
  useEffect(() => {
    if (location.state.userLocation) {
      setLatitude(location.state.userLocation.latitude)
      setLongitude(location.state.userLocation.longitude)
    }
  }, [])
  return (
    <div className={s.map_pannel}>
      {longitude && latitude ? (
        <iframe
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`}
          width="100%"
          height="100%"
        ></iframe>
      ) : (
        <>
          <div className={s.ring}></div>
          <span className={s.loadeing_screen}>Lodeing...</span>
        </>
      )}
    </div>
  )
}
