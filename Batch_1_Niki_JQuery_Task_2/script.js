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

function againStart() {
    let timer2 = "8:00";
    let interval = setInterval(function () {
        let timer = timer2.split(':');
        let minutes = parseInt(timer[0], 10);
        let seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = (seconds == 0 && minutes > 0) ? --minutes : minutes;
        if (minutes == 0 && seconds == 0) {
            console.log(timer2);
            clearInterval(interval);
        }
        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        $('#countdown').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;

        if (seconds == 0 && minutes == 0) {
            Swal.fire({
                title: "Welcome To Animation World",
                text: "Cool Animation Is Waiting For You!",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                confirmButtonText: 'Hurray!',
                customClass: "frosted-glass",
                backdrop: `rgba(0,0,123,0.4) url("bd3.gif")`
            }).then((res) => {
                if (res.isConfirmed) {
                    againStart();
                }
            });
        }
    }, 10);
}
againStart();