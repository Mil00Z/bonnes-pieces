const productsFile = '../../pieces-autos.json';

const getProductsDatas = fetch(productsFile);
getProductsDatas.then(resolve => resolve.json())
.then(
    (dataSet) => {

    //Display in Console datas
    // console.log(dataSet);
    console.log(dataSet[0]);

    for (const data in dataSet) {

        let dataWrapper = document.createElement('article');
        let dataName = document.createElement('h2');
        let dataImg = document.createElement('img');
        let dataPrice = document.createElement('span');
        let dataDesc = document.createElement('p');
        let dataDispo = document.createElement('div');
        let dataCat = document.createElement('span');
    
        //Afficher les infos des objects dans le tableau retour de données
        for (let values in dataSet[data]) {

            
            if (dataSet[data].disponibilite === true) {

                dataSet[data].disponibilite = 'oui';
                
            }

            else {

                dataSet[data].disponibilite = 'non';
            }


            // Set Datas
            dataWrapper.classList.add('product');
            dataWrapper.setAttribute('data-id',`${dataSet[data].id}`);

            dataName.classList.add('product_name');
            dataName.textContent = `${dataSet[data].nom}`;
            

            dataPrice.classList.add('product_price');
            dataPrice.textContent = `Prix: ${dataSet[data].prix} ${dataSet[data] < 35 ? "$" : "$$$"}`;

            dataImg.classList.add('product_img');
            dataImg.setAttribute('src',`${dataSet[data].image}`);

            dataDesc.classList.add('product_desc');
            dataDesc.textContent = `${dataSet[data].description}`;

            dataDispo.classList.add('product_avail');
            dataDispo.textContent = `Disponible: ${dataSet[data].disponibilite}`;

            dataCat.classList.add('product_cat');
            dataCat.textContent = `${dataSet[data].categorie}`;

            
            // Push Datas in DOM
            dataWrapper.append(dataCat,dataImg,dataName,dataDesc,dataPrice,dataDispo);

            //Push Global Datas
            document.querySelector('.fiches').append(dataWrapper);

            // Print Console Datas
            // console.table(`${values} : ${dataSet[data][values]}`);

        }

    }
        
});
