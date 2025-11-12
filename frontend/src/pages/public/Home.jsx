
// src/pages/public/Home.jsx
import CustomerLayout from "../../components/layout/CustomerLayout";
import ProductGrid from "../../components/customer/ProductGrid";
import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
//import GeminiAdvisor from "../../components/ia/GeminiAdvisor";// Importa el componente GeminiAdvisor
import axios from "axios";







/*
// Simulamos productos (luego puedes traerlos desde una API o base de datos)
const products = [
  { id: 1, name: "Vestido Floral", category: "Damas", price: 120, image: "/src/assets/images/vestido1.jpg" },
  { id: 2, name: "Camisa Casual", category: "Caballeros", price: 90, image: "/src/assets/images/camisa1.jpg" },
  { id: 3, name: "Pantalón Jeans", category: "Damas", price: 110, image: "/src/assets/images/jeans1.jpg" },
  { id: 4, name: "Zapatillas Urbanas", category: "Calzado", price: 150, image: "/src/assets/images/zapatillas1.jpg" },
  { id: 5, name: "Bolso de Cuero", category: "Accesorios", price: 200, image: "/src/assets/images/bolso1.jpg" },
];*/


export default function Home() {

  const [products, setProducts] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
  axios.get("http://localhost:8000/api/products/products/")
    .then((response) => {
      console.log("Productos:", response.data);
      setProducts(response.data); // Aquí sí es un array
    })
    .catch((error) => console.error(error));
  }, []);

  // Traer categorías
  useEffect(() => {
    axios.get("http://localhost:8000/api/products/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filtrar productos según categoría seleccionada
  const filteredProducts = selectedCategory === "Todas"
    ? products
    : products.filter(product => product.category.name === selectedCategory);




  const handleVoiceClick = () => {
    alert("Aquí irá la funcionalidad de búsqueda por voz.");
  };

  return (
    <CustomerLayout>
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-blue-600">
          Bienvenido a Smart Boutique 👗
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Descubre las últimas tendencias en moda
        </p>
      </div>

      {/* Selector de categorías */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={() => setSelectedCategory("Todas")}
          className={`px-4 py-2 rounded ${selectedCategory === "Todas" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Todas
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded ${selectedCategory === cat.name ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>


      {/* Catálogo de productos */}
      <div className="mt-8">
        
        <ProductGrid products={filteredProducts} />


       
      </div>

      {/* Botón flotante de búsqueda por voz */}
      <button
        onClick={handleVoiceClick}
        className="fixed bottom-6 left-6 p-4 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition"
        title="Buscar productos por voz"
      >
        <Mic className="w-6 h-6 text-white" />
      </button>

      
    </CustomerLayout>
  );
}
