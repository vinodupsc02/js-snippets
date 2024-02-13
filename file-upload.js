const fileTypes = ["application/pdf"];
const mb = 1024;
const uid = 'xxxxx456';
const ajaxURL = 'https://xxxxxx.com/ajax_xxxx.js';

function validFileType(file) {
    return fileTypes.includes(file.files[0].type);
}

function returnFileSize(file) {
    const number = file.files[0].size;
    const $number = number / mb;
    if ($number > mb) {
        return false;
    }
    return true;
}

function validateFile(file) {
    if (!validFileType(file)) {
        alert('Please Upload Vaild file only PDF');
        file.value = ''
        return false;
    }
    if (!returnFileSize(file)) {
        alert("Uploaded File should be of Max 1MB");
        file.value = ''
        return false;
    }

    uploadFile(file)
}

async function uploadFile(file) {
    let formData = new FormData();
    const showEleid = `action_${file.id}`;
    const showEle = document.getElementById(showEleid);

    formData.append('file', file.files[0]);
    formData.append('type', file.id);
    formData.append('uuid', uid);
    formData.append('task', 'upload');

    await fetch(ajaxURL, {
        method: "POST",
        body: formData
    }).then((res) => res.json())
        .then((response) => {
            if (response?.success) {
                showEle.classList.remove('d-none');
                file.focus();
                file.value = ''
                alert(response?.message);
            } else {
                showEle.classList.add('d-none');
                file.focus();
                file.value = ''
                alert(response?.message);
            }
        })
}

async function deleteUploadedFile(file, type) {
    const showEleid = `action_${type}`;
    const showEle = document.getElementById(showEleid);

    const confirmMsg = "Do you really want to delete this uploaded document?";
    if (confirm(confirmMsg)) {

        let formData = new FormData();
        formData.append('type', type);
        formData.append('uuid', uid);
        formData.append('task', 'delete');

        await fetch(ajaxURL, {
            method: "POST",
            body: formData
        }).then((res) => res.json())
            .then((response) => {
                if (response?.success) {
                    showEle.classList.add('d-none');
                    file.focus();
                    alert(response?.message);
                } else {
                    file.focus();
                    alert(response?.message);
                }
            })
    }
}