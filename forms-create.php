<!DOCTYPE html>
<html lang="en">
<?php include('parts/header.php'); ?>

<body class="theme-teal forms">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>CREATE A DYNAMIC FORM</h2>
        </div>

        <!-- Widget -->
        <div class="row clearfix m-b-20">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="card dl-init-form-container">
                    <div class="header block-header">
                        <h2>Enter a form name first!
                            <small>Select an easy to remember name, to use it when creating a service!</small>
                        </h2>
                    </div>
                    <div class="body">
                        <form id="dl-init-form">
                            <div class="form-group">
                                <div class="controls">
                                    <input type="text" id="form-name" class="form-control"
                                           placeholder="Ex. InstaShop Form"
                                           required>
                                </div>
                            </div>
                            <button class="btn btn-success btn-lg">Start Creating a Form</button>
                        </form>
                    </div>

                </div>
            </div>

        </div>


        <div class="row clearfix m-b-20 dl-form-content">
            <div class="col-md-6">
                <div class="row clearfix m-b-20">
                    <div class="col-md-6 dl-all-questions-container">
                        <div class="header block-header">
                            <h2>Drag questions from here
                                <small>be sure to select all questions need in form!</small>
                            </h2>
                            <div class="form-group m-t-10">
                                <label class="controls">
                                    Type here to filter results (case sensitive!)
                                    <input id="myInput" class="form-control m-t-5" type="text" placeholder="Search.."></label>
                            </div>
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

                <div class="card" style="padding: 20px;">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label class="controls">
                                Submitting message
                                <input type="text" placeholder="Ex: Thanks! We'll contact you in 2 hours." class="form-control"
                                       id="dl-form-message" required>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row m-b-10">
                    <div class="col-md-12">
                        <p class="label label-danger m-b-10">BE SURE TO ENTER ALL RULES BEFORE SUBMITTING!</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button id="dl-submit-form" class="btn btn-success">SAVE ALL!</button>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="header block-header">
                    <h2>Append Rules to each question!
                        <small>(only questions with answers)</small>
                    </h2>
                </div>

                <div class="row">
                    <div class="col-md-12">
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
                </div>
            </div>
        </div>
    </div>
</section>


<?php include('parts/footer.php'); ?>
</body>

</html>
