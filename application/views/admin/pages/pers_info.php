<div>
     <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personal Information</h1>
        </div>
        <div class="card">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">List of all Personal Informations of the Registered Users </h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Photo</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Date Of Birth</th>
                                <th>Language</th>
                                <th>Religion</th>
                                <th>Qualification</th>
                                <th>Profession</th>
                                <th>Income</th>
                                <th>Food</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach( $this->mm->getPersonalInformations()  as $row): ?>
                            <tr>
                                <td><?php echo $row['user_id']?></td>
                                <td><img src="<?php echo $row['photo'] ?>" height="50px" width="50px"/></td>
                                <td><?php echo $row['fname']?></td>
                                <td><?php echo $row['email']?></td>
                                <td><?php echo $row['gender']?></td>
                                <td><?php echo $row['dob']?></td>
                                <td><?php echo $row['language']?></td>
                                <td><?php echo $row['religion']?></td>
                                <td><?php echo $row['edu_qual']?></td>
                                <td><?php echo $row['profession']?></td>
                                <td><?php echo $row['annual_income']?></td>
                                <td><?php echo $row['food']?></td>
                                <td><?php echo $row['height']?></td>
                                <td><?php echo $row['weight']?></td>
                                <td><?php echo $row['city']?></td>
                                <td><?php echo $row['state']?></td>
                                <td><?php echo $row['country']?></td>
                                <td><?php echo $row['create_dt']?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</div>