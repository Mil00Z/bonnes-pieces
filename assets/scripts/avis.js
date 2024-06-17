export function addListenerAvis() {

    const productsAvis = document.querySelectorAll('.btn-avis');

    for (let i=0; i < productsAvis.length; i++) {

            productsAvis[i].addEventListener('click', async function (e){
    
                const productId = productsAvis[i].parentElement.getAttribute('data-id') ;

                let newDatasUrl = `http://localhost:8081/pieces/${productId}/avis`;

                const response = await fetch(newDatasUrl);

                const avis = await response.json();

                console.log(avis[3]);

                // console.log('ID of product ---  Name of Product =>', `${productId} < --- > ${productsAvis[i].parentElement.querySelector('.product_name').textContent}` );

                for (let i = 0; i < avis.length; i ++) {

                    document.querySelector('.product_avis').textContent += `
                    Qui: ${avis[i].utilisateur}
                    Quoi: ${avis[i].commentaire}
                    Note ${avis[i].nbEtoiles}`;
                }

                // Open new Tab with Good Targeted URL
                // window.open(newDatasUrl);

            });
    
        }
}