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
    <div className="">
      <MapContainer center={myGps ? myGps : [21.574674568874638, 105.81164980996522]} zoom={13} scrollWheelZoom={false} style={{ width: windowDimensions.width * 1, height: windowDimensions.height * 0.75 }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapControl gps={gps} />
        {myGps && (
          <Marker position={myGps}>
            13123hkj
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
