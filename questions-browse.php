<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>


<body class="theme-teal">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>VIEW ALL QUESTIONS</h2>
        </div>

        <!-- Widget -->
        <div class="row clearfix m-b-20">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttons-container">
                <button type="button" class="btn bg-purple btn-lg dl-get-questions">GET QUESTIONS</button>
            </div>
        </div>
        <div class="row clearfix dl-preview-question dl-preview-questions-container">
        </div>
    </div>
</section>


<?php include('parts/footer.php'); ?>
</body>

</html>
