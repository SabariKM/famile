
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Matrimony for your Family">
  <meta name="author" content="Famile">
  <title>Famile</title>
  <!-- Favicon -->
  <link rel="icon" href="<?php echo base_url('/assets/img/brand/favicon.png') ?>" type="image/png">
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa+Ink&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo base_url('/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') ?>" type="text/css">
  <!-- Page plugins -->
  <link rel="stylesheet" href="<?php echo base_url('/assets/vendor/select2/dist/css/select2.min.css') ?>" type="text/css">
<link rel="stylesheet" href="<?php echo base_url('/assets/css/bootstrap/bootstrap.min.css') ?>">
<link rel="stylesheet" href="<?php echo base_url('/assets/css/animate.css') ?>">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />  
<link rel="stylesheet" href="<?php echo base_url('/assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css') ?>" type="text/css">
<link rel="stylesheet" href="<?php echo base_url('/assets/css/app.css') ?>" type="text/css">
<script src="<?php echo base_url('/assets/vendor/jquery/dist/jquery.min.js') ?>"></script>
</head>
<style>
  .select2-selection--single {
    font-size: .875rem !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    display: block !important;
    width: 100% !important;
    height: calc(1.5em + 1.25rem + 2px) !important;
    padding: 0.625rem 0.75rem !important;
    transition: all .15s cubic-bezier(.68, -.55, .265, 1.55) !important;
    color: #8898aa !important;
    border: 1px solid #dee2e6 !important;
    border-radius: 0.25rem !important;
    background-color: #fff !important;
    background-clip: padding-box !important;
    box-shadow: 0 3px 2px rgb(233 236 239 / 5%) !important;
}
</style>
<body>
  <?php $this->session->has_userdata('username')?>
      <!-- Topnav -->
      <?php include ('cust/layout/header.php')?>
      <!-- Page content -->
      <div class="container-fluid mt--6 ">
        <?php include 'cust/pages/'.$page_name.'.php'; ?>
        <!-- Footer -->
        <?php include ('cust/layout/footer.php')?>
      </div>
  <!-- Argon Scripts -->
  <!-- Core -->
  
  <script src="<?php echo base_url('/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('/assets/js/wow.min.js') ?>"></script>
  <script src="<?php echo base_url('/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js') ?>"></script>
  <script src="<?php echo base_url('/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') ?>"></script>

  <script src="<?php echo base_url('/assets/vendor/select2/dist/js/select2.min.js') ?>"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <!-- datatable -->
  <script type="text/javascript" src="<?php echo base_url('/assets/vendor/datatables.net/js/jquery.dataTables.min.js') ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('/assets/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js') ?>"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/fixedheader/3.2.3/js/dataTables.fixedHeader.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
  <script type="text/javascript">
    <?php if($this->session->flashdata('success')){ ?>
        toastr.success("<?php echo $this->session->flashdata('success'); $this->session->unmark_flash('success')?>");

    <?php }else if($this->session->flashdata('error')){  ?>
        toastr.error("<?php echo $this->session->flashdata('error'); $this->session->unmark_flash('error') ?>");
    <?php }else if($this->session->flashdata('warning')){  ?>
        toastr.warning("<?php echo $this->session->flashdata('warning'); $this->session->unmark_flash('warning') ?>");
    <?php }else if($this->session->flashdata('info')){  ?>
        toastr.info("<?php echo $this->session->flashdata('info'); $this->session->unmark_flash('info') ?>");
    <?php } ?>
  </script>
  <script>
    new WOW().init();
  </script>
</body>
</html>