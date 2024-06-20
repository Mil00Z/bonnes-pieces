export function addListenerAvis() {

    const productsAvis = document.querySelectorAll('.btn-avis');

    for (let i=0; i < productsAvis.length; i++) {

            productsAvis[i].addEventListener('click', async function (e){
    
                const productId = productsAvis[i].parentElement.getAttribute('data-id') ;

                // Create Ressrouce Datas Url
                let newDatasUrl = `http://localhost:8081/pieces/${productId}/avis`;

                // Get Datas target by ID
                const response = await fetch(newDatasUrl);
                const avisList = await response.json();

                console.log('ID of product ---  Name of Product =>', `${productId} < --- > ${productsAvis[i].parentElement.querySelector('.product_name').textContent}` );

                for (let i = 0; i < avisList.length; i ++) {

                    // Get Product Card
                    let dataWrapper = e.target.closest('.product');

                    // Create HTML Slot for Avis
                    let dataAvis = document.createElement('p');
                    dataAvis.classList.add('product_avis');
                    dataAvis.dataset.avisId = `${avisList[i].id}`;

                    dataAvis.innerHTML += `
                    <span> Qui:  ${avisList[i].utilisateur ?? "Unknown Person"}</span><br>
                    <span>Quoi:  ${avisList[i].commentaire ?? "No comment"}</span><br>
                    <span>Note:  ${avisList[i].nbEtoiles ?? "No Stars"}</span>`;

                    dataWrapper.append(dataAvis);
 
                }

                // Open new Tab with Good Targeted URL
                window.open(newDatasUrl);

            },{once:true});
    
        }
}



const avis = {

    pieceId :document.querySelector('[name=piece-id]').value

}

export function addListenerSendAvis() {

        const avisForm = document.querySelector("#the-form");

        avisForm.addEventListener('submit',(e) =>{

            e.preventDefault();
            document.body.querySelector('.displayed-datas').innerHTML='';

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

            console.log(fetchParams);
    
          
        });
}

window.addEventListener('load',addListenerSendAvis);

