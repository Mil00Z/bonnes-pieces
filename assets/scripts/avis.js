export function addListenerAvis() {

    const btnAvis = document.querySelectorAll('.btn-avis');

    const productType = 'avis';

    for (let i=0; i < btnAvis.length; i++) {

        btnAvis[i].addEventListener('click', async function (e){
    
            const productId = btnAvis[i].parentElement.getAttribute('data-id') ;

            // Create Ressource Datas Url
            let newDatasUrl = `http://localhost:8081/pieces/${productId}/${productType}`;

            // Get Datas target by ID
            const response = await fetch(newDatasUrl);
            const avisList = await response.json();

        
            // Check Datas After Click Event
            console.log('ID of product ---  Name of Product =>', `${productId} < --- > ${btnAvis[i].parentElement.querySelector('.product_name').textContent}` );

            if (localStorage.getItem(`${productType} - ${productId}`) === null) {

                console.warn('No Avis LocalStorage Datas');

                //Create LocalStorage Cloned Datas
                localStorage.setItem(`${productType} - ${productId}`, JSON.stringify(avisList));

                displayAvis(avisList,e.target);

            } else {

                console.warn('Avis LocalStorage Datas');

                let getLocal = localStorage.getItem(`${productType} - ${productId}`);
                displayAvis(JSON.parse(getLocal), e.target);

            }

            // Open new Tab with Good Targeted URL
            window.open(newDatasUrl);

        },{once:true});
    
    }
}


export function addListenerSendAvis() {

        const postDataUrl = 'http://localhost:8081/avis';

        const avisForm = document.querySelector("#the-form");
        avisForm.addEventListener('submit',(e) =>{
            
            e.preventDefault();
        
            const avis = {
                pieceId: parseInt(document.querySelector('[name=piece-id]').value) ?? null,
                utilisateur : document.querySelector('[name=utilisateur]').value ?? "Unknown",
                commentaire: document.querySelector('[name=commentaire]').value ?? "pas de commentaires", 
                nbEtoiles: parseInt(document.querySelector('[name=starring]').value) ?? null, 
            }

            let bodyUtile = JSON.stringify(avis);


            const fetchParams = {
                method:"post",
                body : bodyUtile,
                headers: {
                    'content-type':'application/json'
                }
            }

            
            fetch(`${postDataUrl}`,fetchParams);
            // console.log(fetchParams);
    
        });
}

export function displayAvis(listElement,targetElement) {

    // Loop into Datas Product Type 'Avis'
    for (let i = 0; i < listElement.length; i ++) {

        // Get Product Card
        let dataWrapper = targetElement.closest('.product');

        // Create HTML Slot for Avis
        let dataAvis = document.createElement('p');
        dataAvis.classList.add('product_avis');
        dataAvis.dataset.avisId = `${listElement[i].id}`;

        dataAvis.innerHTML += `
        <span> Qui:  ${listElement[i].utilisateur ?? "Unknown Person"}</span><br>
        <span>Quoi:  ${listElement[i].commentaire ?? "No comment"}</span><br>
        <span>Note:  ${listElement[i].nbEtoiles ?? "No Stars"}</span>`;

        dataWrapper.append(dataAvis);

    }

}


export function updateAvis(storageType,trigger) {

    trigger.addEventListener('click',(e) => {

        localStorage.removeItem(`${storageType} - ${productId}`);
        // console.log(ArrayOfData);
       
    });

}


window.addEventListener('load',addListenerSendAvis);



