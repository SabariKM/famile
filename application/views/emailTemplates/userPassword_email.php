<html>

<head>
  <title>Famile</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>
  <div style="overflow-x: hidden;
              max-width:600px;
                position: relative;">
    <img src="<?php echo base_url('assets/img/EmailHeader.png') ?>" style="width:100%" />
    <div>
      <div style="margin-top: 100px;
                padding-left:10px;
                display: flex;
                justify-content: center;">
        <div>
          <div style="text-align: center;font-size: 24px;">
            <p>Welcome to Famile</p>
            <p>
              Password!
            </p>
            <p style="font-size: 12px;"> Below is your Login Password for Famile.org</p>
            <div style="padding: 5px; margin: 35px; border:1px solid #141414;">
              <p style="
font-size: 18px;"><?php echo $password ?></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="<?php echo base_url('assets/img/EmailFooter.png') ?>" style="width:100%" />
      </div>
    </div>
    <div>
</body>

</html>