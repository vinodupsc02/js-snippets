const examMast = "All exams";
const uid = 'xxxxx1234';
const currentYear = new Date().getFullYear();

const examPreID = ['14', '15', '17'];

const eleToReset = ['month_year', 'roll_no_allocated', 'appeared_exam', 'qualified_main', 'appeared_inter', 'recommended_status', 'joined_yesno', 'continuing_status', 'resigned_date'];

const eleToEmpty = {
    'appeared_exam': ['appeared_inter', 'recommended_status', 'joined_yesno', 'continuing_status', 'resigned_date'],
    'appeared_inter': ['recommended_status', 'joined_yesno', 'continuing_status', 'resigned_date'],
    'recommended_status': ['joined_yesno', 'continuing_status', 'resigned_date'],
    'joined_yesno': ['continuing_status', 'resigned_date'],
    'continuing_status': ['resigned_date']
}

function addMore() {
    const eleShow = document.getElementById('appear_fields');
    if (eleShow.classList.contains('d-none')) {
        eleShow.classList.remove('d-none');
    } else {
        eleShow.classList.add('d-none');
    }
}

function resetByClass(ele) {
    const eleToReset = document.querySelectorAll(`.${ele.id}`);

    eleToReset.forEach((eleID, ind) => {
        document.getElementById(eleID.id).value = '';
    })
}

function resetFields(ele) {
    eleToReset.forEach((eleID, ind) => {
        document.getElementById(eleID).value = '';
    })
    const resetClass = document.querySelectorAll('.reset_hide');
    resetClass.forEach((ele, ind) => {
        ele.classList.add('d-none')
    })
}

function examChange(ele, appearStatus) {
    const getExamEle = document.getElementById('exam_name');
    const examNameID = getExamEle.value;
    const rowEle = ele.id;
    if (examPreID.includes(examNameID) && appearStatus == '1') {
        let eleToHidePre = document.querySelector(`[data-id=${rowEle}_pre]`);
        let eleToHideNot = document.querySelector(`[data-id=${rowEle}_notpre]`);

        eleToHidePre.classList.remove('d-none')
        eleToHideNot.classList.add('d-none')
    } else {
        let eleToHidePre = document.querySelector(`[data-id=${rowEle}_pre]`);
        let eleToHideNot = document.querySelector(`[data-id=${rowEle}_notpre]`);

        eleToHidePre.classList.add('d-none')
        eleToHideNot.classList.remove('d-none')
    }
}

function toggleFieldsExams(event) {
    const hitEle = event.id;
    let eleToHide = document.querySelector(`[data-id=${hitEle}]`);

    if (event.value == '1' && hitEle != 'continuing_status') {
        eleToHide.classList.remove('d-none')
    } else if (event.value == '2' && hitEle == 'continuing_status') {
        eleToHide.classList.remove('d-none')
    } else {
        const elesDnone = document.querySelectorAll(`.${hitEle}`);
        elesDnone.forEach((item, ind) => {
            item.classList.add('d-none')
        })
        eleToEmpty[hitEle].forEach((ele, ind) => {
            const getEle = document.getElementById(ele);
            getEle.value = '';
        })
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

//delete exam confirm
function deleteConfirm() {
    const askStr = 'Once you confirmed, the record cannot be retrieved again. Are you sure to delete??';
    if (confirm(askStr)) {
        return true;
    }

    return false;
}

//appear count load
const apInputs = document.getElementById('ap_inputs');

function loadAppearDetails(ele, appearCount) {
    const appearExamEle = document.getElementById('appear_exam');
    const appearExam = appearExamEle.value;
    if (appearExam == '') {
        alert("Please select Examination before appeared count!");
        appearExamEle.focus();
        return false;
    }

    var loadAppCHtml = '';
    for (var i = 1; i <= appearCount; i++) {
        loadAppCHtml += `
                                <div class="col-md-3 col-sm-12">
                                        <label for="appear_year" class="form-label">YEAR <span class="note">in format (YYYY) like ${currentYear - 1} </span></label>
                                        <input type="number" class="form-control" min=0 max="${currentYear}" required value="" name="appear_year[]" id="appear_year${i}" maxlength="4"/>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <label for="appear_rollno" class="form-label">ROLL NO.</label>
                                        <input type="text" pattern="[0-9]+" required class="form-control" value="" name="appear_rollno[]" id="appear_rollno${i}" maxlength="7"/>
                                    </div>
                            </div>`;
    }

    if (appearCount) {
        loadAppCHtml += `<div class="col-12 text-center mt-4">
                                <input type="hidden" name="uid" id="uid" value="${uid}" />
                                <input type="button" class="btn btn-primary" onclick="saveAppearData()" value="SAVE"></div>`;
        apInputs.innerHTML = loadAppCHtml;
        //eleToHide.classList.remove('d-none');
    } else {
        apInputs.innerHTML = '';
        //eleToHide.classList.add('d-none');
    }

}

//appear Data save ajax
async function dataAsync(params) {
    try {
        const response = await fetch('./ajax_functions.php', params);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function saveAppearData() {
    const appearExamEle = document.getElementById('appear_exam');
    const appearExam = appearExamEle.value;
    const appearCountEle = document.getElementById('appeared_count');
    const appearCount = appearCountEle.value;



    const appearYears = document.getElementsByName('appear_year[]');
    const appearRollnos = document.getElementsByName('appear_rollno[]');

    var appYears = [];
    appearYears.forEach((ele, ind) => {
        let Year = ele.value;
        if (Year == '') {
            alert("Please enter Appear Year!");
            ele.focus();
            return false;
        }

        if (Year != '' && Year > currentYear) {
            alert("Please enter correct Appear Year!");
            ele.focus();
            return false;
        }

        appYears.push(Year)
    })

var appRollnos = [];
appearRollnos.forEach((ele, ind) => {
    let rollNo = ele.value;
    if (rollNo == '') {
        alert("Please enter Appear Roll No");
        ele.focus();
        return false;
    }

    if (rollNo != '' && rollNo.length > 7) {
        alert("Please enter correct Appear Roll No!");
        ele.focus();
        return false;
    }

    appRollnos.push(rollNo)
})



const data = {
    appearExam,
    appearCount,
    appYears,
    appRollnos,
    uid,
    'task': 'save_appear_data'
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
                                                <td>${(ind + 1)}</td>
                                                <td>${item.exam_name}</td>
                                                <td>${item.appear_count}</td>
                                                <td>${item.years}</td>
                                                <td>${item.roll_nos}</td>
                                                <td class="text-center"><a href="./examination_info.php?action=delete&type=appear&id=${item.id}"><img src="./img/icons/bin.png" style="width: 24px; height: 24px;" alt="Delete this Record?" title="Delete this Record?"/></a></td>
                                            </tr>`
            })

            document.getElementById('show_table_data').innerHTML = tableContent;
            document.querySelector(`[data-id=ever_appeared_html]`).classList.remove('d-none');
            appearCountEle.value = '';
            loadAppearDetails(appearCountEle, 0);
            appearExamEle.value = '';
            document.getElementById('appear_fields').classList.add('d-none');
        }

    }
}).catch((error) => {
    console.log(error)
})

        }


//allocation status
function loadToggleHtml(ele) {
    const eleToHide = document.querySelector(`[data-id=${ele.id}]`);
    if (ele.id == 'allocation_serving') {
        if (ele.value == '2') {
            eleToHide.classList.remove('d-none');
        } else {
            eleToHide.classList.add('d-none');
        }
    } else {
        if (ele.value == '1') {
            eleToHide.classList.remove('d-none');
        } else {
            eleToHide.classList.add('d-none');
        }
    }

}