import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'

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
    <div className="container mx-auto p-1">
      <MapContainer center={myGps ? myGps : [21.574674568874638, 105.81164980996522]} zoom={13} scrollWheelZoom={false} style={{ width: windowDimensions.width * 0.7, height: windowDimensions.height / 2 }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapControl gps={gps} />
        {myGps && (
          <Marker position={myGps}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
