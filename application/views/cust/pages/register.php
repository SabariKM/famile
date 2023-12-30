<?php $data = $this->db->get_where('profile',array('email' => $email ))->row(); 

?>
<section class="wow fadeInUp">
    <div class="col d-flex justify-content-center">
        <div class="col-6 col-sm-12 col-md-8 bg-sec2" >
            <div style="padding-left:8rem; padding-right:8rem;padding-top:5rem; ">
                <h1 class="text-center color-sec" style="margin-bottom:3rem;">Personal Information</h1>
                <?php echo form_open('cust/register') ?>  
                <div class="col d-flex justify-content-center">
                    <div class="col-6">
                        <div class="form-group mt-2">
                            <label >Seeking Allaince for</label>
                            <select class="form-control" name="seeking_alliance_for">
                                <option <?php echo ($data->seeking_alliance_for == 'Self')? 'selected':'' ?> >Self</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Son')? 'selected':'' ?> >Son</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Daughter')? 'selected':'' ?> >Daughter</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Brother')? 'selected':'' ?> >Brother</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Sister')? 'selected':'' ?> >Sister</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Relative/Friend')? 'selected':'' ?> >Relative/Friend</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <label >Gender</label>
                            <select class="form-control" name="gender" >
                                <option <?php echo ($data->seeking_alliance_for == 'Men')? 'selected':'' ?>>Men</option>
                                <option <?php echo ($data->seeking_alliance_for == 'Women')? 'selected':'' ?>>Women</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <label >I am</label>
                            <select class="form-control" name="iam">
                                <option <?php echo ($data->iam == 'Unamarried')? 'selected':'' ?>>Unamarried</option>
                                <option <?php echo ($data->iam == '1st Marriage')? 'selected':'' ?>>1st Marriage</option>
                                <option <?php echo ($data->iam == '2nd Marriage')? 'selected':'' ?>>2nd Marriage</option>
                                <option <?php echo ($data->iam == '3rd Marriage')? 'selected':'' ?>>3rd Marriage</option>
                                <option <?php echo ($data->iam == 'Something is Mentally wrong with me')? 'selected':'' ?>>Something is Mentally wrong with me</option>
                            </select>
                        </div>
                        <div class="form-group mt-2" >
                            <label >Date of Birth</label>
                            <input type="date" class="form-control mt-3" name="dob" value="<?php echo $data->dob ?>"/>
                        </div>
                        
                        <div class="row mt-2">
                            <div class="col">
                                <div class="form-group">
                                    <label >Age</label>
                                    <input type="number" class="form-control"  name="age" value="<?php echo $data->age ?>"/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label >Height</label>
                                    <select class="form-control" name="height">
                                        <option <?php echo ($data->height == '4’5-5’0')? 'selected':'' ?>>4’5-5’0</option>
                                        <option <?php echo ($data->height == '5’0-5’5')? 'selected':'' ?>>5’0-5’5</option>
                                        <option <?php echo ($data->height == '5’5-6’0')? 'selected':'' ?>>5’5-6’0</option>
                                        <option <?php echo ($data->height == '6’0-6’5')? 'selected':'' ?>>6’0-6’5</option>
                                        <option <?php echo ($data->height == '6’5-7’0')? 'selected':'' ?>>6’5-7’0</option>
                                        <option <?php echo ($data->height == 'Others')? 'selected':'' ?>>Others</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label >Weight</label>
                                    <select class="form-control" name="weight">
                                        <option <?php echo ($data->weight == '30-35 kg')? 'selected':'' ?>>30-35 kg</option>
                                        <option <?php echo ($data->weight == '35-40 kg')? 'selected':'' ?>>35-40 kg</option>
                                        <option <?php echo ($data->weight == '40-50 kg')? 'selected':'' ?>>40-50 kg</option>
                                        <option <?php echo ($data->weight == '50-55 kg')? 'selected':'' ?>>50-55 kg</option>
                                        <option <?php echo ($data->weight == '55-60 kg')? 'selected':'' ?>>55-60 kg</option>
                                        <option <?php echo ($data->weight == '60-65 kg')? 'selected':'' ?>>60-65 kg</option>
                                        <option <?php echo ($data->weight == '70-75 kg')? 'selected':'' ?>>70-75 kg</option>
                                        <option <?php echo ($data->weight == '80-85 kg')? 'selected':'' ?>>80-85 kg</option>
                                        <option <?php echo ($data->weight == '90-95 kg')? 'selected':'' ?>>90-95 kg</option>
                                        <option <?php echo ($data->weight == '95-100 kg')? 'selected':'' ?>>95-100 kg</option>
                                        <option <?php echo ($data->weight == 'Others')? 'selected':'' ?>>Others</option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <div class="form-group mt-2">
                            <label >Food Lifestyle</label>
                            <input class="form-control" name="food_lifestyle" value="<?php echo $data->food_lifestyle ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >Education Qualification</label>
                            <input class="form-control" name="ed_qualification" value="<?php echo $data->ed_qualification ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >Occupation</label>
                            <input class="form-control" name="occupation" value="<?php echo $data->occupation ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >Annual Income</label>
                            <input class="form-control" name="annual_income" value="<?php echo $data->annual_income ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >Mother Tongue</label>
                            <select class="form-control" name="mother_tongue">
                                 <option <?php echo ($data->mother_tongue == 'Tamil')? 'selected':'' ?>>Tamil</option>
                                 <option <?php echo ($data->mother_tongue == 'English ')? 'selected':'' ?>>English </option>
                                 <option <?php echo ($data->mother_tongue == 'Telugu')? 'selected':'' ?>>Telugu</option>
                                 <option <?php echo ($data->mother_tongue == 'Sindhi')? 'selected':'' ?>>Sindhi</option>
                                 <option <?php echo ($data->mother_tongue == 'Rajasthani')? 'selected':'' ?>>Rajasthani</option>
                                 <option <?php echo ($data->mother_tongue == 'Marathi')? 'selected':'' ?>>Marathi</option>
                                 <option <?php echo ($data->mother_tongue == 'Malayalam')? 'selected':'' ?>>Malayalam</option>
                                 <option <?php echo ($data->mother_tongue == 'Kannada')? 'selected':'' ?>>Kannada</option>
                                 <option <?php echo ($data->mother_tongue == 'Hindu ')? 'selected':'' ?>>Hindu </option>
                                 <option <?php echo ($data->mother_tongue == 'Kashmiri')? 'selected':'' ?>>Kashmiri</option>
                                 <option <?php echo ($data->mother_tongue == 'Sikkim')? 'selected':'' ?>>Sikkim</option>
                                 <option <?php echo ($data->mother_tongue == 'Bihari')? 'selected':'' ?>>Bihari</option>
                                 <option <?php echo ($data->mother_tongue == 'Bengali')? 'selected':'' ?>>Bengali</option>
                                 <option <?php echo ($data->mother_tongue == 'Gujarati')? 'selected':'' ?>>Gujarati</option>
                                 <option <?php echo ($data->mother_tongue == 'Haryanvi')? 'selected':'' ?>>Haryanvi</option>
                                 <option <?php echo ($data->mother_tongue == 'Marwari')? 'selected':'' ?>>Marwari</option>
                                 <option <?php echo ($data->mother_tongue == 'Punjabi')? 'selected':'' ?>>Punjabi</option>
                                 <option <?php echo ($data->mother_tongue == 'Others')? 'selected':'' ?>>Others</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <label >Religion</label>
                            <select class="form-control" name="religion">
                                 <option <?php echo ($data->religion == 'Hindu')? 'selected':'' ?>>Hindu</option>
                                 <option <?php echo ($data->religion == 'Christian')? 'selected':'' ?>>Christian </option>
                                 <option <?php echo ($data->religion == 'Muslim')? 'selected':'' ?>>Muslim</option>
                                 <option <?php echo ($data->religion == 'Sikh')? 'selected':'' ?>>Sikh</option>
                                 <option <?php echo ($data->religion == 'Buddhist')? 'selected':'' ?>>Buddhist</option>
                                 <option <?php echo ($data->religion == 'Buddhist')? 'selected':'' ?>>Buddhist</option>
                                 <option <?php echo ($data->religion == 'Jain')? 'selected':'' ?>>Jain</option>
                                 <option <?php echo ($data->religion == 'Bahai')? 'selected':'' ?>>Bahai</option>
                                 <option <?php echo ($data->religion == 'No Religion')? 'selected':'' ?>>No Religion</option>
                                 <option <?php echo ($data->religion == 'Spirutual')? 'selected':'' ?>>Spirutual</option>
                                 <option <?php echo ($data->religion == 'Others')? 'selected':'' ?>>Others</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <label >City</label>
                            <input type="text " class="form-control " name="city" value="<?php echo $data->city ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >State</label>
                            <input type="text " class="form-control" name="state" value="<?php echo $data->state ?>"/>
                        </div>
                        <div class="form-group mt-2">
                            <label >Country</label>
                            <input type="text " class="form-control " name="country" value="<?php echo $data->country ?>"/>
                        </div>
                        <input type="submit" class="btn mt-5 pl-5 pr-5" value="Save Profile" />
                    </div>
                </div>
                </form>
            </div>
            
            <div class="row d-flex justify-content-between">
                <div class="col-4">
                    <img src="<?php echo  base_url('assets/img/theme/gold_flower.png')?>" class="img-etos-flower" style="transform: rotate(45deg);"/>
                </div>
                <div class="col-4">
                    <img src="<?php echo  base_url('assets/img/theme/gold_flower.png')?>" class="img-etos-flower ml-auto p-2" style="transform: rotate(-45deg);"/>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="mt-5">
    <div class="col">
        <p class="color-sec text-center">“Husband and wife relationships are like the relationship of Tom and Jerry. Though they are
        teasing and fighting, but can’t live without each other.”</p>
    </div>
</section>