<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

<!-- Sidebar - Brand -->
<a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div class="sidebar-brand-icon rotate-n-15">
        <img class="img-fluid" src="<?php echo base_url('assets/img/logo_light.png') ?>" />
    </div>
    <div class="sidebar-brand-text mx-3">Famile<sup>2</sup></div>
</a>

<!-- Divider -->
<hr class="sidebar-divider my-0">

<!-- Nav Item - Dashboard -->
<li class="nav-item active">
    <a class="nav-link" href="<?php echo base_url('index.php/admin/disp/dashboard')?>">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
</li>

<!-- Divider -->
<hr class="sidebar-divider">

<!-- Heading -->
<div class="sidebar-heading">
    Customer Information
</div>

<!-- Nav Item - Pages Collapse Menu -->
<!-- <li class="nav-item">
    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-fw fa-cog"></i>
        <span>Components</span>
    </a>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Custom Components:</h6>
            <a class="collapse-item" href="buttons.html">Buttons</a>
            <a class="collapse-item" href="cards.html">Cards</a>
        </div>
    </div>
</li> -->
<!-- Divider -->
<hr class="sidebar-divider">

<!-- Nav Item - Charts -->
<li class="nav-item">
    <a class="nav-link" href="<?php echo base_url('index.php/admin/disp/reg_users')?>">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Registeres Users</span></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="<?php echo base_url('index.php/admin/disp/user_subs')?>">
        <i class="fas fa-fw fa-table"></i>
        <span>Users Subscriptions</span></a>
</li>
<li class="nav-item">
<a class="nav-link" href="<?php echo base_url('index.php/admin/disp/pers_info')?>">
        <i class="fas fa-fw fa-table"></i>
        <span>Personal Information</span></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="<?php echo base_url('index.php/admin/disp/pers_preferance')?>">
        <i class="fas fa-fw fa-table"></i>
        <span>Personal Preferances</span></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="<?php echo base_url('index.php/admin/disp/pers_matches')?>">
        <i class="fas fa-fw fa-table"></i>
        <span>Personal Matches</span></a>
</li>
<!-- Divider -->
<hr class="sidebar-divider d-none d-md-block">

<!-- Sidebar Toggler (Sidebar) -->
<div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div>

</ul>
<!-- End of Sidebar -->