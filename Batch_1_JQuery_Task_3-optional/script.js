function generateTable() {
    let rows = $('#row').val();
    let columns = $('#column').val();
    $('#table').empty();
    let table = $("<table class='table' id='table'>").insertAfter("div:last");
    for (let i = 0; i < rows; i++) {
        let row = $("<tr>");
        for (let j = 0; j < columns; j++) {
            $(`<td> ${i}${j} </td>`).appendTo(row);
        }
        table.append(row);
    }
}