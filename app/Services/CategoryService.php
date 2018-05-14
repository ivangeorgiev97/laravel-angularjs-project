<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;

class CategoryService implements IService {

    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAll() {
        return $this->categoryRepository->getAll();
    }

    public function getById($id) {
        
    }

    public function add($request) {
        $category_name = $request['category_name'];

        $category = ['category_name' => $category_name];

        return response()->json($this->categoryRepository->add($category));
    }

    public function update($request, $id) {
        if (empty($id)) {
            $errorDescription = "Empty";

            return response()->json(array('errorDescription' => $errorDescription));
        }

        $category = $this->categoryRepository->getById($id);
        $category->category_name = $request['category_name'];

        return response()->json($this->categoryRepository->update($category));
    }

    public function delete($id) {
        if (empty($id)) {
            $errorDescription = "Empty";

            return response()->json(array('errorDescription' => $errorDescription));
        }

        $category = $this->categoryRepository->getById($id);

        return response()->json($this->categoryRepository->delete($category));
    }

}
