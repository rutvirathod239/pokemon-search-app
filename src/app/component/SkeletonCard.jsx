const SkeletonCard = () => {
    return (
        <div className="bg-white w-full max-w-sm mx-auto shadow-md rounded-lg h-full animate-pulse">
            <div className="h-60 bg-white-200 rounded-t-lg"></div>
            <div className="bg-white-100 h-40 rounded-b-lg p-4">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
}
  
export default SkeletonCard;