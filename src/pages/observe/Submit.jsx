import classNames from 'classnames'
import { useState } from 'react'

function Checkbox({ checked, onChange, label }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
      <label className="ml-2 text-gray-700">{label}</label>
    </div>
  )
}

function Input({ v, onChange, i, label, placeholder, textarea, num }) {
  return (
    <div className="my-1">
      <label htmlFor={i} className="text-slate-900">
        {label}
      </label>
      {textarea ? (
        <textarea value={v} onChange={e => onChange(e.target.val)} id={i} className="w-full px-3 py-2 rounded border " placeholder={placeholder || label || ''} type={num ? 'number' : 'text'} />
      ) : (
        <input value={v} onChange={e => onChange(e.target.val)} id={i} className="w-full px-3 py-2 rounded border " placeholder={placeholder || label || ''} type={num ? 'number' : 'text'} />
      )}
    </div>
  )
}

export function Submit({ setGps }) {
  const elderlyOrDisabled = ['Người già', 'Người khuyết tật']
  const assistanceNeeded = ['Tôi cần cứu hộ áo phao', 'Tôi cần cứu hộ thực phẩm', 'Tôi cần cứu hộ y tế', 'Khác']

  const regions = ['Thái Nguyên', 'Phú Thọ']
  const [detail, setDetail] = useState('')
  const [phone, setPhone] = useState('')
  const [phone1, setPhone1] = useState('')
  const [address, setAddress] = useState('')
  const [qty, setQty] = useState(0)
  const [assists, setAssists] = useState({})
  const [elderly, setElderly] = useState({})

  const getGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setGps({ x: latitude, y: longitude })
        },
        error => {
          console.error('Có lỗi khi lấy GPS:', error)
        }
      )
    } else {
      alert('Thiết bị của bạn không hỗ trợ GPS')
    }
  }

  return (
    <div className="px-2">
      <h1 className="font-bold text-3xl uppercase">congdongcuuho</h1>
      <div className="py-4" />
      <form
        className="block bg-white rounded px-3 py-5 shadow"
        onSubmit={e => {
          e.preventDefault()
        }}>
        <Input i="phone" v={phone} onChange={setPhone} label={'SĐT LIÊN HỆ 1'} placeholder={'Nhập SĐT LIÊN HỆ 1'} />
        <Input i="phone1" v={phone1} onChange={setPhone1} label={'SĐT LIÊN HỆ 2'} placeholder={'Nhập SĐT LIÊN HỆ 2'} />

        <Input num i="phone1" v={qty} onChange={setQty} label={'Số người cần hỗ trợ'} placeholder={'Số người cần hỗ trợ'} />

        <Input i="detail" v={address} onChange={setAddress} label={'Địa chỉ cụ thể'} placeholder={'Nhập thông tin cứu hộ'} textarea />

        <div className="py-1">
          <h2 className="text-lg font-semibold mb-2">Có người già/người khuyết tật không:</h2>
          {elderlyOrDisabled.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="checkbox" name={item} checked={elderly[item] || false} onChange={() => setElderly({ ...assists, [item]: true })} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
              <label className="ml-2 text-gray-700">{item}</label>
            </div>
          ))}
        </div>

        <div className="py-1">
          <h2 className="text-lg font-semibold mb-2">Hỗ trợ cần thiết:</h2>
          {assistanceNeeded.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="checkbox" name={item} checked={assists[item] || false} onChange={() => setAssists({ ...assists, [item]: true })} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
              <label className="ml-2 text-gray-700">{item}</label>
            </div>
          ))}
        </div>
        <Input i="phone" v={detail} onChange={setDetail} label={'Nội dung cứu hộ'} placeholder={'Nội dung cứu hộ'} textarea />

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
