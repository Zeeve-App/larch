import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useToggle } from "src/hooks";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";

export default function MainLayout() {
  const { isOpen, handleClose, handleToggle } = useToggle();

  return (
    <>
      <main className="flex relative h-screen w-screen overflow-hidden">
        <SidebarLayout />
        <section className="flex-grow absolute md:relative inset-0 h-screen">
          <HeaderLayout
            isServiceOpen={isOpen}
            serviceToggle={() => handleToggle()}
            serviceClose={handleClose}
          />
          <div
            className={`overflow-auto ${isOpen ? "blur-sm" : "blur-none"}`}
            style={{
              height: "calc(100vh - 80px)",
            }}
          >
            <Outlet />
          </div>
        </section>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        progressClassName="bg-larch-pink"
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        bodyClassName="p-0 m-0"
        toastClassName="border-2 border-dark-700 border-2 p-3"
      />
    </>
  );
}
