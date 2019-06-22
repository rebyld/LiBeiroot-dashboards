<!DOCTYPE html>
<html lang="en">

<?php include('parts/header.php'); ?>

<body class="theme-teal" data-type="trip">

<?php include('parts/loaders.php'); ?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php'); ?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>DASHBOARD</h2>
        </div>

        <!-- Widgets -->
        <div class="row clearfix">
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="info-box bg-pink hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">directions_car</i>
                    </div>
                    <div class="content">
                        <div class="text">NEW TRIPS</div>
                        <div class="number count-to" data-from="0" data-to="125" data-speed="1000"
                             data-fresh-interval="20"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="info-box bg-cyan hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">add_shopping_cart</i>
                    </div>
                    <div class="content">
                        <div class="text">NEW INSTASHOP</div>
                        <div class="number count-to" data-from="0" data-to="257" data-speed="1000"
                             data-fresh-interval="20"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="info-box bg-light-green hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">person_pin</i>
                    </div>
                    <div class="content">
                        <div class="text">NEW CAPTAINS</div>
                        <div class="number count-to" data-from="0" data-to="243" data-speed="1000"
                             data-fresh-interval="20"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="info-box bg-orange hover-expand-effect">
                    <div class="icon">
                        <i class="material-icons">person_add</i>
                    </div>
                    <div class="content">
                        <div class="text">NEW VISITORS</div>
                        <div class="number count-to" data-from="0" data-to="1225" data-speed="1000"
                             data-fresh-interval="20"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            <div class="col-md-12 m-b-30">
                <div class="header">
                    <h4>BY CATEGORY</h4>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        Embassy
                    </button>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        InstaShop
                    </button>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        Shoes
                    </button>
                </div>
            </div>
            <div class="col-md-12 m-b-30">
                <div class="header">
                    <h4>BY SERVICE</h4>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        Get Passport
                    </button>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        Get some papers
                    </button>
                    <button type="button" class="btn bg-cyan btn-lg m-r-10 dl-get-services">
                        Deliver my passport
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include('parts/footer.php'); ?>
</body>

</html>
