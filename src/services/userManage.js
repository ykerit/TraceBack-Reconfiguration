import request from '../utils/request';

export function queryUser(page_size) {
  return request(`user?page_size=${page_size}`)
}

export function putUser(id, values) {
  return request(`user/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export function createUser(values) {
  return request('user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function delUser(id) {
  return request(`user/${id}`, {
    method: 'DELETE',
  })
}

export function queryRole(page_size) {
  return request(`role?page_size=${page_size}`)
}

export function createRole(values) {
  return request('role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}

export function delRole(id) {
  return request(`role/${id}`, {
    method: 'DELETE',
  })
}

export function queryAdmin(page_size) {
  return request(`admin?page_size=${page_size}`)
}

export function createAdmin(values) {
  return request('admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
}

export function delAdmin(id) {
  return request(`admin/${id}`, {
    method: 'DELETE',
  })
}