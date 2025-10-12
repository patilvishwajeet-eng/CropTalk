// import React, { useState } from "react";
// import NewSidebar from "./NewSidebar";
// import axios from "axios";
// import { Upload, ImagePlus, Loader2, ShieldCheck } from "lucide-react";

// const AI = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [prediction, setPrediction] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setPrediction("");
//   };

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image");

//     const formData = new FormData();
//     formData.append("file", image);

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:5000/predict", formData);
//       setPrediction(res.data.prediction);
//     } catch (error) {
//       console.error("Prediction error:", error);
//       setPrediction("Error in prediction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white">
//         <NewSidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center px-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//           <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2 mb-6">
//             <ShieldCheck className="w-7 h-7" />
//             Plant Disease Detector
//           </h1>

//           <div className="mb-4">
//             <label
//               htmlFor="image-upload"
//               className="cursor-pointer flex items-center gap-2 text-green-600 hover:text-green-800"
//             >
//               <ImagePlus className="w-5 h-5" />
//               Choose Leaf Image
//             </label>
//             <input
//               type="file"
//               id="image-upload"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </div>

//           {preview && (
//             <div className="mb-4">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-52 object-cover rounded-xl border"
//               />
//             </div>
//           )}

//           <button
//             onClick={handleUpload}
//             className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl w-full transition"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin w-5 h-5" />
//                 Predicting...
//               </>
//             ) : (
//               <>
//                 <Upload className="w-5 h-5" />
//                 Predict Disease
//               </>
//             )}
//           </button>

//           {prediction && (
//             <div className="mt-6 text-center text-gray-800">
//               <p className="text-lg">🌿 <strong>Prediction:</strong></p>
//               <p className="text-xl font-semibold text-green-700 mt-1">{prediction}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AI;


import React, { useState } from "react";
import NewSidebar from "./NewSidebar";
import { Upload, ImagePlus, Loader2, ShieldCheck } from "lucide-react";

// Dummy disease dataset for synthetic images
const diseaseDataset = {
  healthy: "Healthy Leaf",
  leaf_spot: "Leaf Spot Disease",
  powdery_mildew: "Powdery Mildew",
  rust_disease: "Rust Disease"
};

const AI = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [imageName, setImageName] = useState(""); // To store the image name
  const [loading, setLoading] = useState(false);

  // Simulated model function for predicting diseases based on image name
  const simulateModelPrediction = (imageName) => {
    // Simulate disease prediction based on image name
    let diseasePrediction = "Healthy"; // Default to healthy if no specific disease detected
    
    if (imageName.includes("leaf_spot")) {
      diseasePrediction = diseaseDataset["leaf_spot"];
    } else if (imageName.includes("powdery_mildew")) {
      diseasePrediction = diseaseDataset["powdery_mildew"];
    } else if (imageName.includes("rust_disease")) {
      diseasePrediction = diseaseDataset["rust_disease"];
    } else if (imageName.includes("healthy")) {
      diseasePrediction = diseaseDataset["healthy"];
    }

    return diseasePrediction;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name); // Save the image name
    setPreview(URL.createObjectURL(file));
    setPrediction(""); // Reset prediction when new image is uploaded
  };

  const handleUpload = () => {
    if (!image) return alert("Please select an image.");

    setLoading(true);

    // Simulate disease prediction based on file name (just for the sake of demonstration)
    const fileName = image.name.toLowerCase();

    // Simulate a delay for loading
    setTimeout(() => {
      const diseasePrediction = simulateModelPrediction(fileName);
      setPrediction(diseasePrediction);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <NewSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2 mb-6">
            <ShieldCheck className="w-7 h-7" />
            Plant Disease Detector
          </h1>

          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-2 text-green-600 hover:text-green-800"
            >
              <ImagePlus className="w-5 h-5" />
              Choose Leaf Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-52 object-cover rounded-xl border"
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl w-full transition"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Predicting...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Predict Disease
              </>
            )}
          </button>

          {prediction && (
            <div className="mt-6 text-center text-gray-800">
              <p className="text-lg">🌿 <strong>Prediction for {imageName}:</strong></p>
              <p className="text-xl font-semibold text-green-700 mt-1">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AI;



