<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>


<body class="theme-teal coupons">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>CREATE A DRIVER WITH A CAR</h2>
        </div>

        <div class="row clearfix m-b-20">
            <form id="dl-save-driver">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Driver data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    First Name
                                    <input type="text" class="form-control" id="dl-driver-firstname" required>
                                </label>
                                <label class="controls">
                                    Last Name
                                    <input type="text" class="form-control" id="dl-driver-lastname" required>
                                </label>
                                <label class="controls">
                                    Mobile (Syrian number)
                                    <input type="text" class="form-control" id="dl-driver-syriannumber" required>
                                </label>
                                <label class="controls">
                                    Mobile (Lebanese number)
                                    <input type="text" class="form-control" id="dl-driver-lebanesenumber" required>
                                </label>
                                <label class="controls">
                                    Home Number
                                    <input type="text" class="form-control" id="dl-driver-homenumber" required>
                                </label>
                                <label class="controls">
                                    WhatsApp number
                                    <input type="text" class="form-control" id="dl-driver-whatsapp" required>
                                </label>
                                <label class="controls">
                                    Address
                                    <input type="text" class="form-control" id="dl-driver-address" required>
                                </label>
                                <label class="controls">
                                    Membership Id
                                    <input type="text" class="form-control" id="dl-driver-membershipid" required>
                                </label>
                                <label class="controls">
                                    Membership (Gold, Sliver, Bronze)
                                    <select id="dl-driver-membership" class="form-control" required>
                                        <option value="bronze">Bronze</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                    </select>
                                </label>
                                <label class="controls">
                                    Birth Date
                                    <input type="datetime-local" class="form-control" id="dl-driver-birthday" required>
                                </label>
                                <label class="controls">
                                    Driver Since
                                    <input type="datetime-local" class="form-control" id="dl-driver-driversince"
                                           required>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Car data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    Car Brand
                                    <input type="text" class="form-control" id="dl-car-brand" required>
                                </label>
                                <label class="controls">
                                    Car Model
                                    <input type="text" class="form-control" id="dl-car-model" required>
                                </label>
                                <label class="controls">
                                    Car Seats (Numbers only)
                                    <input type="text" class="form-control" id="dl-car-seats" required>
                                </label>
                                <label class="controls">
                                    Bags (Numbers only)
                                    <input type="text" class="form-control" id="dl-car-bags" required>
                                </label>
                                <label class="controls">
                                    Car Type
                                    <select id="dl-car-type" class="form-control" required>
                                        <option value="normal">Normal</option>
                                        <option value="van">Van</option>
                                        <option value="black">Black</option>
                                    </select>
                                </label>
                                <label class="controls">
                                    Image
                                    <input type="file" class="form-control" id="dl-car-license" required
                                           accept="image/png, image/jpeg, image/jpg">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
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
