import { AppMyCart } from "../components/mycart/AppMyCart";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function MyCartPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <Link
            to="/home"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
  
          <AppMyCart />
        </div>
      </div>
    );
  }