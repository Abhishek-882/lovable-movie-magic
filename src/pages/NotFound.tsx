
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <div className="mb-8 text-6xl font-bold text-primary">404</div>
        <h1 className="mb-4 text-3xl font-bold">Page not found</h1>
        <p className="mb-8 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
