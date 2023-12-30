<html>
    <head>
        <title>Famile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body>
        
        <div style="overflow-x: hidden;
                max-width: 600px;
                display: flex;
                justify-content: center;
                position: relative;">
            <div>
                <div  style="position: absolute;
                z-index: 1;
                left: 60%;">
                    <h1 style="color: #FAFAFA;
                font-family: AvertaStd-Regular;
                font-size: 64px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin: 15px 0px;">Famile</h1>
                    <img src="<?php echo  base_url("/assets/img/heartheader.png")?>" style="border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; "/>
                </div>
                <div style="position: absolute; 
                top:0px;
                z-index: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="581" height="169" viewBox="0 0 581 169" fill="none">
                        <path d="M581 -100H-19V30V168.5L581 -22V-100Z" fill="#141414"/>
                    </svg>
                    <img src="<?php echo base_url("assets/img/heartheader.png") ?>" style="border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; "/>
                </div>
                <div  style="position: absolute; 
                top:0px;
                z-index: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="599" height="248" viewBox="0 0 599 248" fill="none">
                        <path d="M0 -21H600V109V247.5L0 57V-21Z" fill="#141414"/>
                    </svg>
                </div>
                <div style="margin-top: 250px;
                padding-left:10px;
                display: flex;
                justify-content: center;">
                    <div>
                        <p style="color: #000;    
                text-align: center;
                font-family: AvertaStd-Semibold;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 0.56px;">Matching Profiles For You</p>
                        <?php foreach($profile_data as $row):?>
                        <div>
                            <div style="width: 482px;
                height: 156px;
                flex-shrink: 0;
                border: 0.5px solid #F7F7F7;
                background: #FFF;
                box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.05);
                position: relative;
                margin-top: 10px;">
                                <div style=" display: flex;
                flex-wrap: wrap;
                margin-right: -0.75rem;
                margin-left: -0.75rem;">
                                    <div style="margin-left: 25px;
                margin-top: 10px;">
                                        <img src="<?php echo $row['photo'] ?>" style="width: 146px;
                height: 137px;
                flex-shrink: 0;
                border-radius: 12px;
                background: url(<path-to-image>), lightgray 50% / cover no-repeat, #D9D9D9;
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; "/>
                                    </div>
                                    <div style="margin-left: 25px;
                margin-top: 10px;">
                                        <p style=" margin-top: 5px;
                line-height: 1px;"><?php echo $row['fname']; ?></p>
                                        <p style=" margin-top: 5px;
                line-height: 1px;"><?php echo $row['age'].' ('.$row['dob'].')'; ?></p>
                                        <p Style=" margin-top: 5px;
                line-height: 1px;"><?php echo $row['profession']; ?></p>
                                        <p Style=" margin-top: 5px;
                line-height: 1px;"><?php echo $row['food']; ?></p>
                                        <p Style=" margin-top: 5px;
                line-height: 1px;"><?php echo $row['state'].' '.$row['country']; ?></p>
                                    </div>
                                </div>
                                <div  style="position: absolute;
                left:75%;
                top:0;">
                                    <h2 style="margin-bottom: 1px;">Famile</h2>
                                    <img src="<?php echo  base_url("/assets/img/heartheader.png")?>"  style="width: 55px;
                height: 25px;
                flex-shrink: 0;
                filter: invert(100%);
                margin-left: 30px;
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; "/>
                                </div>
                            </div>
                            <a style="    display: block; width: 482px;
                height: 38px;
                flex-shrink: 0;
                border-radius: 0px 0px 24px 24px;
                background: #141414;
                box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.10);
                color: #FFF;
                font-family: AvertaStd-Semibold;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px; /* 142.857% */
                letter-spacing: 0.56px;
                text-align: center;
                text-decoration: none;" target="_blank" href='<?php echo  base_url('index.php/cust/ematchingprofile_url/'.$row['url']) ?>'
                            >INTERESTED</a>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div style="padding-top: 50px;
                width: 600px;
                height: 175px;
                flex-shrink: 0;
                background: #D9D9D9;
                margin-top: 20px;">
                    <div  style=" display: flex;
                flex-wrap: wrap;
                margin-right: -0.75rem;
                margin-left: -0.75rem;
                display: flex;
                justify-content: center;">
                        <div style="flex-basis: 0;
                flex-grow: 1;
                max-width: 10%;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M5.66064 16.3134C12.4531 16.3134 16.1683 10.6859 16.1683 5.80576C16.1683 5.64592 16.1683 5.4868 16.1575 5.3284C16.8803 4.80561 17.5042 4.15831 18 3.4168C17.326 3.71545 16.611 3.91131 15.8789 3.99784C16.6498 3.5363 17.2268 2.81039 17.5025 1.9552C16.7776 2.38536 15.9845 2.68852 15.1574 2.8516C14.6006 2.25953 13.8642 1.86748 13.0621 1.73611C12.2601 1.60474 11.4371 1.74138 10.7205 2.12489C10.0039 2.50839 9.43367 3.11738 9.09806 3.85761C8.76245 4.59784 8.68016 5.42804 8.86392 6.21976C7.39566 6.14615 5.95929 5.76459 4.64806 5.09986C3.33683 4.43513 2.18004 3.50208 1.2528 2.36128C0.780546 3.17427 0.635904 4.1367 0.848325 5.05259C1.06075 5.96849 1.61426 6.76899 2.39616 7.29112C1.80845 7.2737 1.23356 7.11516 0.72 6.82888C0.72 6.844 0.72 6.85984 0.72 6.87568C0.720233 7.72831 1.01539 8.55462 1.5554 9.21445C2.09542 9.87428 2.84705 10.327 3.6828 10.4958C3.13911 10.6441 2.56866 10.6658 2.01528 10.5592C2.25127 11.293 2.7107 11.9347 3.32933 12.3945C3.94796 12.8544 4.69484 13.1094 5.46552 13.1238C4.15781 14.1516 2.54236 14.7095 0.87912 14.7078C0.58529 14.7073 0.291747 14.6895 0 14.6546C1.68886 15.7384 3.65394 16.3132 5.66064 16.3106" fill="#262626"/>
                            </svg>
                        </div>
                        <div  style="flex-basis: 0;
                flex-grow: 1;
                max-width: 10%;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clip-path="url(#clip0_455_243)">
                                <path d="M17.0053 0H0.994737C0.445263 0 0 0.445263 0 0.994737V17.0053C0 17.5547 0.445263 18 0.994737 18H9.61579V11.0526H7.26316V8.31474H9.60316V6.31579C9.60316 3.98842 11.0211 2.72211 13.0958 2.72211C13.8 2.72526 14.5042 2.76316 15.2053 2.84211V5.27053H13.7716C12.6442 5.27053 12.4263 5.80421 12.4263 6.59053V8.32737H15.1263L14.7758 11.0526H12.4263V18H17.0053C17.5547 18 18 17.5547 18 17.0053V0.994737C18 0.445263 17.5547 0 17.0053 0Z" fill="#262626"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_455_243">
                                    <rect width="18" height="18" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div style="flex-basis: 0;
                flex-grow: 1;
                max-width: 10%;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clip-path="url(#clip0_455_244)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.62159C11.4033 1.62159 11.6876 1.63088 12.6369 1.6741C13.5143 1.71412 13.9909 1.86059 14.3081 1.98385C14.7282 2.14711 15.028 2.34217 15.3431 2.65692C15.6582 2.97202 15.8532 3.27176 16.0162 3.69189C16.1394 4.00913 16.2859 4.48571 16.3259 5.36314C16.3691 6.31201 16.3784 6.59674 16.3784 9.00001C16.3784 11.4033 16.3691 11.6876 16.3259 12.6369C16.2859 13.5143 16.1394 13.9909 16.0162 14.3081C15.8529 14.7283 15.6578 15.028 15.3431 15.3431C15.028 15.6582 14.7282 15.8533 14.3081 16.0162C13.9909 16.1394 13.5143 16.2859 12.6369 16.3259C11.688 16.3691 11.4033 16.3784 9 16.3784C6.59674 16.3784 6.312 16.3691 5.36313 16.3259C4.48571 16.2859 4.00913 16.1394 3.69189 16.0162C3.27175 15.8529 2.97202 15.6578 2.65692 15.3431C2.34182 15.028 2.14675 14.7283 1.98384 14.3081C1.86059 13.9909 1.71412 13.5143 1.6741 12.6369C1.63088 11.688 1.62159 11.4033 1.62159 9.00001C1.62159 6.59674 1.63088 6.31237 1.6741 5.36314C1.71412 4.48571 1.86059 4.00913 1.98384 3.69189C2.14711 3.27176 2.34217 2.97202 2.65692 2.65692C2.97202 2.34182 3.27175 2.14675 3.69189 1.98385C4.00913 1.86059 4.48571 1.71412 5.36313 1.6741C6.31236 1.63088 6.59674 1.62159 9 1.62159ZM9 0C6.55565 0 6.24913 0.0103604 5.28918 0.054303C4.33138 0.0978883 3.67724 0.25008 3.10456 0.47265C2.51258 0.702724 2.01064 1.01032 1.51048 1.51084C1.01032 2.011 0.702366 2.51294 0.47265 3.10456C0.250079 3.67724 0.0978882 4.33138 0.054303 5.28918C0.0103604 6.24913 0 6.55566 0 9.00001C0 11.4444 0.0103604 11.7509 0.054303 12.7108C0.0978882 13.6686 0.250079 14.3228 0.47265 14.8955C0.702723 15.4874 1.01032 15.9894 1.51084 16.4895C2.01135 16.9901 2.51294 17.2976 3.10491 17.5277C3.67724 17.7503 4.33173 17.9025 5.28954 17.9461C6.24948 17.99 6.55601 18.0004 9.00036 18.0004C11.4447 18.0004 11.7512 17.99 12.7112 17.9461C13.669 17.9025 14.3235 17.7503 14.8958 17.5277C15.4878 17.2976 15.9897 16.9901 16.4899 16.4895C16.9904 15.989 17.298 15.4874 17.5281 14.8955C17.7506 14.3231 17.9028 13.6686 17.9464 12.7108C17.9904 11.7509 18.0007 11.4444 18.0007 9.00001C18.0007 6.55566 17.9904 6.24913 17.9464 5.28918C17.9028 4.33138 17.7506 3.67689 17.5281 3.10456C17.298 2.51259 16.9904 2.01064 16.4899 1.51048C15.9894 1.00996 15.4878 0.702366 14.8958 0.472293C14.3228 0.25008 13.6686 0.0978883 12.7108 0.054303C11.7509 0.0103604 11.4443 0 9 0ZM9.0003 4.37849C6.4477 4.37849 4.37883 6.44772 4.37883 8.99996C4.37883 11.5522 6.44806 13.6214 9.0003 13.6214C11.5525 13.6214 13.6218 11.5522 13.6218 8.99996C13.6218 6.44772 11.5529 4.37849 9.0003 4.37849ZM9.0003 11.9998C7.34335 11.9998 6.00042 10.6566 6.00042 8.99996C6.00042 7.343 7.3437 6.00008 9.0003 6.00008C10.6569 6.00008 12.0002 7.34336 12.0002 8.99996C12.0002 10.6569 10.6573 11.9998 9.0003 11.9998ZM14.8844 4.19555C14.8844 4.792 14.4009 5.27553 13.8044 5.27553C13.208 5.27553 12.7245 4.792 12.7245 4.19555C12.7245 3.59909 13.208 3.11556 13.8044 3.11556C14.4009 3.11556 14.8844 3.59909 14.8844 4.19555Z" fill="#262626"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_455_244">
                                <rect width="18" height="18" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <p>You are receiving this email because you are a registered patron of our Match-Making ServiceIf you no longer wish to receive these emails, please login to your account and update your profile status.
Famile is a wholly owned subsidiary of 1D1S Entercon Pvt Ltd</p>
                    <h1 style="color: #141414; 
                font-family: AvertaStd-Regular;
                font-size: 24px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                text-align: center;
                opacity: 0.2;
                mix-blend-mode: luminosity;">Famile</h1>
                </div>
            </div>
        <div>
    </body>
</html>