<?php $name = $this->session->userdata('name'); 
$email = $this->session->userdata('email'); 
?>
<nav class="navbar navbar-expand-lg navbar-light page-header">
  <a class="navbar-brand color-prim" href="<?php echo base_url('index.php/') ?>">Famile</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link color-prim" href="<?php echo base_url('index.php/') ?>">Home</a>
      </li>
      <?php if(isset($name)):?>
        <li class="nav-item">
            <a class="nav-link color-prim" href="<?php echo base_url('index.php/cust/disp/register') ?>">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link color-prim" href="<?php echo base_url('index.php/cust/disp/payment') ?>">Subscription</a>
        </li>
        <li class="nav-item">
            <a class="nav-link color-prim" href="<?php echo base_url('index.php/cust/signout') ?>">Logout</a>
        </li>
      <?php else:?>
        <li class="nav-item">
            <a class="nav-link color-prim" href="<?php echo base_url('index.php/cust/disp/login') ?>">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link color-prim" href="<?php echo base_url()?>#signup">Signup</a>
        </li>
      <?php endif;?>
      
    </ul>
    <span class="navbar-text color-prim " style="padding-left: 70rem;">
    <?php echo ($name)? 'Welcome '.$name : '' ; ?>
    </span>

  </div>
</nav>
<div>
    <img src="<?php echo base_url('assets/img/theme/FAMILE.png') ?>"  class="header-image"/>
    <h1 class="heater-title d-flex justify-content-center">FAMILE</h1>
</div>