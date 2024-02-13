let fetchStatus = true;
const controller = new AbortController();
const signal = controller.signal;

     
let eleC = document.getElementById('c_state_id');
getDistrict(eleC, 'c_district_id', '99');
 
let eleP = document.getElementById('p_state_id');
getDistrict(eleP, 'p_district_id', '99');

let eleCs = document.getElementById('c_state_id');
getDistrict(eleCs, 'c_district_id', '99');

let elePs = document.getElementById('p_state_id');
getDistrict(elePs, 'p_district_id', '99');

        //tabs JS
const hideCards = document.querySelectorAll('.hide-cards');
const cardHeadTab = document.querySelectorAll('.icon-card-div');

const loopCardHeadTabs = (ele) => {
    cardHeadTab.forEach((item, i) => {
        item.classList.remove('card-active');
        item.classList.add('card-disabled');
    })
    ele.classList.add('card-active');
    ele.classList.remove('card-disabled');
}

 
let showTab = 'corr';
let toggleEle = document.getElementById(showTab);
toggleTabs(toggleEle);
 
function toggleTabs(e) {
    const dataEle = e.id;
    const cardToShow = document.querySelector(`[data-id="${dataEle}"]`);
    hideCards.forEach((card, ind) => {
        card.classList.add('d-none');
    })
    loopCardHeadTabs(e);
    cardToShow.classList.remove('d-none');
}

async function htmlContentsAsync(params) {
    fetchStatus = true;
    try {
        const response = await fetch('./ajax_functions.php', params);
        const text = await response.text();
        return text;

    } catch (error) {
        console.error(error);
    }
}

function getDistrict(ele, $eleId, $cvalue = '') {
    const state = ele.value;

    const data = {
        'state': state,
        'district': $cvalue,
        'task': 'select_district_state'
    };

    const params = {
        signal,
        method: 'POST',
        body: JSON.stringify(data)
    };
    htmlContentsAsync(params).then((returnData) => {
        document.getElementById($eleId).innerHTML = returnData;
    }).catch((error) => {
        console.log(error)
    })

}

function abortFetching() {
    console.log('Now aborting');
    controller.abort();
}


function sameAddress(eevnt) {
    if (eevnt.checked == true) {
        document.getElementById('p_address1').value = document.getElementById('c_address1').value;
        //document.getElementById('p_address2').value = document.getElementById('c_address2').value;
        document.getElementById('p_post_office').value = document.getElementById('c_post_office').value;
        document.getElementById('p_city').value = document.getElementById('c_city').value;
        document.getElementById('p_state').value = document.getElementById('c_state').value;
        getDistrict(document.getElementById('c_state'), 'p_district', document.getElementById('c_district')
            .value);
        document.getElementById('p_pincode').value = document.getElementById('c_pincode').value;
    }

    if (eevnt.checked == false) {
        document.getElementById('p_address1').value = '';
        //document.getElementById('p_address2').value = '';
        document.getElementById('p_post_office').value = '';
        document.getElementById('p_district').value = '';
        document.getElementById('p_state').value = '';
        document.getElementById('p_pincode').value = '';
    }
}

// remove alert after 5secs
const alertEles = document.querySelectorAll('.alert');
alertEles.forEach((alert, indd) => {
    if (alert.classList.contains('settimeout')) {
        setInterval(() => {
            alert.remove();
        }, 10000)
    }
})


//event onchange other select
const checkOtherEle = document.querySelectorAll('.check-other');
const districtArr = [99, 165];
const otherField = { 'c_state_id': 99, 'c_district_id': districtArr, 'p_state_id': 99, 'm_district_id': districtArr };
       
const savedDataF = '';
    
if (savedDataF) {
    for (const property in savedDataF) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, savedDataF)
        }
    }
}
      
const savedDataM = '';
     
if (savedDataM) {
    for (const property in savedDataM) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, savedDataM)
        }
    }
}


const isPost = '';

if (isPost) {
    for (const property in isPost) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, isPost)
        }
    }
}

function checkOtherHideEle(property, Data) {
    let eleToHide = document.querySelector(`[data-id=${property}]`);
    //console.log(eleToHide, property)                  
    if (Array.isArray(otherField[property]) && otherField[property].includes(Data[property].toString())) {
        eleToHide.classList.remove('d-none');
    } else if (Data[property] == otherField[property]) {
        eleToHide.classList.remove('d-none');
    } else {
        eleToHide.classList.add('d-none');
    }
}


checkOtherEle.forEach(otherCall)

function otherCall(item, index) {
    item.addEventListener('change', (e) => {
        let attrId = item.id;
        let changeValue = item.value;
        let eleToHide = document.querySelector(`[data-id=${attrId}]`);

        if (Array.isArray(otherField[attrId]) && otherField[attrId].includes(item.value)) {
            eleToHide.classList.remove('d-none');
        } else if (item.value == otherField[attrId]) {
            eleToHide.classList.remove('d-none');
        } else {
            eleToHide.classList.add('d-none');
        }
    })
}
