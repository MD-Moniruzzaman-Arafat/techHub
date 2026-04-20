import './App.css';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Sidebar from './components/sidebar/Sidebar';
import useProducts from './hook/useProducts';

function App() {
  const { products } = useProducts();
  // console.log(products);
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Sidebar />
          <Products />
        </div>
      </main>
    </>
  );
}

export default App;
