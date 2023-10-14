  prixMin() {
            let tab = getLocalDB()
            let min = tab[0].prix
            for (let i = 0; i < tab.length; i++) {
                if (tab[i].prix < min) {
                    min = tab[i].prix
                }
            }
            return min
        },
        prixMax() {
            let tabl = getLocalDB()
            let max = tabl[0].prix
            for (let i = 0; 1 < tabl.length; i++) {
                if (tabl[i].prix > max) {
                    max = tabl[i].prix
            }
            }
            return max
        },