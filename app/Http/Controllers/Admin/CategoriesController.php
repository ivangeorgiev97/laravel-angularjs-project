<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;

// use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller {

    private $categoryService;

    public function __construct(CategoryService $categoryService) {
        $this->categoryService = $categoryService;
    }

    public function index() {
        $categories = $this->categoryService->getAll();

        return response()->json(array(
                    'categories' => $categories)
        );
    }

    public function store(StoreCategoryRequest $request) {
        $validated = $request->validated();

        return response()->json($this->categoryService->add($validated));
    }

    public function update(StoreCategoryRequest $request) {
        $validated = $request->validated();

        $id = $request->id;

        return response()->json($this->categoryService->update($validated, $id));
    }

    public function delete($id) {
        return response()->json($this->categoryService->delete($id));
    }

}
