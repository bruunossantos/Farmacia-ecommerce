<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category')->paginate(8);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Product $product)
    {
        return $product->load('category');
    }

    public function update(Request $request, string $id)
    {

    }

    public function destroy(string $id)
    {
        //
    }
}
