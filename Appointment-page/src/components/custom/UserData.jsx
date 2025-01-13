import { useAuthStore } from "@/StateZustand/authStore";

const UserData = () => {
    const user = useAuthStore((state) => state.user);
    const currentUser = useAuthStore((state) => state.getUser(user));
  
    return (
      <div className="p-5 mt-3 text-[#333] bg-[#f9f9f9] h-full w-full mb-14">
        <section className="bg-black text-white p-4 rounded-lg flex justify-around items-center h-auto gap-4">
          <img className=" flex-roww-36 h-auto rounded-full text-white p-3" src={currentUser.email} alt={`${currentUser.name}'s`} />
          <div className="m-0 font-2 flex-row">
            <h1>{currentUser.name}</h1>
            <p className="mt-1 text-opacity-0.1">{currentUser.email}</p>
          </div>
        </section>
  
        <section className="mt-4 bg-white p-3 rounded-lg shadow-md">
          <h2 className="mb-2 text-black text-lg">Phone</h2>
          <p>{currentUser.phone}</p>
        </section>
  
        <section className="mt-4 bg-white p-3 rounded-lg shadow-md">
          <h2 className="mb-2 text-black text-lg">Details</h2>
          <ul className="list-none p-0">
            <li className="mb-2"><strong className="text-[#888b8d]">Password:</strong> {currentUser.password}</li>
            <li className="mb-2"><strong className="text-[#888b8d]">Gender:</strong> {currentUser.gender}</li>
            <li className="mb-2"><strong className="text-[#888b8d]">Source:</strong> {currentUser.source}</li>
          </ul>
        </section>
      </div>
    );
  };
  
  export default UserData;  