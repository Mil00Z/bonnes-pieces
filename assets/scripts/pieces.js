import { addListenerAvis, addListenerSendAvis,displayAvis,updateAvis} from "./avis.js";

const productType = 'pieces';
// const productsFile = "../../pieces-autos.json";
const productsFile = `http://localhost:8081/${productType}`;

//Fetching Datas
async function getDatas(dataFile){

    try{

        const response = await fetch(dataFile);
        const datas = await response.json();

        const valueDatas = JSON.stringify(datas);
        window.localStorage.setItem(`${productType}`, valueDatas);

        return datas;

    } catch (error) {

        alert('No fetched Data');
        
    }
}


//Create Data Array
let dataSet=[];

//Get Data Fecth in DataSet to display datas
async function initProducts(dataFile) {
    
    dataSet = await getDatas(dataFile);

    //Display All of Datas
    displayProductDatas(dataSet);

    return dataSet;
} 


let availableProducts = window.localStorage.getItem(`${productType}`);

if (availableProducts === null){
    
    console.log('NO localStorage');

    initProducts(productsFile);
    

} else {
    
    console.log('IN LocalStorage');

    dataSet = JSON.parse(availableProducts);
   
    displayProductDatas(dataSet);
}

//Clear Datas Storage
const updateProduct = document.querySelector('.btn-maj');
updateProducts(dataSet,updateProduct);

// Action with Form Avis
addListenerSendAvis();


//Ordered BY Price
    const orderedByPrice = document.querySelector('.btn-order-price');
    orderedByPrice.addEventListener('click',(e)=> {

    // orderedPrice(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML='';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

        console.log(dataSet);

        //Display datas with function who ordered datas
        displayProductDatas(orderedPrice(dataSet));

      },{once:true});



      //Desordered BY Price
      const desorderedByPrice = document.querySelector('.btn-desorder-price');
      desorderedByPrice.addEventListener('click',(e)=> {

        // desorderedPrice(dataSet);

        //Clear DOM Area of Datas
        document.querySelector('.displayed-datas').innerHTML='';

        //Get Data Filter Action
        const titleFilter = e.target.getAttribute('title');
        document.querySelector('.filter-name').textContent = `${titleFilter}`;

        displayProductDatas(desorderedPrice(dataSet));

      },{once:true});


//Filtered BY Price
      const filteredUnderPrice = document.querySelector('.btn-filter-price');
      filteredUnderPrice.addEventListener('click',(e) =>{

        // filteredPrice(dataSet);

        //Clear DOM Area of Datas
        document.querySelector('.displayed-datas').innerHTML='';

        //Get Data Filter Action
        const titleFilter = e.target.getAttribute('title');
        document.querySelector('.filter-name').textContent = `${titleFilter}`;

        displayProductDatas(filteredPrice(dataSet));

      },{once:true});


      // Filtered BY Desc
      const filteredByDesc = document.querySelector('.btn-get-desc');
      filteredByDesc.addEventListener('click',(e) => {

        // filteredDesc(dataSet);

        //Clear DOM Area of Datas
         document.querySelector('.displayed-datas').innerHTML='';

        //Get Data Filter Action
         const titleFilter = e.target.getAttribute('title');
         document.querySelector('.filter-name').textContent = `${titleFilter}`;

        displayProductDatas(filteredDesc(dataSet));

      },{once:true});


