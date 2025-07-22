// src/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  console.log('API 요청 주소:', BASE_URL + path);
  const res = await fetch(BASE_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body != null ? JSON.stringify(body) : undefined
  })

  // 에러 핸들링 통일
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || res.statusText)
  }
  return data
}

export function saveProfile({ nickname, gender, resultType }) {
  // resultType 이 배열이든 단일값이든 서버가 처리할 수 있도록 보장
  const payload = {
    nickname,
    gender,
    resultType: Array.isArray(resultType) ? resultType : [resultType]
  }
  return request('/api/profiles', { method: 'POST', body: payload })
}

export function getStats() {
  return request('/api/stats')
}
