import trophyIcon from "@/assets/trophy.svg";
import successAnimation from "@/assets/success.json";
import Lottie from 'lottie-react'


export default function Styler() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">CSS Triangle Shapes</h2>

      {/* Method 1: Border Triangles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Border Method Triangles</h3>
        <div className="flex items-center gap-8 flex-wrap">
          {/* Up Triangle */}
          <div className="text-center">
            <div className="triangle-up"></div>
            <p className="mt-2 text-sm">Up</p>
          </div>

          {/* Down Triangle */}
          <div className="text-center">
            <div className="triangle-down"></div>
            <p className="mt-2 text-sm">Down</p>
          </div>

          {/* Left Triangle */}
          <div className="text-center">
            <div className="triangle-left"></div>
            <p className="mt-2 text-sm">Left</p>
          </div>

          {/* Right Triangle */}
          <div className="text-center">
            <div className="triangle-right"></div>
            <p className="mt-2 text-sm">Right</p>
          </div>
        </div>
      </div>

      {/* Method 2: Clip-path Triangles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Clip-path Method Triangles</h3>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="triangle-clip-up hover:scale-110 duration-300">
              <div className="flex items-center justify-center h-full">
                Hello
              </div>
            </div>
            <p className="mt-2 text-sm">Clip Up</p>
          </div>

          <div className="text-center">
            <div className="triangle-clip-down"></div>
            <p className="mt-2 text-sm">Clip Down</p>
          </div>

          <div className="text-center">
            <div className="triangle-clip-left"></div>
            <p className="mt-2 text-sm">Clip Left</p>
          </div>

          <div className="text-center">
            <div className="triangle-clip-right"></div>
            <p className="mt-2 text-sm">Clip Right</p>
          </div>
        </div>
      </div>

      {/* Method 3: Transform Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transform Method</h3>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="triangle-transform"></div>
            <p className="mt-2 text-sm">Rotated Square</p>
          </div>
        </div>
      </div>

      <div>
        <img src={trophyIcon} alt="Trophy Icon" className="w-20 h-20" />
      </div>

      <div className="w-20 h-20">
        <Lottie animationData={successAnimation} loop={true} autoPlay={true} />
      </div>

      <style>{`
        /* Border Method Triangles */
        .triangle-up {
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 43px solid #3b82f6;
        }
        
        .triangle-down {
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-top: 43px solid #ef4444;
        }
        
        .triangle-left {
          width: 0;
          height: 0;
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
          border-right: 43px solid #10b981;
        }
        
        .triangle-right {
          width: 0;
          height: 0;
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
          border-left: 43px solid #f59e0b;
        }

        /* Clip-path Method */
        .triangle-clip-up {
          width: 100px;
          height:86px;
          background: #8b5cf6;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .triangle-clip-down {
          width: 50px;
          height: 43px;
          background: #ec4899;
          clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
        }
        
        .triangle-clip-left {
          width: 43px;
          height: 50px;
          background: #06b6d4;
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
        }
        
        .triangle-clip-right {
          width: 43px;
          height: 50px;
          background: #84cc16;
          clip-path: polygon(100% 50%, 0% 0%, 0% 100%);
        }

        /* Transform Method */
        .triangle-transform {
          width: 35px;
          height: 35px;
          background: #f97316;
          transform: rotate(45deg);
          clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
        }

        /* Practical Examples */
        .triangle-down-white {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid white;
        }
        
        .triangle-right-white {
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 6px solid white;
        }
        
        .speech-triangle {
          position: absolute;
          bottom: -8px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #374151;
        }
      `}</style>
    </div>
  );
}