// Filtered BY Stock
const filteredByStock = document.querySelector('.btn-get-stock');
filteredByStock.addEventListener('click',(e) =>{

    // filteredStock(dataSet);

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML='';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter}`;

    displayProductDatas(filteredStock(dataSet));

},{once:true});

//Range Filtered

const filteredByRange = document.querySelector('#ranged');
filteredByRange.addEventListener('change',(e) =>{

    //Clear DOM Area of Datas
    document.querySelector('.displayed-datas').innerHTML='';

    //Get Data Filter Action
    const titleFilter = e.target.getAttribute('title');
    document.querySelector('.filter-name').textContent = `${titleFilter} : <= ${e.target.value} euros`;

    displayProductDatas(filteredPriceByRange(dataSet,e.target.value));

});


      const productByPrice = document.querySelector('.btn-filter-price');

      productByPrice.addEventListener('click',(e)=>{

        e.target.classList.add('active');

        // Create SubArray Of Simple Data of Main DataSet
        const getNameData = dataSet.map((dataElement) => {
            return dataElement.nom;
        });
        // console.log('get Name of Data =>',getNameData);


        // const getPriceData = dataSet.map((dataElement) => {

        //     return dataElement.description;

        // });

        // console.log(getPriceData);


        //Get Array of Product < 35 euros
        let targetPrice = 35 ;

        getProductByLowerPrice(dataSet,getNameData,targetPrice);

        displayProductByLowerPrice(getNameData);

        document.querySelector('.displayed-datas').innerHTML = '';

    },{once:true});


    const productByDispo = document.querySelector('.btn-get-stock');

    productByDispo.addEventListener('click',(e) =>{

        e.target.classList.add('active');

    
    // Create SubArray Of Simple Data of Main DataSet
    const getNameData = dataSet.map(dataElement=>dataElement.nom);
    const getPriceData = dataSet.map(dataElement=>dataElement.prix);
    const getDescData = dataSet.map(dataElement=>dataElement.description);

    console.log('Data Before Actions =>',getNameData,getPriceData,getDescData);


    getProductAvailable(dataSet,getNameData,getPriceData,getDescData);

      // Arrays
       let productNameAvailable = getNameData;
       let productPriceAvailable = getPriceData;
       let productDescAvailable = getDescData;

    displayProductAvailable(productNameAvailable,productPriceAvailable,productDescAvailable);

    console.log('Data After Actions =>',productNameAvailable,productPriceAvailable,productDescAvailable);

    },{once:true});
    


//Data Visualisation
const targetGraph = document.getElementById('graphique-avis').getContext('2d');
const avisDatas = 'http://localhost:8081/avis';

const avis = await fetch(`${avisDatas}`).then((avis) => avis.json());

let nbComs = [0,0,0,0,0,0];

let j = 0;
let k = 0;
let l = 0;
let m = 0;
let n = 0;
let p = 0;


for (let i=0; i < avis.length; i++){

    // console.log(avis[i].nbEtoiles);

    if (avis[i].nbEtoiles === 4) {

        j++;

        nbComs.splice(4,1,j);

    } else if (avis[i].nbEtoiles === 3) {

        k++;

        nbComs.splice(3,1,k);

    } else if (avis[i].nbEtoiles === 5) {

        l++;

        nbComs.splice(5,1,l);

    } else if (avis[i].nbEtoiles === 1) {

        m++;

        nbComs.splice(1,1,m);

    } else if (avis[i].nbEtoiles === 0) {

        n++;

        nbComs.splice(0,1,n);

    }  else if (avis[i].nbEtoiles === 2) {

        p++;

        nbComs.splice(2,1,p);

    } 
    
    else if (avis[i].nbEtoiles === null) {

        console.log('Nombre Etoiles Non disponible');

    }

}

// Testing if Datas are Correct 

var sumEtoiles = nbComs.reduce((accum,current) => {
        return accum + current ;
},0);


if (nbComs.length === sumEtoiles) {

    console.log ('All Avis have Nbre Etoiles');

} else {
    console.warn(`'some Avis dont have Nbr Etoiles`);

    console.log(`Nb Total Etoiles: ${sumEtoiles} //`,`Nb Avis : ${avis.length}`);
}

// Update Chart Object
let data = {
    labels: [0,1,2,3,4,5].reverse(),
    datasets: [{
        label: "Nombre Étoiles attribuées",
        data: nbComs.reverse(),
        backgroundColor: "#7451eb", 
    }],
 };

let config = {
        type: "bar",
        data: data,
        options: {
           indexAxis: "y",
        },
    };


const graphiqueAvis = new Chart(targetGraph, config);

