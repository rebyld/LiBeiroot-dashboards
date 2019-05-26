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
            <h2>CREATE A QUESTION</h2>
        </div>

        <!-- Widget -->
        <!-- todo: add missing types -->
        <div class="row clearfix m-b-20">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttons-container">
                <button type="button" class="generate-question btn bg-pink btn-lg" data-question-type="text">ADD NORMAL
                    TEXT
                </button>
                <button type="button" class="generate-question btn bg-indigo btn-lg" data-question-type="select">ADD
                    SELECT
                </button>
                <button type="button" class="generate-question btn bg-teal btn-lg" data-question-type="text_area">ADD
                    TEXT AREA
                </button>
                <button type="button" class="generate-question btn bg-orange btn-lg" data-question-type="multi_select">
                    ADD MULTI SELECT
                </button>
                <button type="button" class="generate-question btn bg-blue btn-lg" data-question-type="checkbox">ADD
                    CHECKBOX
                </button>
                <button type="button" class="generate-question btn bg-blue-grey btn-lg" data-question-type="label">ADD
                    LABEL
                </button>
                <button type="button" class="generate-question btn bg-amber btn-lg" data-question-type="date">ADD
                    DATE
                </button>
                <button type="button" class="generate-question btn bg-deep-orange btn-lg" data-question-type="time">ADD
                    TIME
                </button>
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>Fill Data
                            <small>Click on a question type above to see question required data</small>
                        </h2>
                    </div>
                    <div class="body">
                        <form id="dynamic-form"></form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include('parts/footer.php'); ?>
</body>

</html>
