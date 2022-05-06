class UI {
    constructor() {
        this.TABLE_BODY = document.getElementById('t_body');
    }

    clearInputModel(paramsInput_arr) {
        let input_arr = [...paramsInput_arr];
        input_arr.forEach(i => i.value !== "" ? i.value = "" : null)
    }

    alertInputModel(paramsInput_arr) {
        let input_arr = [...paramsInput_arr];

        input_arr.forEach(i => {
            if (i.value === "") {
                i.classList.add('border-2', 'border-danger');
            }
        })
    }

    dataAddModel(data, dataCounter) {
        if (dataCounter === 1) {

            this.TABLE_BODY.innerHTML += `
                        
                     <tr>
          <th scope="row">${data.id}</th>
          <td>${data.name}</td>
          <td>${data.seller}</td>
          <td>${data.price}</td>
          <td>${data.quantity}</td>
          <td>
            <i class="fas fa-edit"></i>
          </td>
          <td>
            <i class="far fa-trash-alt"></i>
          </td>
        </tr>   
            
            
            `
        } else if (dataCounter > 1) {

            data.forEach(p => {
                this.TABLE_BODY.innerHTML +=
                    `
                    
                    
                                     <tr>
          <th scope="row">${p.id}</th>
          <td>${p.name}</td>
          <td>${p.seller}</td>
          <td>${p.price}</td>
          <td>${p.quantity}</td>
          <td>
            <i class="fas fa-edit"></i>
          </td>
          <td>
            <i class="far fa-trash-alt"></i>
          </td>
        </tr>                   
               `
            })
        } else {
            alertify.warning('Store is same as stock');
        }
    }

    updateProductSender(targetSpace_P) {
        let allDatas = Array.from(targetSpace_P.parentElement.parentElement.children).map(child => child.textContent.trim()).slice(1, 5)
        let symbolIDS = Array.from(targetSpace_P.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.children).slice(1, 5)
            .map(child => child.textContent.trim().toLowerCase());



        for (let i = 0; i < 4; i++) {
            document.getElementById(symbolIDS[i]).value = allDatas[i];
        }

    }


}