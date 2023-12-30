<div>
     <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personal Preferance</h1>
        </div>
        <div class="card">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">List of all the Users Preferance</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Gender</th>
                                <th>From Age</th>
                                <th>To Age</th>
                                <th>Food</th>
                                <th>Language</th>
                                <th>Religion</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach( $this->mm->getPersonalPreferance()  as $row): ?>
                            <tr>
                                <td><?php echo $row['user_id']?></td>
                                <td><?php echo $row['gender']?></td>
                                <td><?php echo $row['fromAge']?></td>
                                <td><?php echo $row['toAge']?></td>
                                <td><?php echo $row['food']?></td>
                                <td><?php echo $row['language']?></td>
                                <td><?php echo $row['religion']?></td>
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