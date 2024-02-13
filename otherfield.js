//tabs JS
const uid = 'xxxxx12345';
const hideCards = document.querySelectorAll('.hide-cards');
const cardHeadTab = document.querySelectorAll('.icon-card-div');

//event onchange other select
const checkOtherEle = document.querySelectorAll('.check-other');
const savedDataF = '';
const savedDataM = '';
const isPost = '';
const districtArr = '';
const otherField = { 'f_nationality': 2, 'f_profession': 15, 'm_nationality': 2, 'm_profession': 15, 'f_state_id': 99, 'f_district_id': districtArr, 'm_state_id': 99, 'm_district_id': districtArr, 'f_state_ori': 99, 'f_district_ori': districtArr, 'm_state_ori': 99, 'm_district_ori': districtArr };
const alertEles = document.querySelectorAll('.alert');

//get district ajax

let fetchStatus = false;
const controller = new AbortController();
const signal = controller.signal;

const loopCardHeadTabs = (ele) => {
    cardHeadTab.forEach((item, i) => {
        item.classList.remove('card-active');
        item.classList.add('card-disabled');
    })
    ele.classList.add('card-active');
    ele.classList.remove('card-disabled');
}


let showTab = 'father';
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

// remove alert after 5secs
alertEles.forEach((alert, indd) => {
    if (alert.classList.contains('settimeout')) {
        setInterval(() => {
            alert.remove();
        }, 10000)
    }
})


async function dataAsync(params) {

    try {
        const response = await fetch(ajaxURL, params);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}



function fetchCandidateAddress(type, field) {
    //console.log(type, field);
    if ((type == 'reset')) {
        const allCheckedReset = document.querySelectorAll(`.${field}check`);
        allCheckedReset.forEach((ele, ind) => {
            ele.removeAttribute('checked');
        })

        document.getElementById(`${field}address`).value = '';
        document.getElementById(`${field}post_office`).value = '';
        document.getElementById(`${field}city`).value = '';
        document.getElementById(`${field}state_id`).value = '';
        document.getElementById(`${field}district_id`).value = '';
        document.getElementById(`${field}pincode`).value = '';
        return true;
    }

    var reType = '';
    switch (type) {
        case 'corr':
            reType = 'c_';
            break;
        case 'perm':
            reType = 'p_';
            break;
        case 'fath':
            reType = 'f_';
            break;
    }

    //const reType = (type == 'corr') ? 'c_' : 'p_';
    const data = { 'type': type, uid, 'task': 'get_address' };

    const params = { signal, method: 'POST', body: JSON.stringify(data) };
    dataAsync(params).then((returnData) => {
        //f_address f_post_office f_city f_state f_district f_pincode    
        document.getElementById(`${field}address`).value = returnData[`${reType}address`];
        document.getElementById(`${field}post_office`).value = returnData[`${reType}post_office`];
        document.getElementById(`${field}city`).value = returnData[`${reType}city`];
        document.getElementById(`${field}pincode`).value = returnData[`${reType}pincode`]
        const statE = document.getElementById(`${field}state_id`);
        statE.value = returnData[`${reType}state_id`];
        document.getElementById(`${field}district_id`).value = getDistrict(statE, `${field}district_id`, returnData[`${reType}district_id`]);

        checkOtherHideEle(`${field}district_id`, returnData)


    }).catch((error) => {
        console.log(error)
    })

}


let eleF = document.getElementById('f_state_id');
getDistrict(eleF, 'f_district_id', '99');

let eleFO = document.getElementById('f_state_ori');
getDistrict(eleFO, 'f_district_ori', '99');



let eleM = document.getElementById('m_state_id');
getDistrict(eleM, 'm_district_id', '99');


let eleMO = document.getElementById('m_state');
getDistrict(eleMO, 'm_district_ori', '99');


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

    const data = { 'state': state, 'district': $cvalue, 'task': 'select_district_state' };

    const params = { signal, method: 'POST', body: JSON.stringify(data) };
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


if (savedDataF) {
    for (const property in savedDataF) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, savedDataF)
        }
    }
}

if (savedDataM) {
    for (const property in savedDataM) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, savedDataM)
        }
    }
}



if (isPost) {
    for (const property in isPost) {
        if (otherField.hasOwnProperty(property)) {
            checkOtherHideEle(property, isPost)
        }
    }
}

function checkOtherHideEle(property, Data) {
    let eleToHide = document.querySelector(`[data-id=${property}]`);
    //console.log(otherField[property], Data);         
    if (Array.isArray(otherField[property]) && otherField[property].includes(Data[property])) {
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