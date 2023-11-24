'use client';

export default function CreateBandForm() {
  return (
    <form className="bg-backgroundNavbar/75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Name of the band
        <input
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>

      <label className="block text-textColorNavbar text-m font-medium mb-2">
        Description
        <input
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-sm bg-backgroundNavbar font-light leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <br />
      <br />
      <button className="flex justify-center place-items-center bg-backgroundNavbar border-textColorNavbar text-textColorNavbar font-medium py-2 px-4 border rounded hover:bg-buttonHover">
        Create band
      </button>
    </form>
  );
}
