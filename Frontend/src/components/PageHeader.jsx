import { FaUserGraduate } from "react-icons/fa";

const PageHeader = ({ title, subtitle, description, icon }) => {
  const IconComponent = icon || <FaUserGraduate />;
  return (
    <div className="w-full relative p-8 bg-gradient-to-r from-blue-900 to-teal-900 text-white rounded-lg shadow-lg overflow-hidden">
      {/* Decorative Icon */}
      <div className="hidden lg:flex absolute left-6 top-1/2 transform -translate-y-1/2 opacity-20 select-none">
        <div className="text-6xl md:text-8xl lg:text-9xl">{IconComponent}</div>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        {/* Gradient Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          {title}
        </h1>

        {/* Short Title */}
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{subtitle}</h2>

        {/* Description */}
        <p className="text-md md:text-lg font-light opacity-90">
          {description}
        </p>
      </div>

      <div className="hidden lg:flex absolute right-6 top-1/2 transform -translate-y-1/2 opacity-50 select-none">
        <div className="text-6xl md:text-8xl lg:text-9xl">{IconComponent}</div>
      </div>
    </div>
  );
};

export default PageHeader;
