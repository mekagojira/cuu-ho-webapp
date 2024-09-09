import axios from 'axios'

const HOST = 'https://api.congdongcuuho.vn'

const call = async opts => {
  try {
    const { data: response } = await axios(opts)

    return response
  } catch (e) {
    alert(e.message)
  }
}

export const listArticles = ({ keyword = '', status, page = 1, pageSize = 50 }) =>
  call({
    method: 'get',
    url: `${HOST}/article`,
    params: { keyword, status, page, pageSize },
  })
