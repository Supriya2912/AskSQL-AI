import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="loading">
      <ClipLoader size={40} />
      <p>Generating SQL...</p>
    </div>
  );
}

export default LoadingSpinner;