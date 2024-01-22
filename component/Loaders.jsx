// import { Spinner } from "flowbite-react";

export const SpinLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-400"></div>
    </div>
  );
};

export const WelcomeLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-golbehi">
      <h1 className="font-light tracking-widest text-4xl pb-2">trucamp</h1>
      <h4 className="font-light text-sm tracking-widest">SUTECHCAMP 2023</h4>
    </div>
  );
};

export const OfflinePage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-400"></div>
    </div>
  );
};

export const LogoLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900">
      <img src="/rcpss.png" className="h-15 w-15 photo-animation" />
      <div className="mt-5 animate-spin rounded-full h-5 w-5 border-t-4 border-indigo-400"></div>
    </div>
  );
};
