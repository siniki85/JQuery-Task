$(document).ready(function(){
    $.ajax({
        url: "https://api.publicapis.org/entries",
        method: "GET",
        dataType: "json",
        success: function (result) {
            let dataArr = result.entries;
            var row = '';
            $.each(dataArr, function (i, value) {
                row += `<tr><td>${value.API}</td><td>${value.Description}</td><td>${value.Auth}</td> <td>${value.Cors}</td> <td class="text-wrap"><a href="${value.Link}">${value.Link}</a></td> <td>${value.Category}</td></tr>`;
            });
            $('#dataTableMain #dataTable').append(row);
        }
    });
});