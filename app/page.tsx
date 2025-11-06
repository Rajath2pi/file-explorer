import ChevronRight from "./Components/ChevronRight";
import MainComponent from "./Components/MainConponent";


export default function Home() {
 
  return (
    <div className="">
      <main className="">
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-['Inter'] flex justify-center">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>{`
        .shadow-lg-custom {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
          <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg-custom border border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
              File Structure Explorer
            </h1>
            <div className="space-y-1">
              {/* Start the recursive rendering from the root node */}
              <MainComponent />
            </div>

            <div className="mt-8 pt-4 border-t text-sm text-gray-500">
              <p className="font-semibold mb-1">How to use:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Click the arrow (<ChevronRight className="inline w-3 h-3 text-gray-600 transform rotate-90" />) to expand/collapse folders.</li>
                <li>Use <span className="font-mono bg-gray-100 p-0.5 rounded text-green-700">+F</span> to add a new **Folder**.</li>
                <li>Use <span className="font-mono bg-gray-100 p-0.5 rounded text-indigo-700">+A</span> to add a new **File**.</li>
                <li>Press `Enter` or click `Add` after typing the new name.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
