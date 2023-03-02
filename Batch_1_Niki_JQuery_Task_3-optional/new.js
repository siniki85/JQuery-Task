let counteId = 6;
let tableData = [{
        id: 1,
        name: 'Niki',
        subject: 'Python',
        mark: '85'
    },
    {
        id: 2,
        name: 'Dhruvi',
        subject: 'PHP',
        mark: '74'
    },
    {
        id: 3,
        name: 'Niki',
        subject: 'JAVA',
        mark: '63'
    },
    {
        id: 4,
        name: 'Dhruvi',
        subject: 'Maths',
        mark: '69'
    },
    {
        id: 5,
        name: 'Hasti',
        subject: 'CC',
        mark: '30'
    }
]

$(document).ready(function () {
    $.each(tableData, function (i) {
        $('#dataTable').append(`<tr id="${tableData[i].id}"><td><p class="counter"></p></td> <td><div class="valid">
        <input type="text" name="fname" value="${tableData[i].name}" class="form-control" /><p>*Please Enter Username*</p></div></td> 
    <td><div class="valid"><input value="${tableData[i].subject}" name="sub" type="text" class="form-control" /><p>*Please Enter Subject*</p></div></td> <td><div class="valid"><input value="${tableData[i].mark}" name="mark" type="number" class="form-control" min="0" max="100" onkeydown="return event.keyCode == 69 ? false : true" /><p>*Enter Mark Between 0 to 100*</p></div></td> <td><button type="button" onclick="onAccept(this)" class="btn accept m-1"> <i class="bi bi-check-square"></i></button><button type="button" class="btn reject m-1" onclick="onReject(this)"> <i class="bi bi-x-square"></i></button></td>
    </tr>`);
    });
    validation();
});

$("#addRow").click(function () {
    tableData.push({
        id: counteId,
        name: '',
        subject: "",
        mark: ""
    });
    $("#dataTable").append(`<tr id="${counteId}"><td><p class="counter"></p></td> <td><div class="valid"><input type="text" name="fname" value="" class="form-control" /><p>*Please Enter Username*</p></div></td> <td><div class="valid"><input value="" name="sub" type="text" class="form-control" /><p>*Please Enter Subject*</p></div></td> <td><div class="valid"><input value="" name="mark" type="number" class="form-control" min="0" max="100" onkeydown="return event.keyCode == 69 ? false : true" /><p>*Enter Mark Between 0 to 100*</p></div></td> <td><button type="button" onclick="onAccept(this)" class="btn accept m-1"> <i class="bi bi-check-square"></i></button><button type="button" class="btn reject m-1" onclick="onReject(this)"> <i class="bi bi-x-square"></i></button></td> <td><button type="button" class="btn remove m-1" id="removeButton"><i class="bi bi-trash-fill"></i></button></td></tr>`);
    counteId++;
    validation();
});

$("#dataTableMain").on('click', '.remove', function () {
    let id = $(this).closest('tr').attr('id');
    $(this).closest('tr').remove();
    tableData = tableData.filter(function (obj) {
        return obj.id !== parseInt(id);
    });
    counteId--;
});

function onAccept(acceptBtn) {
    $(acceptBtn).addClass('acceptBtn');
    let rejectBtn = $(acceptBtn).next();
    $(rejectBtn).removeClass('rejectBtn')
}

function onReject(rejectBtn) {
    $(rejectBtn).addClass('rejectBtn');
    let acceptBtn = $(rejectBtn).prev();
    $(acceptBtn).removeClass('acceptBtn');
}

