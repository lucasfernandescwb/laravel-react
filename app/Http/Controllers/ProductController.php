<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::latest()->get();

        return Inertia::render('products/index', compact('products'));
    }

    public function create()
    {
        return Inertia::render('products/create', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string'
        ]);

        Product::create($request->all());

        return redirect()->route('products.index')->with('message', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string'
        ]);

        $product->update($request->all());

        return redirect()->route('products.index')->with('message', 'Product updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted successfully!');
    }
}
