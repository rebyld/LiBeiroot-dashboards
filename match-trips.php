<!DOCTYPE html>
<html lang="en">

<?php include('parts/header.php'); ?>

<body class="theme-teal orders-page" data-type="postaji">

<?php include('parts/loaders.php'); ?>
<?php include('parts/navbar.php'); ?>
<?php include('parts/sidebar.php'); ?>

<!-- Content -->
<section class="content">
    <div class="container-fluid">
        <div class="block-header">
            <h2>MATCHING TRIPS</h2>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div style="height: 300px; background-color: #888; width: 100%; margin-bottom: 40px">
                    <h4 style="padding: 20px;color: whitesmoke;font-weight: 300">add drivers and their filters here ... </h4>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label class="controls">
                        Category
                        <select id="dl-filter-category" class="form-control filter-dropdown m-t-10" data-key="category"
                                required>
                            <option value="">-- All Category --</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="col-md-3">
                <div class="form-group">
                    <label class="controls">
                        Services
                        <select id="dl-filter-service" class="form-control filter-dropdown m-t-10" data-key="service" required>
                            <option value="">-- All Services --</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="col-md-3">
                <div class="form-group">
                    <label class="controls">
                        Status
                        <select  class="form-control filter-dropdown m-t-10" data-key="status" required>
                            <option value="">-- All Cases --</option>
                            <option value="initiated">Initiated</option>
                            <option value="edited">Edited</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="matching">Matching</option>
                            <option value="matched">Matched</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="completedAndReviewed">Completed and Reviewed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="block-header">
                    <h2>Trips</h2>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            <!-- Task Info -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="card">
                    <div class="header">
                        <h2 id="dl-orders-number"></h2>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-hover dashboard-task-infos dl-orders-table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                    <th>item True Cost</th>
                                    <th>Payment Status</th>
                                    <th>Item Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<div class="modal fade" id="showOrderDetails" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                            class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Order Details</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="dl-show-single-order-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('parts/footer.php'); ?>
</body>

</html>
