import {listArticles, updateStatus} from "../../lib/request/request.js";
import {useEffect, useState} from "react";
import {cn} from "../../utils/ui.js";
import Map from "../observe/Map.jsx";

const ListHelps = () => {
  const statusText = {
    waiting: 'Chưa cứu hộ',
    confirmed: 'Đã xác nhận',
    incomming: 'Đang cứu hộ',
    saved: 'Đã cứu hộ',
    canceled: 'Huỷ',
  }
  const [listHelps, setListHelps] = useState([])
  const fetch = async () => {
    const response = await listArticles({})
    setListHelps(response?.docs || [])
  }
  useEffect(() => {
    fetch()
  }, [])
  const [detail, setDetail] = useState(null)

  const onChangeStatus = async (status, id) => {
    await updateStatus(
      {
        status,
      },
      id
    )
    fetch()
  }

  return (
    <div className="flex items-start justify-start flex-col gap-6 p-2">
      <div className="w-full relative">
        <h1 className="uppercase font-semibold text-xl text-center">Danh sách cứu trợ</h1>
        <a href="/" className="absolute left-0 top-1/2 -translate-y-1/2 underline text-sm">Quay lại</a>
      </div>
      {
        listHelps?.map(item => (
          <div key={item._id}
               className="flex flex-col gap-2 border border-slate-200 rounded w-full p-4 relative overflow-hidden" onClick={() => setDetail(item)}>
            <div className={cn('absolute top-0 right-0 text-white p-2 text-base font-semibold', {
              'bg-red-400': item.status === 'waiting',
              'bg-green-600': item.status === 'confirmed',
              'bg-orange-400': item.status === 'incomming',
              'bg-blue-400': item.status === 'saved',
              'bg-gray-400': item.status === 'canceled'
            })}>
              {
                statusText[item.status]
              }
            </div>
            <div className="flex items-center justify-start gap-2">
              <span>SĐT:</span>
              <a href={`tel:${item.phone1}`} className="underline text-blue-600 text-lg font-semibold">{item.phone1}</a>
              {
                item?.phone2 && (
                  <a href={`tel:${item.phone2}`}
                     className="underline text-blue-600 text-lg font-semibold">{item.phone2}</a>
                )
              }
            </div>
            <div>
              Tên: <span className="text-lg font-semibold">{item?.name1}</span>
              {
                item?.name2 && (
                  <>
                    <span className="mx-2">-</span>
                    <span
                      className="text-lg font-semibold">{item?.name2}</span>
                  </>
                )
              }
            </div>
            <div>
              Địa chỉ: <span className="text-lg font-semibold">{item?.address}</span>
            </div>
            <div className="flex gap-4">
              {
                item?.hasElder && <div className="font-bold text-lg">Có người già</div>
              }
              {
                item?.hasChild && <div className="font-bold text-lg">Có trẻ em</div>
              }
            </div>
            <div className="bg-red-100 p-2">
              {item?.note}
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              {
                item?.status === 'waiting' && (
                  <button className="p-4 bg-green-600 text-white w-full uppercase" onClick={() => onChangeStatus('confirmed', item?._id)}>Xác nhận</button>
                )
              }
              {
                item?.status === 'confirmed' && (
                  <button className="p-4 bg-orange-600 text-white w-full uppercase" onClick={() => onChangeStatus('incomming', item?._id)}>Đang đến</button>
                )
              }
              {
                item?.status === 'incomming' && (
                  <button className="p-4 bg-blue-400 text-white w-full uppercase" onClick={() => onChangeStatus('saved', item?._id)}>Đã cứu hộ</button>
                )
              }
              {
                (item?.location?.coordinates?.length && item?.status !== 'saved') && (
                  <button className="p-4 bg-white border border-blue-400 w-full uppercase text-blue-600">Xem bản đồ</button>
                )
              }
            </div>
          </div>
        ))
      }
      {
        !!detail && (
          <div className="fixed w-screen h-screen bg-[rgba(0,0,0,0.4)] top-0 left-0">
            <div className="relative h-full w-full flex items-center justify-center">
              <Map gps={{x: detail?.location?.coordinates?.[0], y: detail?.location?.coordinates?.[1]}}/>
              <div className="absolute w-full bottom-0 left-0 flex items-center justify-center">
                <button className="bg-slate-600 p-4 text-white w-full text-lg" onClick={() => setDetail(null)}>Đóng</button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default ListHelps