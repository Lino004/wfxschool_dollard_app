# WfxSchool Dollars DOC Api

## Inscription (POST)
```
{
    nom: 'HOUNKANRIN',
    prenom: 'Mouhayad',
    email: 'h.ayinlamouhayad@gmail.com',
    phone: '61773532',
    indicartif: 226,
    password: '----',
    pays: 52,
    is_ad: false
}
```
## Achat de monnaie (POST)
Lors d'un achat de PM
```
{
    id: '84dz4dz4d5zd784dedjnkefde45dehvhe',
    phone: '61773532',
    indicartif: 226,
    typeAchat: 'PM',
    adressePm: 'U12345678',
    adresseBitcoin: '',
    montantAchat: 50,
    sommePaye: 31000,
    description: 'Achat Dollars PM',
    prixUnitaire: 620
}
```
Lors d'un achat de Bitcoin
```
{
    id: '84dz4dz4d5zd784dedjnkefde45dehvhe',
    phone: '61773532',
    indicartif: 226,
    typeAchat: 'BITCOIN',
    adressePm: '',
    adresseBitcoin: 'Ddezdcekje8c5e45d56e2d5e5d5ede5',
    montantAchat: 50,
    sommePaye: 30500,
    description: 'Achat Dollars Bitcoin',
    prixUnitaire: 610
}
```
## Résumé (GET)
Résumé des oppérations de l'utilisateur
```
{
    nbrFilleule: 0,
    totalAchat: 5000, 
    totalGain: 0
}
```
## Liste de Filleule (GET)
Une liste paginée des filleules
```
[
    {
        lastDateAchat: '22/08/2020',
        nom: 'Test',
        prenom: 'Permi',
        id: 'ifde5fd5edfsedfncsdfsdfjbcsd4c45df5'
        gain: 1500
    }
]
```
## Liste des achats (GET)
Une liste paginée des achats
```
[
    {
        date: '22/08/2020',
        description: 'Achat Dollars PM',
        montantAchat: 50,
        prixUnitaire: 620,
        typeAchat: 'PM',
        id: 0,
        total: 31000
    },
    {
        date: '22/08/2020',
        description: 'Achat Dollars Bitcoin',
        montantAchat: 50,
        prixUnitaire: 610,
        typeAchat: 'BITCOIN',
        id: 1,
        total: 30500
    }
]
```
## Les offres
### Liste des offres (GET)
Récupération de la liste des offres
```
[
    {
        id: 0,
        trancheInferieur: 50, 
        trancheSuperieur: 0,
        prix: 620,
        type: 'PM'
    },
    {
        id: 1,
        trancheInferieur: 1000, 
        trancheSuperieur: 0,
        prix: 610,
        type: 'BITCOIN'
    }
]
```
### Ajouter une offre (POST)
Ajouter de nouvelles offres
```
{
    trancheInferieur: 50, 
    trancheSuperieur: 0,
    prix: 620,
    type: 'PM'
}
```
### Modifier une offre (PUT)
Modifier une offre existante
### Supprimer une offre (DELETE)
Supprimer une offre existante
appData
