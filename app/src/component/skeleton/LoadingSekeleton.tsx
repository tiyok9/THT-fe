const LoadingSekeleton = () => {
  return (
    <div className="w-full bg-blueDark drop-shadow-3xl rounded-lg mx-auto justify-center flex flex-col">
      <div className="animate-pulse flex space-x-4  md:my-10">
        <div className="flex-1 space-y-6">
          <div className="h-5 bg-slate-200 rounded w-32  m-2 md:ml-10 "></div>
          <div className="space-y-6 m-2 md:ml-10">
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
            <div className="h-5 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSekeleton;
