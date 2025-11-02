import { Link } from "react-router";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        দুঃখিত, তুমি যে পেজটি খুঁজছো সেটি পাওয়া যায়নি।
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-all"
      >
        হোম পেজে ফিরে যাও
      </Link>
    </div>
  );
};

export default PageNotFound;
