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
            <h2>CREATE A COUPON</h2>
        </div>

        <div class="row clearfix">
            <form id="dl-save-coupon">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Fill Data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    Title (This title is for you only)
                                    <input type="text" class="form-control" id="dl-coupon-title" required>
                                </label>
                                <label class="controls">
                                    Coupon Code (Keep it short)
                                    <input type="text" class="form-control" id="dl-coupon-code" required>
                                </label>
                                <label class="controls">
                                    Expires at
                                    <input type="datetime-local" class="form-control" id="dl-coupon-expires" required>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Fill Data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    Attached to service (Hold Ctrl to select multi services)
                                    <select id="dl-service" class="form-control" multiple required></select>
                                </label>
                                <label class="controls">
                                    Type
                                    <select id="dl-coupon-type" class="form-control" required>
                                        <option value="">-- Please select --</option>
                                        <option value="fixedDiscount">Fixed Discount</option>
                                        <option value="percentage">Percentage</option>
                                    </select>
                                </label>
                                <label class="controls">
                                    Amount
                                    <input type="number" class="form-control" id="dl-coupon-amount" required>
                                </label>
                                <button type="submit" class="btn btn-success">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>


<?php include('parts/footer.php'); ?>
</body>

</html>
