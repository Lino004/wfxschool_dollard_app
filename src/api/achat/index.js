import HTTP from '../HTTP'

export async function achatDollar (info) {
  const response = await HTTP.put('tasks/change/achat/dollar', info)
  return response
}

export async function valideAchat (id) {
  const response = await HTTP.put('tasks/change/achat/valide/' + id)
  return response
}

export async function listeAchatUser (idUser, page, perPage) {
  const response = await HTTP.get(`tasks/change/achat/list/${idUser}/${page}/${perPage}`)
  return response
}

export async function listeAllAchatUser (idUser, page, perPage) {
  const response = await HTTP.get(`tasks/change/all/achat/list/${idUser}/${page}/${perPage}`)
  return response
}

export async function listeAllOffre () {
  const response = await HTTP.get('tasks/change/offre')
  return response
}

export async function addOffre (data) {
  const response = await HTTP.put('tasks/change/offre/create', data)
  return response
}

export async function updateOffre (id, data) {
  const response = await HTTP.put('tasks/change/offre/update/' + id, data)
  return response
}

export async function deleteOffre (id) {
  const response = await HTTP.delete('tasks/change/offre/delete/' + id)
  return response
}

export async function listeChild (idUser) {
  const response = await HTTP.get(`tasks/change/down/list/${idUser}`)
  return response
}

export async function resume (idUser) {
  const response = await HTTP.get(`tasks/change/user/resume/${idUser}`)
  return response
}