let infosAvis = document.createElement('p');
infosAvis.classList.add('infos-staring');

infosAvis.innerHTML = ` <strong>${sumEtoiles}</strong> notes laissées sur <strong>${avis.length} </strong> avis ✨`;
document.querySelector('.visualisation').append(infosAvis);


































  

// FUNCTIONS
// Get Set Display Datas Products
async function displayProductDatas(dataElement) {

    //Display in Console datas
    // console.log('ALL of datas =>',dataElement);

    for (const data in dataElement) {

        let dataWrapper = document.createElement('article');
        let dataName = document.createElement('h2');
        let dataImg = document.createElement('img');
        let dataPrice = document.createElement('span');
        let dataDesc = document.createElement('p');
        let dataDispo = document.createElement('div');
        let dataCat = document.createElement('span');
        let dataAvisBtn = document.createElement('button');
       
    
        //Afficher les infos des objects dans le tableau retour de données
        const objectData = dataElement[data];
    
        // Set Datas
        dataWrapper.classList.add('product');
        dataWrapper.setAttribute('data-id',`${objectData.id}`);

        dataName.classList.add('product_name');
        dataName.textContent = `${objectData.nom}`;
        
        dataPrice.classList.add('product_price');
        dataPrice.textContent = `Prix: ${objectData.prix} ${objectData.prix < 35 ? "$" : "$$$"}`;

        dataImg.classList.add('product_img');
        dataImg.setAttribute('src',`./assets/${objectData.image}`);

        dataDesc.classList.add('product_desc');
        dataDesc.textContent = `${objectData.description ?? " ❌ pas de description produit"}`;

        dataDispo.classList.add('product_avail');
        dataDispo.textContent = `${objectData.disponibilite === true ? 'En stock':'En rupture de stock'}`;
        dataDispo.dataset.available = `${objectData.disponibilite === true ? 'on':'off'}`;

        dataCat.classList.add('product_cat');
        dataCat.textContent = `${objectData.categorie ?? '❌ pas de catégorie'}`;

        dataAvisBtn.classList.add('btn','btn-avis');
        dataAvisBtn.textContent = `Afficher les avis`;

        // dataAvis.classList.add('product_avis');
    
        // Push Datas in DOM
        dataWrapper.append(dataCat,dataImg,dataName,dataDesc,dataPrice,dataDispo,dataAvisBtn);

        //Push Global Datas
        document.querySelector('.displayed-datas').append(dataWrapper);
    }

    //Import de la fonction Click on Btn-Avis
    addListenerAvis();
}

// Funny Display of Datas on DOM
function eventDisplayDatas(eventName, targetEvent,datas) {

    document.querySelector(`${targetEvent}`).addEventListener(`${eventName}`,(e) =>{

        displayProductDatas(datas);
    
    }, {once:true});

}

