//tabs JS
const hideCards = document.querySelectorAll('.hide-cards');
const cardHeadTab = document.querySelectorAll('.icon-card-div');
const foreignAjaxUrl = 'url';
const uid = 'xxxxx12345';

const loopCardHeadTabs = (ele) => {
    cardHeadTab.forEach((item, i) => {
        item.classList.remove('card-active');
        item.classList.add('card-disabled');
    })
    ele.classList.add('card-active');
    ele.classList.remove('card-disabled');
}


let showTab = 'grad';
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
const alertEles = document.querySelectorAll('.alert');
alertEles.forEach((alert, indd) => {
    if (alert.classList.contains('settimeout')) {
        setInterval(() => {
            alert.remove();
        }, 5000)
    }
})

//get district ajax

let fetchStatus = false;
const controller = new AbortController();
const signal = controller.signal;

let eleF = document.getElementById('f_state');
getDistrict(eleF, 'f_district', '99');

let eleFO = document.getElementById('f_state_ori');
getDistrict(eleFO, 'f_district_ori', '99');

let eleM = document.getElementById('m_state');
getDistrict(eleM, 'm_district', '99');

let eleMO = document.getElementById('m_state');
getDistrict(eleMO, 'm_district_ori', '99');

async function htmlContentsAsync(params) {
    fetchStatus = true;
    try {
        const response = await fetch(ajaxURL, params);
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

var tenthPassYear = '10';

var interPassYear = '12';

var gradPassYear = '15';


function validateForm(event, form) {
    //control cgpa & percentage

    const perIn = document.getElementById(`percentage_${form}`);
    const scoreCgpa = document.getElementById(`score_${form}`);
    const outOfCgpa = document.getElementById(`out_of_${form}`);

    if (form == 'tenth') {
        var checkPassYear = document.getElementById(`pass_year`);
    } else {
        var checkPassYear = document.getElementById(`pass_year_${form}`);
    }

    if (form == 'tenth' && ((interPassYear != '' && checkPassYear.value >= interPassYear) || (gradPassYear != '' && checkPassYear.value >= gradPassYear))) {
        checkPassYear.focus();
        alert("Wrong or Invalid passing year");
        return false;
    }

    if (form == 'inter' && ((tenthPassYear != '' && checkPassYear.value <= tenthPassYear) || (gradPassYear != '' && checkPassYear.value >= gradPassYear))) {
        checkPassYear.focus();
        alert("Wrong or Invalid passing year");
        return false;
    }

    if (form == 'grad' && ((tenthPassYear != '' && checkPassYear.value <= tenthPassYear) || (interPassYear != '' && checkPassYear.value <= interPassYear))) {
        checkPassYear.focus();
        alert("Wrong or Invalid passing year");
        return false;
    }

    if (perIn.value == '' && (scoreCgpa.value == '' || outOfCgpa.value == '')) {
        perIn.focus();
        alert("Either you can fill Percentage or CGPA!");
        return false;
    }

    if (perIn.value != '' && (scoreCgpa.value != '' || outOfCgpa.value != '')) {
        perIn.focus();
        alert("Either you can fill Percentage or CGPA!");
        return false;
    }

    if (parseFloat(scoreCgpa.value) > parseFloat(outOfCgpa.value)) {
        scoreCgpa.focus();
        alert("Score is not greator than Out of in CGPA!");
        return false;
    }

    return true;
}


//other fields
const checkOtherEle = document.querySelectorAll('.check-other');
const otherField = {
    'board_university_grad': 200,
    'exam_passed_grad': 41,
    'stream': 8,
    'board_university_grad_appear': 200,
    'exam_passed_grad_appear': 41,
    'stream_appear': 8,
    'board_university_postgrad': 200,
    'exam_passed_postgrad': 41,
};

checkOtherEle.forEach(otherCall)

function otherCall(item, index) {
    item.addEventListener('change', (e) => {
        let attrId = item.id;
        let changeValue = item.value;
        let eleToHide = document.querySelector(`[data-id=${attrId}]`);

        if (item.value == otherField[attrId]) {
            eleToHide.classList.remove('d-none');
        } else {
            eleToHide.classList.add('d-none');
        }
    })
}

function loadToggleHtml(ele) {
    const eleToHide = document.querySelectorAll(`[data-id=${ele.id}]`);
    eleToHide.forEach((item, ind) => {
        if (ele.value == '1') {
            item.classList.remove('d-none');
        } else {
            item.classList.add('d-none');
        }
    })
}

//Data save ajax JSON
async function dataAsync(params) {
    try {
        const response = await fetch(foreignAjaxUrl, params);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function saveForeign(type, event) {
    const ForeignEqEle = document.getElementById(`${type}_eq`);
    const ForeignInsTituteEle = document.getElementById(`${type}_institute`);
    const EqTypeEle = document.getElementById(`${type}_grad`);


    const ForeignEq = ForeignEqEle.value;
    const ForeignInsTitute = ForeignInsTituteEle.value;
    const EqType = EqTypeEle.value;

    if (ForeignEq == '') {
        alert(`${type} Qualification details is required!`);
        ForeignEqEle.focus();
        return false;
    }

    if (ForeignInsTitute == '') {
        alert(`${type} Institution Name is required`);
        ForeignInsTituteEle.focus();
        return false;
    }

    const spinnerId = `${type}_spinner`;
    const contentBtnId = `${type}_content`;

    const spinnerIdEle = document.getElementById(spinnerId);
    const contentBtnIdEle = document.getElementById(contentBtnId);
    spinnerIdEle.classList.remove('d-none')
    contentBtnIdEle.innerText = 'Adding...';
    event.setAttribute('disabled', true);

    const data = {
        ForeignEq,
        ForeignInsTitute,
        EqType,
        type,
        uid,
        'task': 'save_foreign_parents_data'
    };

    const params = {
        method: 'POST',
        body: JSON.stringify(data)
    };
    dataAsync(params).then((returnData) => {
        if (returnData?.code == 2) {
            alert(returnData?.error);
        } else {
            var tableContent = '';
            if (typeof returnData !== 'undefined') {
                returnData.map((item, ind) => {
                    tableContent += `<tr>                                        
                                <td>${item.foreign_eq}</td>
                                <td>${item.foreign_institute}</td>                                        
                                <td class="text-center"><a href="./obc_annexure.php?action=delete&type=${type}&id=${item.id}"><img src="./img/icons/bin.png" style="width: 24px; height: 24px;" alt="Delete this Record?" title="Delete this Record?"/></a></td>
                            </tr>`
                })

                document.getElementById(`append_${type}`).innerHTML = tableContent;
                ForeignEqEle.value = ForeignInsTituteEle.value = '';
            }

        }
    }).catch((error) => {
        console.log(error)
    })
        .finally(() => {
            spinnerIdEle.classList.add('d-none')
            contentBtnIdEle.innerText = 'Add More';
            event.removeAttribute('disabled');;
        })

}