<!DOCTYPE html>
<html lang="en">

<?php include('parts/header.php'); ?>

<body class="login-page">

<?php include('parts/loaders.php');?>

<div class="login-box">
    <div class="logo">
        <h3 class="text-center">Welcome Back!</h3>
    </div>
    <div class="card">
        <div class="body">
            <form id="sign_in">
                <div class="msg">Please sign in to continue</div>
                <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                    <div class="controls">
                        <input type="email" id="dl-email" class="form-control" name="email" placeholder="Email" required
                               autofocus>
                    </div>
                </div>
                <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                    <div class="controls">
                        <input type="password" id="dl-password" class="form-control" name="password" placeholder="Password" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <button class="btn btn-block bg-pink waves-effect" type="submit">SIGN IN</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

<?php include('parts/footer.php'); ?>
</body>

</html>