function orderedPrice(dataElement){

    let copyOfdataElement = Array.from(dataElement);

    copyOfdataElement.sort((a,b) => {
        
        //  Have to check how create an sub function of this with integration of prop (price) of Data
        return a.prix - b.prix ;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Ordered Data Price =>', copyOfdataElement);

    return copyOfdataElement;
}

function desorderedPrice(dataElement) {

    let copyOfdataElement = Array.from(dataElement);

    copyOfdataElement.sort((a,b) => {
        
        //  Have to check how create an sub function of this with integration of prop (price) of Data
        return b.prix - a.prix ;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Desordered Data Price =>', copyOfdataElement);

    return copyOfdataElement;
}

function filteredPrice(dataElement) {


    let dataFiltered = dataElement.filter((data) => {

        return data.prix <= 35;

    });

    // console.log('initial Data =>', dataElement);
    // console.log('Filtered Data Price =>', dataFiltered);

    return dataFiltered;
}

function filteredDesc(dataElement) {

    let dataDescFiltered = dataElement.filter((data) =>{

        return data.description;

    });

    // console.log('Filtered Data Desc =>',dataDescFiltered);

    return dataDescFiltered;

}

function filteredStock(dataElement) {

    let dataStockFiltered = dataElement.filter((data) => {

        return data.disponibilite;

    });

    // console.log('Filtered Data Stock =>',dataStockFiltered);

    return dataStockFiltered;
}

function filteredPriceByRange(dataElement,priceRange) {

        let dataPriceByRange = dataElement.filter((data) =>{

            return data.prix <= priceRange ;

        })

        // console.log('Filtered Data Price by range =>',dataPriceByRange);

        return dataPriceByRange;
}

function getProductByLowerPrice(dataElement,subArrayOfData,priceCondition) {

    // Looping on element
    for (let i= dataElement.length - 1; i>=0 ; i-- ){

        // Price Condition
        if (dataElement[i].prix > priceCondition) {

                console.log(`prix trop élevé (> ${priceCondition} euros) pour l'élèment index = ${i} =>`, dataElement[i].nom);

                //Remove items in Array of Product Name 
                subArrayOfData.splice(i,1);

         }
    }   


    // Exemple for Falsy Result with Array Parse by the beginning
//     for (let i= 0; i < dataElement.length ; i++ ){

//         if (dataSet[i].prix < 35) {
//                 console.log(`prix trop élevé pour l'élèment index = ${i} =>`, dataElement[i].nom);

                
//                 getNameData.splice(i,1);
//             }
// }

}

function displayProductByLowerPrice(subArrayOfData) {

     //Create Element Wrapper
     const productListSlicedByPrice = document.createElement('list-product');
     productListSlicedByPrice.classList.add('list-filtered');
    

   for (let i=0 ; i < subArrayOfData.length ; i ++) {

       const productItemSlicedByPrice = document.createElement('item-product');
       productItemSlicedByPrice.classList.add('item-filtered');

       const productNameSlicedByPrice = document.createElement('div');
       productNameSlicedByPrice.textContent = `${subArrayOfData[i]}`;

    
        //FULL LI
       productItemSlicedByPrice.append(productNameSlicedByPrice);

        //FULL UL
       productListSlicedByPrice.append(productItemSlicedByPrice);
   }

   // Add Datas in DOM target Area
   document.querySelector('.filter-name').append(productListSlicedByPrice);
} 

function getProductAvailable(dataElement,subArrayName,subArrayPrice,subArrayDesc) {
        
    // Looping on element
    for (let i= dataElement.length - 1; i>=0 ; i--) {

        // Price Condition
        if (dataElement[i].disponibilite === false) {

            //Remove items in Arrays of Product
            subArrayName.splice(i,1);
            subArrayPrice.splice(i,1);
            subArrayDesc.splice(i,1);
        }

    }

    //Get New Array of datas because splitted before

    // Methode 1
    // let productNameAvailable = subArrayName;
    // let productPriceAvailable = subArrayPrice;
    // let productDescAvailable = subArrayDesc;

    // return productNameAvailable,productPriceAvailable,productDescAvailable;

    return subArrayName,subArrayPrice,subArrayDesc;
}

function displayProductAvailable(subArrayName,SubArrayPrice,SubArrayDesc) {

    //Create Element Wrapper
    const productListAvailable = document.createElement('ul');
    productListAvailable.classList.add('list-filtered');

    for (let i=0; i < subArrayName.length;i++) {

        const productItemAvailable = document.createElement('li');
        productItemAvailable.classList.add('item-filtered');

        productItemAvailable.textContent=`${subArrayName[i]} -- ${SubArrayPrice[i]}euros -- ${SubArrayDesc[i] ?? 'pas de description'}`;

            //FULL UL
        productListAvailable.append(productItemAvailable);
        }

        // Add Datas in DOM target Area
        document.querySelector('.filter-name').append(productListAvailable);

}

function updateProducts(ArrayOfData,trigger) {

    trigger.addEventListener('click',(e) => {

        localStorage.removeItem(`${productType}`);
        console.log(ArrayOfData);
        
    });


}




