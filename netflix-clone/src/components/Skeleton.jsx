const Skeleton = () => {
  return (
    <div className="flex space-x-4 p-4 overflow-hidden">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          className="flex-none w-40 md:w-52 h-60 md:h-72 bg-gray-800 animate-pulse rounded-sm"
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;