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
            <h2>CREATE A HOMEPAGE CARD</h2>
        </div>

        <div class="row clearfix">
            <form id="dl-save-card">
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
                                    <input type="text" class="form-control" id="dl-card-title" required>
                                </label>
                                <label class="controls">
                                    Title (arabic)
                                    <input type="text" class="form-control" id="dl-card-titlear" required>
                                </label>
                                <label class="controls">
                                    Header (English)
                                    <input type="text" class="form-control" id="dl-card-header" required>
                                </label>
                                <label class="controls">
                                    Header (arabic)
                                    <input type="text" class="form-control" id="dl-card-headerar" required>
                                </label>
                                <label class="controls">
                                    Description (English)
                                    <input type="text" class="form-control" id="dl-card-description" required>
                                </label>
                                <label class="controls">
                                    Description (arabic)
                                    <input type="text" class="form-control" id="dl-card-descriptionar" required>
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
                                    Expires at
                                    <input type="datetime-local" class="form-control" id="dl-card-expires" required>
                                </label>
                                <label class="controls">
                                    Image
                                    <input type="file" class="form-control" id="dl-card-image" required
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
                                <label class="controls">
                                    Attached to service
                                    <select id="dl-service" class="form-control" required>
                                        <option value="">-- Please select --</option>
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

