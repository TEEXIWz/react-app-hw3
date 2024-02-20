import { useEffect, useState } from "react";
import { User } from "../../model/User";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-primary w-screen h-screen">
        <div className="px-6 py-10 bg-white rounded-2xl w-1/3">
          <div className="flex justify-center">
            <img className="size-64 mb-5" src={user?.img} />
          </div>
          <h1 className="text-3xl font-medium text-center">{user?.name}</h1>
          {user?.role == 0 ? (
            <>
              <h1 className="text-xl font-medium text-center">พนักงาน</h1>
              <div className="flex flex-row gap-5 my-4">
                <button className="w-full rounded-xl text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 py-2 transition duration-200">
                  จัดการสินค้า
                </button>
                <button className="w-full rounded-xl text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 py-2 transition duration-200">
                  จัดการออเดอร์
                </button>
              </div>
            </>
          ) : user?.role == 1 ? (
            <>
              <h1 className="text-xl font-medium text-center">ลูกค้า</h1>
              <div className="flex flex-row gap-5 my-4">
                <button className="w-full rounded-xl text-white bg-primary hover:bg-violet-700 active:bg-violet-900 py-2 transition duration-200">
                  สั่งซื้อสินค้า
                </button>
                <button className="w-full rounded-xl text-white bg-primary hover:bg-violet-700 active:bg-violet-900 py-2 transition duration-200">
                  ดูประวัติการสั่งซื้อ
                </button>
              </div>
            </>
          ) : <></>}
          <button
            onClick={logout}
            className="mb-4 w-full rounded-xl text-white bg-red-600 hover:bg-red-500 active:bg-red-700 py-2 transition duration-200"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }
}

export default HomePage;
