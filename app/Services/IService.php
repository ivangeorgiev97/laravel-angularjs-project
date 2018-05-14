<?php

namespace App\Services;

interface IService {
    public function getAll();
    public function getById($id);
}
