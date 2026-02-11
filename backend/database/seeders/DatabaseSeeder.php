<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = [
            'Ofertas', 
            'Emagrecimento', 
            'Beleza', 
            'Seu treino', 
            'Saúde', 
            'Mais vendidos'
        ];

        $categoryIds = [];

        foreach ($categories as $catName) {
            $category = Category::create([
                'name' => $catName,
                'slug' => Str::slug($catName)
            ]);
            $categoryIds[strtolower($catName)] = $category->id;
        }

        Product::create([
            'category_id' => $categoryIds['saúde'], 
            'name' => 'Tylenol Paracetamol 750mg Múltiplas Dores',
            'slug' => Str::slug('Tylenol Paracetamol 750mg Múltiplas Dores'),
            'description' => "Para que serve o Tylenol Múltiplas Dores?\nEste medicamento é indicado em adultos para a redução da febre...",
            'main_photo' => 'products/tylenol.jpg', 
            'price' => 22.89,
            'stock' => 50,
        ]);
    }
}
