const productsFile = '../../pieces-autos.json';

const getProductsDatas = fetch(productsFile);
getProductsDatas.then(resolve => resolve.json())
.then(
    (dataSet) => {

    //Afficher premiere infos du jeux
    console.log(dataSet);

    for (const data in dataSet) {


        //Afficher les infos des objects dans le tableau retour de données
        for (let values in dataSet[data]) {

            let dataWrapper = document.createElement('article');
            dataWrapper.classList.add('datas');

            dataWrapper.textContent = `${values}:${dataSet[data][values]} `;

            document.querySelector('.filtres').append(dataWrapper);


            console.log(`${values} : ${dataSet[data][values]}`);

        }

    }
        
});

