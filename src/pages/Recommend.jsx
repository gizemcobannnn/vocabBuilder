import { BsSearch } from "react-icons/bs";

export default function Recommend() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-300">
        <div className="flex flex-row rounded-3xl w-150 p-12 items-center gap-3">
          <div className="flex flex-row items-center border border-[#121417]/10 rounded-lg p-1">
            <input type="text" placeholder="Find the word " className="w-36" />
            <BsSearch />
          </div>
          <select
            name="selectword"
            id="selectword"
            className="border border-[#121417]/10 w-30 rounded-lg p-1"
          >
            <option value="Verb">Verb</option>
          </select>
          <div className="flex flex-row gap-4 items-center justify-center ">
            <label htmlFor="regular">
              <input id="regular" type="radio" /> Regular
            </label>
            <label htmlFor="irregular">
              <input id="irregular" type="radio" /> Irregular
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p>To study: </p>
          <p>Train oneself </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-300">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Gizem Genç</td>
              <td className="border border-gray-300 px-4 py-2">
                gizem@example.com
              </td>
              <td className="border border-gray-300 px-4 py-2">Admin</td>
              <td className="border border-gray-300 px-4 py-2">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
