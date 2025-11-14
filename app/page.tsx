
export default function Home() {

  return (
    <div className="grid grid-cols-3 gap-5 h-full w-auto">
      <a href="/pagination" className="btn bg-blue-400 p-5 rounded-full text-white">Pagination</a>
      <a href="/file-explorer" className="btn bg-blue-400 p-5 rounded-full text-white">File-Explorer</a>
      <a href="/" className="btn bg-blue-400 p-5 rounded-full text-white">Others Coming up...</a>
    </div>
  );
}
