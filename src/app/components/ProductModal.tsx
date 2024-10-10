import { motion } from 'framer-motion';
import { Product } from '../domain/types/ProductType';

export const ProductDetailsModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="mt-4">{product.description}</p>
        <p className="mt-2 text-lg font-semibold">${product.price}</p>
        <button onClick={onClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Fechar
        </button>
      </div>
    </motion.div>
  );
};
