import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';

const SkinAnalyzerApp = () => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic timing
    setTimeout(() => {
      // Simulate different analysis results
      const analysisTypes = [
        {
          type: 'Benign Mole',
          confidence: 87,
          risk: 'low',
          description: 'Appears to be a common benign mole with regular borders and uniform color.',
          recommendations: [
            'Continue regular self-examinations',
            'Monitor for any changes in size, color, or shape',
            'Schedule routine dermatology check-up'
          ],
          needsAttention: false
        },
        {
          type: 'Atypical Mole',
          confidence: 73,
          risk: 'medium',
          description: 'Shows some irregular features that warrant professional evaluation.',
          recommendations: [
            'Schedule dermatologist appointment within 2-4 weeks',
            'Take photos to track any changes',
            'Avoid sun exposure on this area'
          ],
          needsAttention: true
        },
        {
          type: 'Inflammatory Rash',
          confidence: 91,
          risk: 'low',
          description: 'Consistent with common inflammatory skin condition.',
          recommendations: [
            'Keep area clean and dry',
            'Consider over-the-counter anti-inflammatory cream',
            'See doctor if persists beyond 1-2 weeks'
          ],
          needsAttention: false
        },
        {
          type: 'Acne Lesions',
          confidence: 94,
          risk: 'low',
          description: 'Common acne breakout with inflammatory papules.',
          recommendations: [
            'Use gentle, non-comedogenic skincare products',
            'Consider salicylic acid or benzoyl peroxide treatments',
            'Consult dermatologist if severe or persistent'
          ],
          needsAttention: false
        }
      ];
      
      const randomResult = analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
      setResults(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetApp = () => {
    setImage(null);
    setResults(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">SkinAI Analyzer</h1>
          <p className="text-blue-100 text-sm">AI-powered skin health screening</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {!image && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Take or Upload Photo</h2>
                <p className="text-gray-600 text-sm mb-6">Capture a clear image of the skin area you'd like to analyze</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>
              </div>

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {image && !results && !isAnalyzing && (
            <div className="text-center">
              <div className="mb-4">
                <img
                  src={image}
                  alt="Uploaded skin image"
                  className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                />
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={analyzeImage}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Analyze Image
                </button>
                
                <button
                  onClick={resetApp}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Take Another Photo
                </button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="mb-4">
                <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Image...</h3>
              <p className="text-gray-600 text-sm">Our AI is examining your skin image</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div>🔍 Detecting skin features...</div>
                <div>🎯 Analyzing patterns and colors...</div>
                <div>🧠 Applying medical knowledge...</div>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              {/* Image thumbnail */}
              <div className="text-center">
                <img
                  src={image}
                  alt="Analyzed skin image"
                  className="w-24 h-24 mx-auto rounded-lg shadow-md object-cover"
                />
              </div>

              {/* Results */}
              <div className={`p-4 rounded-lg border-2 ${
                results.needsAttention 
                  ? 'border-orange-200 bg-orange-50' 
                  : 'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {results.needsAttention ? (
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  <h3 className={`font-bold text-lg ${
                    results.needsAttention ? 'text-orange-800' : 'text-green-800'
                  }`}>
                    {results.type}
                  </h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Confidence</span>
                    <span className="text-sm font-bold">{results.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${results.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{results.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Recommendations
                  </h4>
                  <ul className="space-y-1">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                {results.needsAttention && (
                  <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Find Dermatologist
                  </button>
                )}
                
                <button
                  onClick={resetApp}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Disclaimer:</strong> This app is for educational purposes only and should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinAnalyzerApp;