var driverTemplate = _.template('<div class="col-md-6">' +
    '<div class="card">' +
    '<div class="header clearfix">' +
    '<h2 class="pull-left"><%= firstName %> <%= lastName %></h2>' +
    ' <i class="pull-right material-icons col-red dl-delete" data-endpoint="/drivers/" data-render="dl-get-drivers" data-id="<%= _id %>">delete</i> ' +
    '</div>' +
    '<div class="dl-card-content">' +
    '<div class="row">' +
    '<div class="col-md-12">' +
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
    '<div class="header clearfix">' +
    '<h2 class="pull-left"><%= title %></h2>' +
    ' <i class="pull-right material-icons col-red dl-delete" data-endpoint="/cards/" data-render="dl-get-cards" data-id="<%= _id %>">delete</i> ' +
    '</div>' +
    '<div class="body">' +
    '<div class="dl-card-image" style="background-image: url(<%= image %>);"></div>' +
    '<div class="dl-card-content">' +
    '<p><%= headerText %></p>' +
    '<p><%= description %></p>' +
    '<p>Expires at: <%=getReadableDate(expiresAt) %></p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');

var categoryTemplate = _.template('<div class="col-md-4">' +
    '<div class="card">' +
    '<div class="header clearfix">' +
    '<h2 class="pull-left"><%= title %></h2>' +
    ' <i class="pull-right material-icons col-red dl-delete" data-endpoint="/categories/" data-render="dl-get-categories" data-id="<%= _id %>">delete</i> ' +
    '</div>' +
    '<div class="body clearfix">' +
    '<div class="col-md-4 dl-card-image" style="background-image: url(<%= image %>);width: 50px;height: 50px"></div>' +
    '<div id="<%= _id %>" class="col-md-8 dl-card-content p-l-0"> ' +
    '<p>Type: <%= type %></p>' +
    '<h4>Attached to Services:</h4>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');


const couponTemplate = _.template('<div class="col-md-4">' +
    '<div class="card">' +
    '<div class="header clearfix">' +
    '<h2 class="pull-left"><%= title %>: <span class="label label-info"><%= code %></span></h2>' +
    ' <i class="pull-right material-icons col-red dl-delete" data-endpoint="/coupons/" data-render="dl-get-coupons" data-id="<%= _id %>">delete</i> ' +
    '</div>' +
    '<div class="dl-card-content">' +
    '<span><%= type %>: <%= amount %></span>' +
    '<span class="m-l-10"></span>' +
    '<div id="<%= _id %>">' +
    '<h4>Attached to Services:</h4>' +
    '</div>' +
    '<p>Expires at: <%=getReadableDate(expiresAt) %></p>' +
    '</div>' +
    '</div>' +
    '</div>');

function getReadableDate(strangeDate) {
    return (new Date((new Date(strangeDate)).getTime())).toLocaleString();
}

const orderRowTemplate = _.template('<tr>' +
    '<td><%= service.name %></td>' +
    '<td><%= status %></td>' +
    '<td>info 3</td>' +
    '</tr>');

const pointTemplate = _.template('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">' +
    '                <div class="card">' +
    '                    <div class="header">' +
    '                        <h2><%= name %>' +
    '                            <small>Please enter all data!</small>' +
    '                        </h2>' +
    '                    </div>' +
    '                    <div class="body">' +
    '                        <div class="form-group">' +
    '                            <label for="dl-point-city">City name?</label>' +
    '                            <select id="dl-point-city" class="form-control dl-selected-questions">' +
    '                                <option>----</option>' +
    '                            </select>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label for="dl-point-address" class="controls">Address?' +
    '                                <select id="dl-point-city" class="form-control dl-selected-questions">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label for="dl-point-phone" class="controls">Phone number?' +
    '                                <select id="dl-point-city" class="form-control dl-selected-questions">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label for="dl-point-whatsapp" class="controls">WhatsApp number?' +
    '                                <select id="dl-point-city" class="form-control dl-selected-questions">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label for="dl-point-notes" class="controls">Any Notes?' +
    '                                <select id="dl-point-city" class="form-control dl-selected-questions">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                            </label>' +
    '                        </div>' +
    '                    </div>' +
    '                </div>' +
    '            </div>');


//todo: I'll need this later, keep it lazy shit!
const questionLiElementTemplate = _.template('<li class="ui-state-default clearfix card filtered" data-index="<%= vars.index %>">' +
    '<div class="clearfix">' +
    '<p class="pull-left"></p>' +
    '<p class="dl-small-p pull-right"></p>' +
    '</div>' +
    '<p class="dl-small-p"></p>' +
    '</li>');