$("#saveBtn").click(function () {
    $.each($('input'), function () {
        $(this).val() == '' ?
            ($(this).closest('div').addClass('invalid'), $(this).closest('div').removeClass('valid')) :
            ($(this).closest('div').addClass('valid'));
    });

    // $('#dataTableMain tbody tr').each(function () {
    //     $(this).find("td").each(function () {
    //         let id = $('.acceptBtn').parent();
    //         console.log(id);
    //     });
    // });

    // $('#dataTableMain').on("click", ".acceptBtn", function () {
    // let clickedBtnID = $(this).parent().parent().get();

    // console.log(getValue);

    // tableData.forEach((element, index) => {
    //     if (getValue[index]) {
    //         element.name = getValue[index][0];
    //         element.subject = getValue[index][1];
    //         element.mark = getValue[index][2];
    //     }
    // });
    // console.log(tableData);
    // });

    // let getValue = $('#dataTable').find('tr').map(function () {
    //     return [$("input", this).map(function () {
    //         return $(this).val();
    //     }).get()];
    // }).get();
    let check = $('.acceptBtn').closest('tr');
    let getValue = $(check).map(function () {
        return [$("input", this).map(function () {
            return $(this).val();
        }).get()];
    }).get();

    // tableData.forEach((element, index) => {
    //     if (getValue[index]) {
    //         element.name = getValue[index][0];
    //         element.subject = getValue[index][1];
    //         element.mark = getValue[index][2];
    //     }
    // });

    let showDiv = document.getElementById("dataContainer");
    showDiv.style.visibility = "visible";
    $("#showData").html("");
    $("#showData").html(`<thead><tr> <th scope="col">No.</th> <th scope="col" id="fname">Name <i class="bi bi-arrow-down-up"></i></th> <th scope="col" id="sub">Subject <i class="bi bi-arrow-down-up"></i></th> <th scope="col" id="mark">Mark</th> <th scope="col">Result</th> </tr></thead><tbody>`);
    for (const item of getValue) {
        const row = $("<tr></tr>");
        row.append($(`<td><p class="counter"></p></td>`));
        for (const val of item) {
            const col = $(`<td></td>`);
            col.text(val);
            row.append(col);
            if (val < 34) {
                row.addClass("table_danger");
            }
            console.log(val);
        }
        row.append($("<td></td>"));
        $("#showData").append(row);
    }
});

$("#searchHere").on("keyup", function () {
    $("#dataForm").submit(function (e) {
        e.preventDefault();
    });
    let keyword = $(this).val();
    keyword = keyword.toUpperCase();
    $("#showData tr").each(function (index) {
        if (index !== 0) {
            let $row = $(this);
            let matches = $row.find('td').filter(function (ix, item) {
                let keyword_value = $(item).text().toUpperCase();
                return keyword_value.indexOf(keyword) > -1;
            });
            if (matches.length != 0) {
                $row.show();
            } else {
                $row.hide();
            }
        }
    });
});

function sortByName_Subject_Mark(colIndex, type) {
    let sortOrder = $('#showData thead tr>th:eq(' + colIndex + ')').data('sortOrder');
    sortOrder = sortOrder == 'ASC' ? 'DESC' : 'ASC';
    $('#showData thead tr>th:eq(' + colIndex + ')').data('sortOrder', sortOrder);
    $('#showData tbody tr').sort(function (a, b) {
        a = $(a).find('td:eq(' + colIndex + ')').text();
        b = $(b).find('td:eq(' + colIndex + ')').text();
        switch (type) {
            case 'text':
                return sortOrder == 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
                break;
            case 'number':
                return sortOrder == 'ASC' ? a - b : b - a;
                break;
        }
    }).appendTo('#showData tbody');
}

$('#showData').on('click', '#fname', function () {
    sortByName_Subject_Mark(1, 'text');
});
$('#showData').on('click', '#sub', function () {
    sortByName_Subject_Mark(2, 'text');
});
$('#showData').on('click', '#mark', function () {
    sortByName_Subject_Mark(3, 'number');
});

function validation() {
    var $regexname = /[a-zA-Z]/;
    let $regexmark = /^0*(?:[1-9][0-9]?|100)$/;
    $('input[type="text"]').on('keyup', function () {
        if (!$(this).val().match($regexname)) {
            $(this).closest('div').addClass('invalid');
            $(this).closest('div').removeClass('valid');
        } else {
            $(this).closest('div').addClass('valid');
        }
    });
    $('input[name="mark"]').on('keyup', function () {
        if (!$(this).val().match($regexmark)) {
            $(this).closest('div').addClass('invalid');
            $(this).closest('div').removeClass('valid');
        } else {
            $(this).closest('div').addClass('valid');
        }
    });
}
validation();