import request from '../utils/request';
import authRequest from "../utils/userRequest";

export function login(values){
  let formData = new FormData();
  formData.append('name', values.userName);
  formData.append('password', values.password);
  return authRequest('login',{
    method: 'POST',
    body: formData
  });
}

export function register(values) {
  let formData = new FormData();
  formData.append('name', values.nickname);
  formData.append('password', values.password);
  return authRequest('register',{
    method: 'POST',
    body: formData
  });
}

export function queryUserInfo(id) {
  return request(`user/${id}`, {
    method: 'GET',
  })
}

export function updateCurrentUser({id, values}){
  let formData = new FormData();
  formData.append('nickname', values.nickname);
  formData.append('signature', values.signature);
  formData.append('title', values.title);
  formData.append('group', values.group);
  return request(`user/${id}`,{
    method: 'PUT',
    body: formData
  });
}

export function updateTag({id, values}) {
  let formData = new FormData();
  formData.append('tag', values);
  return request(`user_tag/${id}`,{
    method: 'PUT',
    body: formData
  })
}

export function uploadImage(values) {
  return request(`image?type=avatar`, {
    method: 'POST',
    body: values
  })
}