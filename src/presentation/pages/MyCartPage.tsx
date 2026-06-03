import { AppMyCart } from '@components/mycart/AppMyCart';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function MyCartPage() {
  return (
    <>
      <div>
        <Link
          to="/home"
          className="flex gap-2 text-gray-700 hover:text-black transition mb-6 self-start"
        >
          <ArrowLeft size={20} />
          <span>Back To Shop</span>
        </Link>
      </div>

      <div className="p-6">
        <div className="w-full max-w-4xl mx-auto">
          <AppMyCart />
        </div>
      </div>
    </>
  );
}
