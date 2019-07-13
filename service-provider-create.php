<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>


<body class="theme-teal coupons">

<?php include('parts/loaders.php'); ?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php'); ?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>CREATE A SERVICE PROVIDER</h2>
        </div>

        <div class="row clearfix m-b-20 dl-form-content">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="card dl-init-form-container">
                    <div class="header block-header">
                        <h2>First, please choose a type</h2>
                    </div>
                    <div class="body">
                        <div class="form-group">
                            <label class="controls">
                                <select id="dl-service-provider-type" class="form-control" required>
                                    <option value="">-- Select one --</option>
                                    <option value="driver">Driver</option>
                                    <option value="postaji">Postaji</option>
                                    <option value="pickup">Pickup</option>
                                    <option value="delivery">Delivery</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row clearfix m-b-20">
            <form id="dl-save-service-provider">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 dl-service-provider-data-main">
                    <div class="card">
                        <div class="header">
                            <h2>Provider data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    First Name
                                    <input type="text" class="form-control" id="dl-service-provider-firstname" required>
                                </label>
                                <label class="controls">
                                    Last Name
                                    <input type="text" class="form-control" id="dl-service-provider-lastname" required>
                                </label>
                                <label class="controls">
                                    Mobile (Syrian number)
                                    <input type="text" class="form-control" id="dl-service-provider-syriannumber"
                                           required>
                                </label>
                                <label class="controls">
                                    Mobile (Lebanese number)
                                    <input type="text" class="form-control" id="dl-service-provider-lebanesenumber"
                                           required>
                                </label>
                                <label class="controls">
                                    Home Number
                                    <input type="text" class="form-control" id="dl-service-provider-homenumber"
                                           required>
                                </label>
                                <label class="controls">
                                    WhatsApp number
                                    <input type="text" class="form-control" id="dl-service-provider-whatsapp" required>
                                </label>
                                <label class="controls">
                                    Address
                                    <input type="text" class="form-control" id="dl-service-provider-address" required>
                                </label>
                                <label class="controls">
                                    Membership Id
                                    <input type="text" class="form-control" id="dl-service-provider-membershipid"
                                           required>
                                </label>
                                <label class="controls">
                                    Membership (Gold, Sliver, Bronze)
                                    <select id="dl-service-provider-membership" class="form-control" required>
                                        <option value="bronze">Bronze</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                    </select>
                                </label>
                                <label class="controls">
                                    Birth Date
                                    <input type="datetime-local" class="form-control" id="dl-service-provider-birthday"
                                           required>
                                </label>
                                <label class="controls">
                                    Provider Since
                                    <input type="datetime-local" class="form-control" id="dl-service-provider-since"
                                           required>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 dl-service-provider-data-car"></div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-success">Save</button>
                </div>
            </form>
        </div>
    </div>
</section>


<?php include('parts/footer.php'); ?>
</body>

</html>
