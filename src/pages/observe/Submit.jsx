import classNames from 'classnames'
import { useState } from 'react'

export function Submit({ setGps }) {
  const regions = ['Thái Nguyên', 'Phú Thọ']
  const [region, setRegion] = useState(regions[0])

  const getGps = () => {
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        position => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords
          // update the value of userlocation variable
          setGps({ x: latitude, y: longitude })
        },
        // if there was an error getting the users location
        error => {
          console.error('Error getting user location:', error)
        }
      )
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div className="p-1">
      <h1 className="font-bold text-3xl uppercase">SOS-Thái Nguyên</h1>
      <div className="py-4" />
      <form
        className="block"
        onSubmit={e => {
          e.preventDefault()
        }}>
        <label htmlFor="input" className="text-slate-400 font-bold">
          Địa chỉ cụ thể (số người , nước dâng cao tới đâu, nhà mấy tầng, mô tả địa chỉ).
        </label>
        <input id="input" className="w-full px-3 py-2 rounded border " placeholder="Nhập thông tin cứu hộ" />
        <div className="py-2" />
        <div>Khu vực bạn ở?</div>
        <div className="flex space-x-4 flex-wrap">
          {regions.map((item, i) => (
            <div key={i} className="py-1">
              <button className={classNames('font-bold rounded uppercase px-3 py-2 border', region === item ? 'bg-red-500 border-red-500 text-white' : 'bg-white text-black border-slate-500')} onClick={() => setRegion(item)}>
                {item}
              </button>
            </div>
          ))}
          <input placeholder="Nhập khu vực của bạn" className="px-3 py-2 rounded border border-slate-500" />
        </div>
        <div className="py-1" />
        <div>
          <button onClick={getGps} className="rounded font-bold px-3 py-2 bg-slate-200">
            LẤY THÔNG TIN TỌA ĐỘ
          </button>
        </div>
        <div className="py-1" />
        <div>
          <button type="submit" className="px-3 py-2 uppercase font-bold rounded shadow bg-blue-500 text-white">
            GỬI LÊN
          </button>
        </div>
      </form>
    </div>
  )
}
