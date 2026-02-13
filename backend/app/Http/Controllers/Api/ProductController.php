<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return Product::orderBy('created_at', 'desc')->paginate(8);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'description'    => 'required|string',
            'price'          => 'required|numeric|min:0',
            'promotional_price'    => 'nullable|numeric|min:0', 
            'category_id'    => 'required|exists:categories,id', 
            'stock' => 'nullable|integer|min:0', 
            'main_photo'     => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('main_photo')) {
            // Salva a imagem e pega o caminho
            $path = $request->file('main_photo')->store('products', 'public');
            
            // Cria o produto no banco com o nome do arquivo gerado
            $product = Product::create([
                'name'=> $request->name,
                'slug'=> Str::slug($request->name), 
                'description'=> $request->description,
                'price'=> $request->price,
                'promotional_price'=> $request->promotional_price,
                'stock'=> $request->stock,
                'category_id'=> $request->category_id,
                'main_photo'=> $path,
            ]);

            return response()->json($product, 201);
        }
        return response()->json(['message' => 'Erro ao processar imagem'], 400);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        // Atualiza os campos
        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->description = $request->description; 
        $product->price = $request->price;
        $product->promotional_price = $request->promotional_price;
        $product->stock = $request->stock;
        $product->category_id = $request->category_id;

        if ($request->hasFile('main_photo')) {
            $path = $request->file('main_photo')->store('products', 'public');
            $product->main_photo = $path;
        }

        $product->save();
        return response()->json($product);
    }

    public function destroy($id) {
        try {
            $product = Product::findOrFail($id); 
            $product->delete(); 

            return response()->json(['message' => 'Produto excluído com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir'], 500);
        }   
    }

    public function showBySlug($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        
        return response()->json($product);
    }

    public function search($query)
    {
        $terms = explode(' ', $query);

        $products = Product::query();

        foreach ($terms as $term) {
            $products->where(function ($query) use ($term) {
                $query->where('name', 'LIKE', '%' . $term . '%')
                    ->orWhere('description', 'LIKE', '%' . $term . '%');
            });
        }

        return response()->json($products->get());
    }
}
