// src/api.js
export async function saveProfile(profile) {
  const res = await fetch('/api/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || '프로필 저장 중 오류');
  }
  return res.json();
}

export async function getStats() {
  const res = await fetch('/api/stats');
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || '통계 조회 중 오류');
  }
  return res.json();  // { typeCounts: [...] }
}

