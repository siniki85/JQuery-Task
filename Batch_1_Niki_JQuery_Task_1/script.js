let tblRow;
validation();
$("#addRow").click(function () {
    tblRow = '<tr>' + $('table tr').eq(5).html() + `<td><button type="button" class="btn remove m-1" id="removeButton"><i class="bi bi-trash-fill"></i></button></td>` + '</tr>';
    $("#dataTable").append(tblRow);
    validation();
});

$("#dataTableMain").on('click', '.remove', function () {
    $(this).parents('tr').remove();
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
 