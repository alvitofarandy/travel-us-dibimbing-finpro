import { useData } from "../context/HomePageContext";

const UserComp = () => {
  const { allUser, setRole, setRoleIndex } = useData();

  // State to manage editable roles

  const handleRoleChange = (value, index) => {
    setRole(value);
    setRoleIndex(index);
  };

  return (
    <div>
      <h1 className="text-[30px] font-bold">Atur Pengguna</h1>
      <div className="overflow-x-auto h-screen">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
          <thead className="sticky top-0 bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 border border-gray-300 text-sm font-medium">
                UserId
              </th>
              <th className="px-6 py-3 border border-gray-300 text-sm font-medium">
                Nama
              </th>
              <th className="px-6 py-3 border border-gray-300 text-sm font-medium">
                Email
              </th>
              <th className="px-6 py-3 border border-gray-300 text-sm font-medium">
                Role
              </th>
              <th className="px-6 py-3 border border-gray-300 text-sm font-medium">
                Nomor Telpon
              </th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto max-h-96">
            {allUser.map((user, index) => (
              <tr key={user.id}>
                <td className="px-6 py-3 border border-gray-300 items-center gap-3">
                  <div className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"></div>
                  <div className="truncate">{user.id}</div>
                </td>
                <td className="px-6 py-3 border border-gray-300 items-center gap-3">
                  <div className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"></div>
                  <div className="truncate">{user.name}</div>
                </td>
                <td className="px-6 py-3 border border-gray-300 items-center gap-3">
                  <div className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"></div>
                  <div className="truncate">{user.email}</div>
                </td>

                {/* Editable Role Section */}
                <td className="px-6 py-3 border border-gray-300 items-center gap-3">
                  <div className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"></div>
                  <div className="truncate flex gap-2 justify-between">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(e.target.value, index)}
                      className="bg-white border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </td>

                <td className="px-6 py-3 border border-gray-300 items-center gap-3">
                  <div className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"></div>
                  <div className="truncate">{user.phoneNumber}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserComp;
