import { useState } from 'react'
import Map from './Map'
import { Submit } from './Submit'
import List from './List'

export default function Observe() {
  const [gps, setGps] = useState({})

  return (
    <div className="p-2">
      <div className="mx-auto container">
        <Submit gps={gps} setGps={setGps} />
      </div>
      <div className="pt-8" />
      <Map gps={gps} setGps={setGps} />
      <div className="pt-8" />
      <div className="mx-auto container">
        <List />
      </div>
    </div>
  )
}
