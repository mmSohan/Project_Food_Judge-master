var lat = parseFloat($('#lat').text());
var long = parseFloat($('#long').text());
var name = $('#name').text();
var ot = parseInt($("#ot").text());
var ct = parseInt($("#ct").text());
var rating = parseInt($("#rating").text());

var h = parseInt(new Date().getHours());
var m = parseInt(new Date().getMinutes());
var time = (h*60)+m;

for(var i=1; i<=rating; i++){
    $(`#${i}`).css('background', '#ffc515');
}


if(time>=ot && time<=ct) $('#status').text('Open now');
else $('#status').text('close now');

var map = L.map('mapid').setView([lat, long], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, long]).addTo(map)
            .bindPopup(name)
            .openPopup();




                