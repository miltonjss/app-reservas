import { useState } from "react";
import { FaPlus, FaList } from "react-icons/fa";
import { GoPin } from "react-icons/go";
import { NavLink } from "react-router-dom";

function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav
        className={`group flex flex-col h-screen bg-gray-800 pt-4 transition-all duration-300 justify-between
    ${isOpen ? "w-auto" : "w-auto hover:w-max"}`}
      >
        <div className="flex flex-col gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 font-medium border-l-4 ${isActive ? "bg-gray-900 text-white border-green-500" : "text-gray-300 hover:bg-gray-900"}`
            }
          >
            <FaList className="shrink-0" />
            <span
              className={`overflow-hidden transition-all duration-300 whitespace-nowrap 
              ${isOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"}`}
            >
              Reservas
            </span>
          </NavLink>
          <NavLink
            to="/nova-reserva"
            className={({ isActive }) =>
              `flex items-center gap-2 p-4 font-medium border-l-4 ${isActive ? "bg-gray-900 text-white border-green-500" : "text-gray-300 hover:bg-gray-900"}`
            }
          >
            <FaPlus className="shrink-0" />
            <span
              className={`overflow-hidden transition-all duration-300 whitespace-nowrap 
              ${isOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"}`}
            >
              Criar reservas
            </span>
          </NavLink>
        </div>

        <button
          className={`flex items-center gap-2 p-4 border-l-4 text-gray-300 font-medium hover:bg-gray-900 ${isOpen ? "bg-gray-900 text-white border-green-500" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <GoPin className="shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap 
    ${isOpen ? "max-w-xs opacity-100 " : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"}`}
          >
            Fixar barra
          </span>
        </button>
      </nav>
    </>
  );
}

export default MenuLateral;
