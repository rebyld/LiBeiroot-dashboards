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

function getReadableDateWithoutTime(strangeDate) {
    return (new Date((new Date(strangeDate)).getTime())).toLocaleString().replace(/(.*)\D\d+/, '$1');
}

const orderRowTemplate = _.template('<tr>' +
    '<td><%= getReadableDateWithoutTime(createdAt) %></td>' +
    '<td><span class="label dl-f-14 label-<%= status %>"><%= status %></span></td>' +
    '<td><%= totalPrice %></td>' +
    '<td><%= itemTrueCost %></td>' +
    '<td><%= paymentStatus %></td>' +
    '<td><button class="btn bg-blue-grey dl-order-view-details" data-order-id="<%= _id %>">Details</button></td>' +
    '</tr>');

const pointTemplate = _.template('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">' +
    '                <div class="card">' +
    '                    <div class="header">' +
    '                        <h2><%= name %>' +
    '                            <small>Please enter all data!</small>' +
    '                        </h2>' +
    '                    </div>' +
    '                    <div class="body points-container" data-point="<%= point %>">' +
    '                        <div class="form-group">' +
    '                           <div class="controls">' +
    '                               <label>City name?</label>' +
    '                               <select class="form-control dl-selected-questions" data-key="city">' +
    '                                   <option>----</option>' +
    '                               </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="city" />' +
    '                           </div>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label class="controls">Address?' +
    '                                <select class="form-control dl-selected-questions" data-key="address">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="address" />' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label class="controls">Contact Name?' +
    '                                <select class="form-control dl-selected-questions" data-key="contactName">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="contactName" />' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label class="controls">Phone number?' +
    '                                <select class="form-control dl-selected-questions" data-key="phoneNumber">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="phoneNumber" />' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label class="controls">WhatsApp number?' +
    '                                <select class="form-control dl-selected-questions" data-key="whatsApp">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="whatsApp" />' +
    '                            </label>' +
    '                        </div>' +
    '                        <div class="form-group">' +
    '                            <label class="controls">Any Notes?' +
    '                                <select class="form-control dl-selected-questions" data-key="note">' +
    '                                    <option>----</option>' +
    '                                </select>' +
    '                               <input class="form-control dl-selected-questions dl-default-value" placeholder="default value" data-key="note" />' +
    '                            </label>' +
    '                        </div>' +
    '                    </div>' +
    '                </div>' +
    '            </div>');


const defaultJumpRuleTemplate = _.template('' +
    '<h5><%= type %></h5>' +
    '<h5>Will go to -> <%= name %></h5>' +
    '<hr/>');

const normalJumpRuleTemplate = _.template('' +
    '<h5><%= type %></h5>' +
    '<h5><%= answerName %> -> <%= name %></h5>' +
    '<hr/>');

const betweenJumpRuleTemplate = _.template('' +
    '<h5><%= type %></h5>' +
    '<h5><%= answerName %> -> <%= name %></h5>' +
    '<h5>Time rule is: -> <%= time %></h5>' +
    '<hr/>');

const priceJumpRuleTemplate = _.template('' +
    '<h5><%= type %></h5>' +
    '<h5>When selecting: <%= answerName %> -> Will add price: <%= price %></h5>' +
    '<hr/>');

const buttonTemplate = _.template('' +
    '<button type="button" class="btn bg-cyan btn-lg m-r-10 dl-filter-button m-b-10" data-type="<%= type %>">' +
    '<%= title %>' +
    '</button>' +
    '');

const singleOrderTemplate = _.template('' +
    '<div class="row">' +
    '   <div class="col-md-6">' +
    '   <label>' +
    '      Change Status: ' +
    '      <select class="dl-single-order-status-container dl-status-value form-control m-t-10" data-order-id="<%= _id %>" data-endpoint="status">' +
    '      <option value="initiated">Initiated</option>' +
    '      <option value="edited">Edited</option>' +
    '      <option value="confirmed">Confirmed</option>' +
    '      <option value="pending">Pending</option>' +
    '      <option value="matching">Matching</option>' +
    '      <option value="matched">Matched</option>' +
    '      <option value="processing">Processing</option>' +
    '      <option value="completed">Completed</option>' +
    '      <option value="completedAndReviewed">Completed and Reviewed</option>' +
    '      </select>' +
    '   </label>' +
    '   </div>' +
    '</div>' +
    '<hr class="m-t-20">' +
    '<div class="row">' +
    '   <div class="col-md-6">' +
    '   <label>' +
    '      Change Payment Status: ' +
    '      <select class="dl-single-order-status-container dl-payment-value form-control m-t-10" data-order-id="<%= _id %>" data-endpoint="payment_status">' +
    '      <option value="aheadA">-- Select Status --</option>' +
    '      <option value="aheadA">Ahead A</option>' +
    '      <option value="duringA">During A</option>' +
    '      <option value="afterA">After A</option>' +
    '      <option value="aheadB">Ahead B</option>' +
    '      <option value="duringB">During B</option>' +
    '      <option value="afterB">After B</option>' +
    '      <option value="collected">Collected</option>' +
    '      </select>' +
    '   </label>' +
    '   </div>' +
    '</div>' +
    '<hr class="m-t-20">' +
    '<div class="row">' +
    '   <div class="col-md-4"><h5>Cancel Order:</h5></div>' +
    '</div>' +
    '<div class="row">' +
    '   <div class="col-md-6">' +
    '      <select class="dl-single-order-cancel-container form-control">' +
    '      <option value="">-- Reason to cancel --</option>' +
    '      <option value="canceledByCustomerNoReason">By Customer (no reason)</option>' +
    '      <option value="CanceledByCustomerForPrice">By Customer (for price)</option>' +
    '      <option value="canceledByCustomerDuration">By Customer (duration)</option>' +
    '      <option value="canceledByCustomerOther">By Customer (others)</option>' +
    '      <option value="canceledByDriver">By Driver</option>' +
    '      <option value="canceledByOPSRules">By OPS (rules)</option>' +
    '      <option value="canceledByOPSNoMatch">By OPS (no match)</option>' +
    '      </select>' +
    '   </div>' +
    '   <div class="col-md-6">' +
    '      <button class="btn btn-danger dl-cancel-order form-control" data-order-id="<%= _id %>">Cancel</button>' +
    '   </div>' +
    '</div>');

//todo: I'll need this later, keep it lazy shit!
const questionLiElementTemplate = _.template('<li class="ui-state-default clearfix card filtered" data-index="<%= vars.index %>">' +
    '<div class="clearfix">' +
    '<p class="pull-left"></p>' +
    '<p class="dl-small-p pull-right"></p>' +
    '</div>' +
    '<p class="dl-small-p"></p>' +
    '</li>');