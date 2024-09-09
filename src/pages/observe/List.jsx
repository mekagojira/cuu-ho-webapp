import { listArticles, updateStatus } from '../../lib/request/request'

import { useEffect, useState } from 'react'

function Table({ head, rows, refresh }) {
  const statusText = {
    waiting: 'Chưa cứu hộ',
    confirmed: 'Đã xác nhận',
    incomming: 'Đang cứu hộ',
    saved: 'Đã cứu hộ',
    canceled: 'Huỷ',
  }

  const onChangeStatus = async (status, id) => {
    await updateStatus(
      {
        status,
      },
      id
    )
    refresh()
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-md overflow-x-auto">
      <table className="table-auto min-w-max w-full">
        <thead>
          <tr className="bg-gray-200">
            {head.map((headerItem, index) => (
              <th key={index} className="p-2">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              {row.map((cell, cellIndex) => {
                if (cellIndex === 0 || cellIndex === 1) {
                  return (
                    <td key={cellIndex} className="p-2">
                      <a href={`tel:${cell}`}>{cell}</a>
                    </td>
                  )
                } else if (cellIndex === 2) {
                  return (
                    <td key={cellIndex} className="p-2">
                      {statusText[cell]}
                    </td>
                  )
                } else if (cellIndex === 8) {
                  return (
                    <td key={cellIndex}>
                      <div className="flex items-center justify-end gap-2 p-2">
                        <button className="p-2 bg-gray-200" onClick={() => onChangeStatus('waiting', row[8])}>
                          Chưa cứu hộ
                        </button>
                        <button className="p-2 bg-blue-200" onClick={() => onChangeStatus('confirmed', row[8])}>
                          Đã xác nhận
                        </button>
                        <button className="p-2 bg-orange-200" onClick={() => onChangeStatus('incomming', row[8])}>
                          Đang cứu hộ
                        </button>
                        <button className="p-2 bg-green-200" onClick={() => onChangeStatus('saved', row[8])}>
                          Đã cứu hộ
                        </button>
                        <button className="p-2 bg-rose-200" onClick={() => onChangeStatus('canceled', row[8])}>
                          Huỷ
                        </button>
                      </div>
                    </td>
                  )
                } else {
                  return <td key={cellIndex}>{cell}</td>
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function List() {
  const [listHelps, setListHelps] = useState([])
  const fetch = async () => {
    const response = await listArticles({})
    let tmpList = []
    if (response?.docs) {
      response?.docs?.forEach(item => {
        tmpList.push([item?.phone1, item?.phone2, item?.status, item?.address, item?.name1, item?.name2, item?.location?.coordinates?.join(','), item?.note, item?._id])
      })
      setListHelps(tmpList)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  const tableHead = ['SĐT 1', 'SĐT 2', 'Trạng thái', 'Địa chỉ', 'Tên 1', 'Tên 2', 'Vị trí', 'Nội dung', '#']

  return (
    <div className="py-4 px-2">
      <h2 className="font-bold text-lg">DANH SÁCH CỨU HỘ</h2>
      <div className="pt-2" />
      <Table head={tableHead} rows={listHelps} refresh={fetch} />
    </div>
  )
}
