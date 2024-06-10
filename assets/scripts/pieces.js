const productsFile = "../../pieces-autos.json";

const fetchDatas = await fetch(productsFile);
const dataSet = await fetchDatas.json();

    
    getProductDatas(dataSet);
    

    //Ordered BY Price
      const orderedByPrice = document.querySelector('.btn-filter-price');

      orderedByPrice.addEventListener('click',(e)=> {

        orderedPrice(dataSet);

      },{once:true});


      //Filtered BY Price
      const filteredUnderPrice = document.querySelector('.btn-filter-product');

      filteredUnderPrice.addEventListener('click',(e) =>{

        filteredPrice(dataSet);

      },{once:true});




// FUNCTIONS
// Get Set Display Datas Products
async function getProductDatas(dataElement) {

    //Display in Console datas
    // console.log(dataElement);

    for (const data in dataElement) {

        let dataWrapper = document.createElement('article');
        let dataName = document.createElement('h2');
        let dataImg = document.createElement('img');
        let dataPrice = document.createElement('span');
        let dataDesc = document.createElement('p');
        let dataDispo = document.createElement('div');
        let dataCat = document.createElement('span');
    
        //Afficher les infos des objects dans le tableau retour de données
        const objectData = dataElement[data];

        //Display in Console each Data
        // console.log(objectData);
    
        // Set Datas
        dataWrapper.classList.add('product');
        dataWrapper.setAttribute('data-id',`${objectData.id}`);

        dataName.classList.add('product_name');
        dataName.textContent = `${objectData.nom}`;
        

        dataPrice.classList.add('product_price');
        dataPrice.textContent = `Prix: ${objectData.prix} ${objectData.prix < 35 ? "$" : "$$$"}`;

        dataImg.classList.add('product_img');
        dataImg.setAttribute('src',`${objectData.image}`);

        dataDesc.classList.add('product_desc');
        dataDesc.textContent = `${objectData.description ?? " ❌ pas de description produit"}`;

        dataDispo.classList.add('product_avail');
        dataDispo.textContent = `${objectData.disponibilite === true ? 'En stock':'En rupture de stock'}`;
        dataDispo.dataset.available = `${objectData.disponibilite === true ? 'on':'off'}`;

        dataCat.classList.add('product_cat');
        dataCat.textContent = `${objectData.categorie ?? '❌ pas de catégorie'}`;

        
        // Push Datas in DOM
        dataWrapper.append(dataCat,dataImg,dataName,dataDesc,dataPrice,dataDispo);

        //Push Global Datas
        document.querySelector('.fiches').append(dataWrapper);

        // Print Console Datas
        // console.table(`${values} : ${dataSet[data][values]}`);


    }

}

  

// Funny Display of Datas on DOM
function eventDisplayDatas(eventName, targetEvent,datas) {

    document.querySelector(`${targetEvent}`).addEventListener(`${eventName}`,(e) =>{

        getProductDatas(datas);
    
    }, {once:true});

}



function orderedPrice(dataElement){

    let copyOfdataElement = Array.from(dataElement);

    copyOfdataElement.sort((a,b) => {
        
        //  Have to check how create an sub function of this with integration of prop (price) of Data
        return a.prix - b.prix ;

    });

    // console.log('initial Data =>', dataElement);
    console.log('Ordered Data =>', copyOfdataElement);
}

function filteredPrice(dataElement) {


    let dataFiltered = dataElement.filter((data) => {

        return data.prix <= 35;

    });

    // console.log('initial Data =>', dataElement);
    console.log('Filtered Data =>', dataFiltered);
}



