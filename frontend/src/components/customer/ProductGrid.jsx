//Muestra una cuadrícula de productos usando varios ProductCard:
// src/components/customer/ProductGrid.jsx
/*import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}*/
// src/components/customer/ProductGrid.jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  // Validar que haya productos
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => {
        // Seleccionamos la imagen principal de la primera variante (si existe)
        const mainImage =
          product.variants?.[0]?.image ||
          "/src/assets/images/default-product.jpg"; // Imagen por defecto

        // Creamos un objeto "producto" para pasar al ProductCard
        const productData = {
          id: product.id,
          name: product.name,
          category: product.category?.name || "Sin categoría",
          price: product.base_price,
          image: mainImage,
        };

        return <ProductCard key={product.id} product={productData} />;
      })}
    </div>
  );
}
