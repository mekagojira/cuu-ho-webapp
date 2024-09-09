import classNames from 'classnames'
import { useState } from 'react'

export function Submit() {
  const regions = ['Thái Nguyên', 'Phú Thọ']
  const [region, setRegion] = useState(regions[0])

  return (
    <div className="p-2">
      <h1 className="font-bold text-lg uppercase">Đăng tin</h1>
      <form className="block">
        <label htmlFor="input" className="text-slate-400 font-bold">
          Nhập thông tin của bạn (số người , nước dâng cao tới đâu, nhà mấy tầng, mô tả địa chỉ).
        </label>
        <input id="input" className="w-full px-3 py-2 rounded border " placeholder="Nhập thông tin cứu hộ" />
        <div className="py-2" />
        <div className="flex space-x-4 flex-wrap">
          {regions.map((item, i) => (
            <button key={i} className={classNames('font-bold rounded uppercase px-3 py-2 border', region === item ? 'bg-red-500 border-red-500 text-white' : 'bg-white text-black border-slate-500')} onClick={() => setRegion(item)}>
              {item}
            </button>
          ))}
          <input placeholder="Nhập khu vực của bạn" className="px-3 py-2 rounded border border-slate-500" />
        </div>
      </form>
    </div>
  )
}
