import { useState } from 'react'
import Map from './Map'
import { Submit } from './Submit'
import List from './List'

export default function Observe() {
  const [gps, setGps] = useState({})

  return (
    <div className="p-2 mx-auto container">
      <Submit gps={gps} setGps={setGps} />
      <Map gps={gps} setGps={setGps} />
      <List />
    </div>
  )
}
