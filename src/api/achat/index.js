import HTTP from '../HTTP'

export async function achatDollar (info) {
  const response = await HTTP.put('tasks/change/achat/dollar', info)
  return response
}

export async function listeAchatUser (idUser, page, perPage) {
  const response = await HTTP.get(`tasks/change/achat/list/${idUser}/${page}/${perPage}`)
  return response
}
