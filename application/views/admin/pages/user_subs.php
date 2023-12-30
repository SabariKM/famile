<div>
     <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Users Subscribtions</h1>
        </div>
        <div class="card">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">List of all the subscriptions</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Subscription Date</th>
                                <th>Valid till</th>
                                <th>Amount</th>
                                <th>Tranaction id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach( $this->mm->getUsersSubscriptions()  as $row): ?>
                            <tr>
                                <td><?php echo $row['user_id']?></td>
                                <td><?php echo $row['sub_date']?></td>
                                <td><?php echo $row['valid_till']?></td>
                                <td><?php echo $row['amount']?></td>
                                <td><?php echo $row['transaction_id']?></td>
                                <td><?php echo $row['status']?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</div>