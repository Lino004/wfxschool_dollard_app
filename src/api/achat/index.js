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

export async function listeChild (idUser) {
  const response = await HTTP.get(`tasks/change/down/list/${idUser}`)
  return response
}

export async function resume (idUser) {
  const response = await HTTP.get(`tasks/change/user/resume/${idUser}`)
  return response
}
