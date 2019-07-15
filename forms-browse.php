<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>


<body class="theme-teal get-forms">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>VIEW ALL FORMS</h2>
        </div>

        <div class="row clearfix dl-preview-form dl-preview-forms-container"></div>
    </div>
</section>

<div class="modal fade" id="singleFormModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Form Details</h3>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</div>


<?php include('parts/footer.php'); ?>
</body>

</html>
