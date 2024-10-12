import { useCartStore } from '../domain/services/cartStore';
import Link from 'next/link';
import Image from 'next/image'

const CartPage = () => {
  const { items } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + ( item.price ?? 0) * item.quantity, 0);
  const deliveryFee = 5.00;  // Valor fixo para entrega

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
        <Link href="/">
          <a className="text-blue-500 hover:underline">Voltar às compras</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 flex space-x-4">
      {/* Lista de produtos no carrinho */}
      <div className="w-1/2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between p-4 bg-white shadow-md rounded mb-4">
            <Image src={item.image} alt={item.title} width={96} height={96} className="object-contain" />
            <div className="ml-4">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-gray-600">${item.price ?? 'N/A'}</p>
              <div className="flex items-center mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">-</button>
                <span className="mx-4">{item.quantity}</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/3 p-4 bg-blue-600 text-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Resumo do pedido</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.title}</span>
            <span>${(item.price ?? 0 * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Entrega</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between">
          <span>Total</span>
          <span>${(subtotal + deliveryFee).toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-black text-white py-2 rounded">Pagar</button>
      </div>
    </div>
  );
};

export default CartPage;