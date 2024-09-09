import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  return (
    <div className="container mx-auto p-4">
      <MapContainer center={[21.574674568874638, 105.81164980996522]} zoom={13} scrollWheelZoom={false} style={{ width: 600, height: 600 }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  )
}
