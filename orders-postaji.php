<!DOCTYPE html>
<html lang="en">

<?php include('parts/header.php'); ?>

<body class="theme-teal homepage" data-type="postaji">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

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
            <!-- Task Info -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="card">
                    <div class="header">
                        <h2>OPS Overview</h2>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-hover dashboard-task-infos dl-orders-table">
                                <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Order Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Client Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tip to Damascus</td>
                                    <td>Tip</td>
                                    <td><span class="label bg-green">Doing</span></td>
                                    <td>John Doe</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>InstaShop Order</td>
                                    <td>Order</td>
                                    <td><span class="label bg-blue">To Do</span></td>
                                    <td>Jane Doe</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Tip to Beirut</td>
                                    <td>Tip</td>
                                    <td><span class="label bg-light-blue">On Hold</span></td>
                                    <td>Jack Sparrow</td>

                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Tip to Damascus</td>
                                    <td>Tip</td>
                                    <td><span class="label bg-orange">Wait Approvel</span></td>
                                    <td>Tony Stark</td>

                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>InstaShop Order</td>
                                    <td>Order</td>
                                    <td>
                                        <span class="label bg-red">Suspended</span>
                                    </td>
                                    <td>Cristiano Ronaldo</td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<?php include('parts/footer.php'); ?>
</body>

</html>
