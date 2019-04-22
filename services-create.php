<!DOCTYPE html>
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
            <h2>CREATE A SERVICE</h2>
        </div>

        <div class="row clearfix">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2>Fill Data
                            <small>Please enter all data!</small>
                        </h2>
                    </div>
                    <div class="body">
                        <form id="dl-save-service">
                            <div class="form-group">
                                <label class="controls">
                                    Name in English
                                    <input type="text" class="form-control" id="dl-service-name" required>
                                </label>
                                <label class="controls">
                                    Name in Arabic
                                    <input type="text" class="form-control" id="dl-service-namear" required>
                                </label>
                                <label class="controls">
                                    Description in English
                                    <input type="text" class="form-control" id="dl-service-description" required>
                                </label>
                                <label class="controls">
                                    Description in Arabic
                                    <input type="text" class="form-control" id="dl-service-descriptionar" required>
                                </label>
                                <label class="controls">
                                    Price (Numbers only)
                                    <input type="text" class="form-control" id="dl-service-price" required>
                                </label>

                                <label for="dl-service-type">Service Type</label>
                                <select id="dl-service-type" class="form-control" required>
                                    <option value="">-- Please select --</option>
                                    <option value="postaji">Postaji</option>
                                    <option value="trip">trip</option>
                                </select>

                            </div>
                            <button type="submit" class="btn btn-success">Save</button>
                        </form>
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
                            <label for="dl-forms-dropdown">Select Form</label>
                            <select id="dl-forms-dropdown" class="form-control" required>
                                <option>----</option>
                            </select>
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
