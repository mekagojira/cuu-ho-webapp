import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'

// Custom icon
const CurrentLocation = L.icon({
  iconUrl: '/current.png', // Replace with your image path
  iconSize: [50, 50], // Size of the icon
  iconAnchor: [20, 20], // Point of the icon which will correspond to marker's location
})

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function MapControl({ gps }) {
  const map = useMap()
  useEffect(() => {
    if (gps?.x && gps?.y) {
      map.setView([gps.x, gps.y], map.getZoom())
    }
  }, [gps])

  return null
}

export default function Map({ gps }) {
  const myGps = gps?.x && gps?.y ? [gps.x, gps.y] : null

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="">
      <MapContainer center={myGps ? myGps : [21.574674568874638, 105.81164980996522]} zoom={13} scrollWheelZoom={false} style={{ width: windowDimensions.width * 1, height: windowDimensions.height * 0.75 }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />{' '}
        <MapControl gps={gps} />
        {myGps && (
          <Marker position={myGps} icon={CurrentLocation}>
            <Popup>Địa chỉ của bạn:</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
