﻿<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>

<body class="theme-teal services">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>VIEW ALL SERVICES</h2>
        </div>

        <!-- Widget -->
        <div class="row clearfix m-b-20">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttons-container">
                <button type="button" class="btn bg-cyan btn-lg dl-get-services">GET SERVICES</button>
            </div>
        </div>
        <div class="row clearfix dl-preview-service dl-preview-services-container">
        </div>
    </div>
</section>


<?php include('parts/footer.php'); ?>
</body>

</html>