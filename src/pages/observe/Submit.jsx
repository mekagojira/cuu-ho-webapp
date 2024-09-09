import classNames from 'classnames'
import { useState } from 'react'

function Input({ v, onChange, i, label, placeholder, textarea }) {
  return (
    <div className="my-1">
      <label htmlFor={i} className="text-slate-900">
        {label}
      </label>
      {textarea ? (
        <textarea value={v} onChange={e => onChange(e.target.val)} id={i} className="w-full px-3 py-2 rounded border " placeholder={placeholder || label || ''} />
      ) : (
        <input value={v} onChange={e => onChange(e.target.val)} id={i} className="w-full px-3 py-2 rounded border " placeholder={placeholder || label || ''} />
      )}
    </div>
  )
}

export function Submit({ setGps }) {
  const regions = ['Thái Nguyên', 'Phú Thọ']
  const [detail, setDetail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
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
      <h1 className="font-bold text-3xl uppercase">congdongcuuho</h1>
      <div className="py-4" />
      <form
        className="block bg-white rounded px-3 py-5 shadow"
        onSubmit={e => {
          e.preventDefault()
        }}>
        <Input i="phone" v={phone} onChange={setPhone} label={'SĐT LIÊN HỆ'} placeholder={'Nhập SĐT LIÊN HỆ'} />
        <Input i="detail" v={address} onChange={setAddress} label={'Địa chỉ cụ thể (số người , nước dâng cao tới đâu, nhà mấy tầng, mô tả địa chỉ).'} placeholder={'Nhập thông tin cứu hộ'} textarea />
        <Input i="phone" v={detail} onChange={setDetail} label={'Nội dung cứu hộ'} placeholder={'Nội dung cứu hộ'} textarea />

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
