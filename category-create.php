<!DOCTYPE html>
<html lang="en">

<?php include('parts/header.php'); ?>

<body class="theme-teal services cards">

<?php include('parts/loaders.php');?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php');?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>CREATE A CATEGORY</h2>
        </div>

        <div class="row clearfix">
            <form id="dl-save-category">
                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Fill Data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    Title (English)
                                    <input type="text" class="form-control" id="dl-category-title" required>
                                </label>
                                <label class="controls">
                                    Title (arabic)
                                    <input type="text" class="form-control" id="dl-category-titlear" required>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Fill Data
                                <small>Please enter all data!</small>
                            </h2>
                        </div>
                        <div class="body">
                            <div class="form-group">
                                <label class="controls">
                                    Image
                                    <input type="file" class="form-control" id="dl-category-image" required
                                           accept="image/png, image/jpeg, image/jpg">
                                </label>
                                <label class="controls">
                                    Type
                                    <select id="dl-service-type" class="form-control" required>
                                        <option value="">-- Please select --</option>
                                        <option value="postaji">Postaji</option>
                                        <option value="trip">trip</option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-success">Save</button>

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

