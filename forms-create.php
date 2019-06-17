<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>

<body class="theme-teal forms">

<?php include('parts/loaders.php'); ?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php'); ?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>1. Generic information</h2>
        </div>

        <div class="row clearfix m-b-20 dl-form-content">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="card dl-init-form-container">
                    <div class="header block-header">
                        <h2>Enter a form name first!
                            <small>Select an easy to remember name, to use it when creating a service!</small>
                        </h2>
                    </div>
                    <div class="body">
                        <div class="form-group">
                            <div class="controls">
                                <input type="text" id="form-name" class="form-control"
                                       placeholder="Ex. InstaShop Form"
                                       required>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="card dl-init-form-container">
                    <div class="header block-header">
                        <h2>Submitting message
                            <small>a message that will appear after a user submit form</small>
                        </h2>
                    </div>
                    <div class="body">
                        <div class="form-group">
                            <div class="controls">
                                <input type="text" placeholder="Ex: Thanks! We'll contact you in 2 hours."
                                       class="form-control"
                                       id="dl-form-message" required>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="block-header">
                    <h2>2. Let's start creating our Form</h2>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group m-t-10">
                    <label class="controls">
                        Type here to filter questions (case sensitive!)
                        <input id="myInput" class="p-l-10 form-control m-t-5" type="text"
                               placeholder="Search.."></label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="row clearfix m-b-20">
                    <div class="col-md-6 dl-all-questions-container">
                        <div class="header block-header">
                            <h2>Drag questions from here
                                <small>be sure to select all questions need in form!</small>
                            </h2>
                        </div>
                        <ul id="sortable1" class="connectedSortable filtered-container"></ul>
                    </div>
                    <div class="col-md-6 dl-selected-questions-container">
                        <div class="header block-header">
                            <h2>Drop questions here
                                <small>sort questions as wanted to appear on app!</small>
                            </h2>
                        </div>
                        <ul id="sortable2" class="connectedSortable"></ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="block-header">
                    <h2>3. Next, Let's set some important points</h2>
                </div>
            </div>
        </div>

        <div class="row" id="dl-points-container"></div>

        <div class="row m-b-60">
            <div class="col-md-4">
                <p class="label label-danger m-b-10">BE SURE TO ENTER ALL RULES BEFORE SUBMITTING!</p>
                <button id="dl-submit-form" class="btn btn-success">SAVE ALL!</button>
            </div>
        </div>


    </div>
</section>


<div class="modal fade" id="rulesFormModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog  modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Create rules</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="dl-rules-container">
                            <h4 class="dl-question-text"></h4>
                            <h5 class="dl-question-text-ar"></h5>
                            <hr>
                            <div class="row">
                                <div class="col-md-12 dl-answers-container"></div>
                            </div>
                            <button class="btn btn-success dl-save-rules-btn">Save Rules for this question</button>
                        </div>
                    </div>
                    <div class="col-md-4" id="dl-selected-questions">
                        <h2>Available questions</h2>
                        <p>Be sure to select a question and drag/drop it to see it here!</p>
                        <hr>
                        <div class="dl-selected-questions-container-preview"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<?php include('parts/footer.php'); ?>
</body>

</html>
