import { AppMyCart } from "../components/mycart/AppMyCart";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function MyCartPage() {
    return (
      <div>
        <Link
          to= "/home"
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
       <AppMyCart></AppMyCart>
      </div>
    );
  }