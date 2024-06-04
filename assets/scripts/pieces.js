const productsFile = '../../pieces-autos.json';

const getProductsDatas = fetch(productsFile);
getProductsDatas.then(resolve => resolve.json())
.then(
    (dataSet) => {

    //Afficher premiere infos du jeux
    console.log(dataSet);

    for (const data in dataSet) {

        let dataWrapper = document.createElement('article');
        let dataName = document.createElement('h2');
        let dataImg = document.createElement('img');
        let dataPrice = document.createElement('span');
        let dataDesc = document.createElement('p');
        let dataDispo = document.createElement('div');


        //Afficher les infos des objects dans le tableau retour de données
        for (let values in dataSet[data]) {

            
            if (dataSet[data].disponibilite) {

                dataSet[data].disponibilite = 'oui';
                
            }

            else {

                dataSet[data].disponibilite = 'non';
            }

        
            dataWrapper.setAttribute('data-id',`${dataSet[data].id}`);
           
            dataName.textContent = `${dataSet[data].nom}`;
            dataPrice.textContent = `${dataSet[data].prix} euros`;
            dataImg.setAttribute('src',`${dataSet[data].image}`);
            dataDesc.textContent = `${dataSet[data].description}`;
            dataDispo.textContent = `Dispo: ${dataSet[data].disponibilite}`;

            dataWrapper.classList.add('datas');

            // Push Datas one by One
            dataWrapper.append(dataName,dataDesc,dataDispo,dataPrice,dataImg);

            //Push Global Datas
            document.querySelector('.filtres').append(dataWrapper);

            // Print Console Datas
            console.table(`${values} : ${dataSet[data][values]}`);

        }

    }
        
});
