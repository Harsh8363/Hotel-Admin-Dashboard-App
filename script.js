document.addEventListener('DOMContentLoaded', function () {
    var bookingForm = document.getElementById('bookingForm');
    var bookingsTable = document.getElementById('bookingsTable').getElementsByTagName('tbody')[0];

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        var email = document.getElementById('email').value;
        var roomType = document.getElementById('roomType').value;
        var startTime = new Date(document.getElementById('startTime').value);
        var endTime = new Date(document.getElementById('endTime').value);

        var durationHours = (endTime - startTime) / (1000 * 60 * 60);

        var price = calculatePrice(roomType, durationHours);

        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td>' + email + '</td>' +
            '<td>' + roomType + '</td>' +
            '<td>₹' + price.toFixed(2) + '</td>' +
            '<td>' + startTime.toLocaleString() + '</td>' +
            '<td>' + endTime.toLocaleString() + '</td>' +
            '<td><button class="deleteBtn">Delete</button></td>'; 

        var deleteBtn = newRow.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function () {
            newRow.remove(); 
        });

        bookingsTable.appendChild(newRow);

        bookingForm.reset();
    });
    function calculatePrice(roomType, durationHours) {
        var ratePerHour;

        switch (roomType) {
            case 'A':
                ratePerHour = 100; 
                break;
            case 'B':
                ratePerHour = 80; 
                break;
            case 'C':
                ratePerHour = 50;
                break;
            default:
                ratePerHour = 0;
        }

        var totalPrice = ratePerHour * durationHours;
        return totalPrice;
    }
});
