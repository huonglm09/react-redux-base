<?php

# config/model.php
return [
    'role' => [
        'admin' => ['id' => 1, 'name' => 'admin', 'Description' => 'Administrator'],
        'customer' => ['id' => 2, 'name' => 'customer', 'Description' => 'Customer'],
        'shiper' => ['id' => 3, 'name' => 'shiper', 'Description' => 'Shiper'],
        'manager' => ['id' => 4, 'name' => 'manager', 'Description' => 'Manager']
    ],
    'status' => [
        'requested' => 'requested',
        'received' => 'received',
        'assigned' => 'assigned',
        'canceled' => 'canceled',
        'working' => 'working',
        'finished' => 'finished',
        'payment' => 'payment',
        'undefined' => 'undefined'
    ]
];
