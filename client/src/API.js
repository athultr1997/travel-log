const API_URL = 'http://localhost:1300';

// eslint-disable-next-line import/prefer-default-export
export async function listLogs() {
  const res = await fetch(`${API_URL}/api/logs`);  
  return res.json();
}
