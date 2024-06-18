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