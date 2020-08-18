<template>
  <div class="box connexion width-600 mx_auto">
    <b-message type="is-success" has-icon>
      <p>
        Votre demande d'inscription a bien été pris en compte.
        Veuillez consulter votre mail pour confirmation. <br>
        Email de confirmation: <strong>{{email}}</strong> <br>
        <strong>NB :</strong> Si vous ne recevez pas de mail, vérifier dans vos spams.
      </p>
    </b-message>
  </div>
</template>

<script>
export default {
  props: {
    email: String
  }
}
</script>
