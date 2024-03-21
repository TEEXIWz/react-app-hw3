import { useEffect, useRef, useState } from "react";
import { User } from "../../model/User";
import landmarks from "../../jsons/landmarks.json";
import users from "../../jsons/user.json";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { TabContext, TabPanel } from "@mui/lab";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useRef<User>();
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userLS = secureLocalStorage.getItem("userhw3");
        if (userLS) {
          user.current = JSON.parse(userLS.toString());
        } else {
          navigate("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  return (
    <>
      <div className="flex justify-center items-center bg-primary w-screen h-screen">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="px-5 py-5 bg-[#F5F7F8] shadow-2xl rounded-2xl w-2/3 h-4/5 overflow-y-scroll">
            <div className="w-fit p-3 rounded-md flex justify-start items-center gap-4 shadow-md shadow-slate-300">
              <div className="flex justify-center items-center gap-2">
                <img
                  src={user.current!.img}
                  className="h-16 w-16 object-cover rounded-full"
                />
                <div>
                  <div className="text-3xl font-medium text-start">
                    {user.current!.name}
                  </div>
                  <div className="text-base font-medium text-start">
                    Type : {user.current!.role == 0 ? "Admin" : "User"}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-xl text-sm text-white bg-red-600 hover:bg-red-500 active:bg-red-700 p-2 transition duration-200"
              >
                Log out
              </button>
            </div>
            {/* <div className="w-full h-full"></div> */}
            {user.current!.role == 0 ? (
              <>
                <div className="">
                  <TabContext value={value}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      centered
                    >
                      <Tab value="1" label="Show all users" />
                      <Tab value="2" label="Show all landmarks" />
                    </Tabs>
                    <TabPanel className="h-full" value="1">
                      <div className="max-h-[550px] grid grid-cols-4 gap-2 pb-2">
                        {users.map((user) => (
                          <div className="col-span-1 shadow-md rounded-md bg-white pb-1">
                            <div className="overflow-hidden rounded-t-md">
                              <img
                                className="rounded-t-md h-64 w-full object-cover transition duration-300 hover:scale-110"
                                src={user.img}
                              />
                            </div>

                            <div className="pt-1 px-2 flex flex-col justify-center items-center">
                              <div className="font-semibold text-lg">
                                {user.name}
                              </div>
                              <div className="text-sm">
                                Type : {user.role == 0 ? "Admin" : "User"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel className="h-full" value="2">
                      <div className="max-h-[550px] grid grid-cols-3 gap-2 pb-2">
                        {landmarks.map((landmark) => (
                          <div className="col-span-1 shadow-md rounded-md bg-white pb-3">
                            <div className="overflow-hidden rounded-t-md">
                              <img
                                className="rounded-t-md h-64 w-full object-cover transition duration-300 hover:scale-110"
                                src={landmark.coverimage}
                              />
                            </div>

                            <div className="pt-1 px-2">
                              <div className="font-bold">{landmark.name}</div>
                              <div className="text-sm">{landmark.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                  </TabContext>
                </div>
              </>
            ) : user.current!.role == 1 ? (
              <>
                <div className="text-xl font-medium text-center my-4">
                  {user.current?.country}
                </div>
                <div className="max-h-[550px] grid grid-cols-3 gap-2 pb-2">
                  {landmarks
                    .filter(
                      (landmark) => landmark.country == user.current?.country
                    )
                    .map((landmark) => (
                      <div className="col-span-1 shadow-md rounded-md bg-white pb-3">
                        <div className="overflow-hidden rounded-t-md">
                          <img
                            className="rounded-t-md transition duration-300 hover:scale-110"
                            src={landmark.coverimage}
                          />
                        </div>

                        <div className="pt-1 px-2">
                          <div className="font-bold">{landmark.name}</div>
                          <div className="text-sm">{landmark.detail}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </>
  );
  function logout() {
    secureLocalStorage.removeItem("userhw3");
    navigate("/");
  }
}

export default HomePage;
