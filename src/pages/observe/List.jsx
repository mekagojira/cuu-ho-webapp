function Table({ head, rows }) {
  return (
    <div className="border rounded bg-white shadow-md">
      <table className="table-auto w-full">
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
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function List() {
  const tableHead = ['SĐT LIÊN HỆ', 'Địa chỉ', 'Nội dung', 'Trạng thái']

  const tableRows = [
    ['0123456789', '123 Đường ABC, Quận 1', 'Mắc kẹt trong cơn bão, cần cứu trợ', 'Chờ xử lý'],
    ['0987654321', '456 Đường DEF, Quận 2', 'Không thể ra khỏi nhà do ngập lụt', 'Đã xử lý'],
    ['0912345678', '789 Đường GHI, Quận 3', 'Yêu cầu hỗ trợ khẩn cấp, nhà bị tốc mái', 'Đã xử lý'],
    ['0934567890', '321 Đường JKL, Quận 4', 'Cần xe cứu hộ, không di chuyển được', 'Đang xử lý'],
    ['0901234567', '654 Đường MNO, Quận 5', 'Bị mắc kẹt trong ô tô, cần giúp đỡ', 'Chờ xử lý'],
  ]

  return (
    <div className="py-4">
      DANH SÁCH CỨU HỘ
      <Table head={tableHead} rows={tableRows} />
    </div>
  )
}
