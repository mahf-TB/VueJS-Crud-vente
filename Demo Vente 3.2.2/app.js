const IfEmptyValue = (obj) => {
    let empty = false;
    for (const prop in obj) {
        if (obj[prop] == "") {
            empty = true;
        }
    }
    return empty
}


const App = {
    data() {
        return {
            showHome: false,
            showForms: false,
            showListVente: false,
            showModifier: false,
            total: 0,
            newVente: {
                numPro: "",
                design: "",
                prix: "",
                qte: ""
            },
            modVente: {
                numPro: "",
                design: "",
                prix: "",
                qte: "",
            },
            tableau: [],
            id: "",
            dsgn: ""
        }
    },


    //-----------------------------------------------------------------------

    mounted() {
       
        this.setTableau()
        

    },

    //-----------------------------------------------------------------------
    methods: {
        goToHome() {
            this.changePage("home")
        },
        goToForms() {
            this.changePage("forms")
        },
        goToListe() {
            this.changePage("list")

        },
        goToModif() {
            this.changePage("modif")

        },
        //-----------------------------------------------------------------------


        ajouterVente() {
            if (!IfEmptyValue(this.newVente)) {
                addVente(this.newVente)
                this.newVente = {
                    numPro: "P9",
                    design: "dfkjs",
                    prix: "2000",
                    qte: "56"
                }
                console.log("Vente ajouter bien dans le table")
                this.setTableau()
                this.goToListe()
                this.sumMontant()
            } else {
                console.log("Erreur de l'eregistrement")

            }
        },


        deleteDB(vente) {
            deleteVente(vente)
            this.setTableau()
            this.sumMontant()
        },


        modifierVente() {
            updateVente(this.modVente)
            this.setTableau()
            this.sumMontant()
            this.goToListe()
        },

        setTableau() {
            this.tableau = getLocalDB()
            console.log(this.tableau)
            this.prixMin()
            this.prixMax()
        },
        setModif(item) {
            const res = getVenteId(item)
            console.log(res)
            this.modVente = res
            this.goToModif()
        },
        recherche() {
            rehercheVente(this.dsgn)
        },



        //-----------------------------------------------------------------------
        sumMontant() {
            let tab = getLocalDB()
            let total = 0
            for (let i = 0; i < tab.length; i++) {
                const montant = tab[i].prix * tab[i].qte;
                total = total + montant
            }
            console.log(total)
            return total
        },
        // prixMin() {
        //     let min = minPrix();
        //     return min
        // },
        // prixMax() {
        //     let max = maxPrix();
        //     return max
        // },

       
        //-----------------------------------------------------------------------
        changePage(link) {
            this.showHome = false
            this.showForms = false
            this.showListVente = false
            this.showModifier = false

            switch (link) {
                case "home":
                    this.showHome = true
                    break;
                case "forms":
                    this.showForms = true
                    break;
                case "list":
                    this.showListVente = true
                    break;
                case "modif":
                    this.showModifier = true
                    break;
                default:
                    this.showHome = true
                    break;
            }
        }
    }
}
Vue.createApp(App).mount("#app")