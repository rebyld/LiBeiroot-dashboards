var driverTemplate = _.template('<div class="col-md-6">' +
    '<div class="card">' +
    '<div class="dl-card-content">' +
    '<div class="row">' +
    '<div class="col-md-12">' +
    '<h4><%= firstName %> <%= lastName %></h4>' +
    '<hr>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<h5>Status:</h5>' +
    '<p>Membership: <%= memberShip %></p>' +
    '<p>Membership points: <%= memberShipPoints %></p>' +
    '<p>Total revenue: <%= totalRevenue %></p>' +
    '<p>Total profit: <%= totalProfit %></p>' +
    '<p>Postaji Count: 0</p>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<h5>Phones:</h5>' +
    '<p>Syria: <%= syrianNumber %></p>' +
    '<p>Lebanon: <%= lebaneseNumber %></p>' +
    '<p>WhatsApp: <%= whatsApp %></p>' +
    '<p>Home: <%= homeNumber %></p>' +
    '</div>' +
    '<div class="col-md-12">' +
    '<h4>Car Details:</h4>' +
    '<hr>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<p>Model: <%= car.brand %></p>' +
    '<p>Brand: <%= car.model %></p>' +
    '<p>Seats: <%= car.seats %></p>' +
    '<p>Bags: <%= car.bags %></p>' +
    '<p>Type: <%= car.type %></p>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<img class="img-responsive" src="<%= car.licensePicture %>"' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');

var cardTemplate = _.template('<div class="col-md-4">' +
    '<div class="card">' +
    '<div class="dl-card-image" style="background-image: url(<%= image %>);"></div>' +
    '<div class="dl-card-content">' +
    '<p><%= headerText %></p>' +
    '<h4><%= title %></h4>' +
    '<p><%= description %></p>' +
    '<p>Expires at: <%=getReadableDate(expiresAt) %></p>' +
    '</div>' +
    '</div>' +
    '</div>');

const couponTemplate = _.template('<div class="col-md-4">' +
    '<div class="card">' +
    '<div class="dl-card-content">' +
    '<h5>XS15</h5>' +
    '<span>fixedDiscount</span>' +
    '<span class="m-l-10">1400</span>' +
    '<div id="<%= _id %>">' +
    '<h4>Attached to Services:</h4>' +
    '</div>' +
    '<p>Expires at: 1/1/2020, 1:59:00 AM</p>' +
    '</div>' +
    '</div>' +
    '</div>');

function getReadableDate(strangeDate) {
    return (new Date((new Date(strangeDate)).getTime())).toLocaleString();
}