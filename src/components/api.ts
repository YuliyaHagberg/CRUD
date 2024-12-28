import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export async function fetchRequest(
  method: 'GET' | 'POST',
  api: string,
  data: any = null,
  needs_authorization: boolean = false,
  needs_json: boolean = true
) {

  let headers: any = {};

  if (!browser) return { res: { ok: false }, json: {} };

  if (needs_authorization) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      headers.Authorization = `Token ${token}`;
      console.log('Authorization header:', headers.Authorization);
    } else {
      goto('/login');
      return { res: { ok: false }, json: {} };
    }
  }

  if (needs_json) {
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(data);
  }

  let toSend: RequestInit = {
    method, headers,
    body: data
  };

  console.log('Request data sent:', toSend);

  const res = await fetch(
    `http://127.0.0.1:8000/${api}`, toSend);

  try {
    const json = await res.json();
    console.log('Response JSON:', json);
    return { res, json };
  } catch {
    return { res };
  }
}
