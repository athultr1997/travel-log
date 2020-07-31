const API_URL = 'http://localhost:1300';

export async function listLogs() {
  const res = await fetch(`${API_URL}/api/logs`);  
  return res.json();
}

export async function createLog(log) {
  const res = await fetch( `${API_URL}/api/logs`,{ 
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(log)
  });
  return res.json();
}

