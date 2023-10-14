const VENTEDB = "VenteDB"

//func retourner les Base de donnees
function getLocalDB() {
    if (!localStorage.getItem(VENTEDB)) {
        localStorage.setItem(VENTEDB,JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(VENTEDB))
}

function updateDB(db) {
    localStorage.setItem(VENTEDB,JSON.stringify(db))
}


//ajouter nouvelle ventes
function addVente(vente) {
    const db=getLocalDB()
    vente.id=Date.now()+""
    db.push(vente)
    updateDB(db)
}


//Modifier ventes
function updateVente(vente) {
    const db=getLocalDB()
    const upDb = db.map(function (data) {
        if (data.id == vente.id) {
            return{
                numPro: vente.numPro,
                design: vente.design,
                prix: vente.prix,
                qte: vente.qte, 
                id:vente.id
            }
        }
        return data
    })
    updateDB(upDb)

}

//func pour supprimer une vente

function deleteVente(vente) {
    const db=getLocalDB()
    const upDb=db.filter(function (data) {
        return data.id != vente.id;
    })
    updateDB(upDb)
}

//recuperer les id des ventes
function getVenteId(vente) {
    const db=getLocalDB()
    var filterDb=db.filter((data)=>{
       return data.id==vente.id;
    })
    if (filterDb.length > 0) {
        
        return filterDb[0]
    }
    return null;
}

//func qui reherche un ventes 
function rehercheVente(pro) {
    const db=getLocalDB()
    const filterDb=db.filter((data)=>{
        data.design.toLowerCase().includes(pro.toLowerCase())
    })
    return filterDb
}


// //function  max
// function maxPrix() {
//     let max=null;
//     const db=getLocalDB()
//     const upDb=db.filter(function (data) {
//         return data.prix;
//     })

//     max=upDb[0].prix;
//     if (upDb.length>0) {
//         let i=0;
//          while (i < upDb.length) {
//             if (max <= upDb[i].prix) {
//                 max = upDb[i].prix;
//             }
//             i++
//         }
//     }
//     return max;
// }

// //function  mmin
// function minPrix() {
//     let min=null;
//     const db=getLocalDB()
//     const upDb=db.filter(function (data) {
//         return data.prix;
//     })
   
//     min=upDb[0].prix;
//     if (upDb.length>0) {
//         let i=0;
       
//          while (i < upDb.length) {
//             if (min >= upDb[i].prix) {
//                 min = upDb[i].prix;
//             }
//             i++
//         }
//     }
//     console.log(min);
//     return min;
// }