const INPUT_ID = document.getElementById('id');
const INPUT_NAME = document.getElementById('name');
const INPUT_SELLER = document.getElementById('seller');
const INPUT_PRICE = document.getElementById('price');
const INPUT_QUANTITY = document.getElementById('quantity');
const BUTTON_CREATE = document.getElementById('btn_add');
const BUTTON_READ = document.getElementById('btn_read');
const BUTTON_UPDATE = document.getElementById('btn_update');
const TABLE_STORE = document.getElementById('store');

//INSTANCES
let ui = new UI();
let ajax = new Ajax();

eventListeners();

function eventListeners() {
  BUTTON_CREATE.addEventListener('click', exportDataController);
  BUTTON_READ.addEventListener('click', importDataController);
  BUTTON_UPDATE.addEventListener('click', updateDataController);
  TABLE_STORE.addEventListener('click', UIDataChangerController);
  [INPUT_NAME, INPUT_PRICE, INPUT_SELLER].forEach((i) => {
    i.addEventListener('keyup', inputValueController);
  });
  document.addEventListener('DOMContentLoaded', DOMController);
}

function exportDataController() {
  let productName = INPUT_NAME.value.trim();
  let productSeller = INPUT_SELLER.value.trim();
  let productPrice = INPUT_PRICE.value.trim();
  let productQuantity = INPUT_QUANTITY.value.trim();

  if ([productName, productSeller, productPrice].some((i) => i === '')) {
    alertify.success('pls field all inputs');
  } else {
    ajax.post(
      new Product(
        productName,
        productQuantity,
        productSeller,
        productPrice,
        ajax.setId(1, INPUT_ID),
      ),
      (err, response) =>
        err
          ? alertify.error(`error is ${err}`)
          : alertify.success(`${response.name} added database`),
    );
  }

  ui.clearInputModel([INPUT_SELLER, INPUT_PRICE, INPUT_NAME, INPUT_QUANTITY]);
}

function DOMController() {
  ajax.get((err, response, responseLength) => {
    if (err) {
      alertify.error(`error is ${err}`);
    } else {
      alertify.success(
        `last updated product: ${response[responseLength - 1].name}`,
      );
      INPUT_ID.value = responseLength;
    }
  });
}

function importDataController() {
  //accessing store stock and difference data
  let stock, store, counter;
  stock = parseInt(INPUT_ID.value);
  store = Number(document.getElementById('t_body').childElementCount);
  counter = stock - store;

  //first accessing of base
  if (stock > 0 && store === 0) {
    dataImporter(stock);
  } else {
    stock === 0
      ? alertify.warning('database is new')
      : counter === 0
      ? alertify.warning('No any new Item')
      : dataImporter(stock, counter, store); //access new products
  }
}

//DATA IMPORT REFACTORING

function dataImporter(paramsStock, paramsCounter, paramsStore) {
  if (arguments.length === 1) {
    ajax.get((err, response, dataCounter) => {
      if (err) {
        alertify.error(`error is ${err}`);
      } else {
        paramsStock > 1
          ? ui.dataAddModel(response, dataCounter)
          : ui.dataAddModel(response[0], dataCounter);
      }
    });
  } else {
    for (let i = 0; i < paramsCounter; i++) {
      ajax.get((err, response, dataCounter) => {
        if (err) {
          debugger;
          alertify.error(`error is ${err}`);
        } else {
          ui.dataAddModel(response, dataCounter);
        }
      }, ++paramsStore);
    }
  }
}

function updateDataController() {
  let productName = INPUT_NAME.value.trim();
  let productSeller = INPUT_SELLER.value.trim();
  let productPrice = INPUT_PRICE.value.trim();
  let productQuantity = INPUT_QUANTITY.value.trim();

  if ([productName, productSeller, productPrice].some((i) => i === '')) {
    ui.alertInputModel([INPUT_NAME, INPUT_PRICE, INPUT_SELLER]);
  } else {
  }
}

function inputValueController(event) {
  let classBorder = Array.from(event.target.classList);

  if (
    classBorder.indexOf('border-danger') !== -1 &&
    event.target.value !== ''
  ) {
    event.target.classList.remove('border-2', 'border-danger');
  }
}

function UIDataChangerController(event) {
  let editIcon, deleteIcon, targetSpace;
  editIcon = false;
  deleteIcon = false;
  targetSpace = event.target;

  if (event.target.className === 'fas fa-edit') {
    editIcon = !deleteIcon;

    BUTTON_UPDATE.hasAttribute('disabled')
      ? BUTTON_UPDATE.removeAttribute('disabled')
      : null;
  } else if (event.target.className === 'far fa-trash-alt') {
    deleteIcon = !editIcon;

    !BUTTON_UPDATE.hasAttribute('disabled')
      ? BUTTON_UPDATE.setAttribute('disabled', 'disabled')
      : null;
  }

  actionTypeController(editIcon, deleteIcon, targetSpace);
}

function actionTypeController(e_I, d_I, t_S) {
  if (e_I) {
    console.log(t_S);
  } else {
    console.log(t_S);
  }
}
