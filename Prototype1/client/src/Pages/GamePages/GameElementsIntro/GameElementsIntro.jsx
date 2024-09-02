// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Lottie from "lottie-react";
// import aquaAnimationData from "../../../assets/lottieAnimations/aqua.json";
// import Joyride, { STATUS } from "react-joyride";
// import { useNavigate } from "react-router-dom";

// const ElementMap = [
//   { name: "Farm", bgColor: "green" },
//   { name: "Home", bgColor: "yellow" },
//   { name: "Industry", bgColor: "blue" },
// ];
// const aquaAnimationOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: aquaAnimationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

// const GameElementsIntro = () => {
//   const { isTutorialComplete } = useSelector((state) => state.tutorial);
//   const [run, setRun] = useState(!isTutorialComplete);
//   const [currentStep, setCurrentStep] = useState(0);
//   const navigate = useNavigate();

//   const steps = [
//     {
//       target: `.farm`,
//       content: (
//         <>
//           <div className="flex items-center">
//             <Lottie options={aquaAnimationOptions} height={50} width={50} />
//             <p>
//               This is the Farm! Farms use a significant amount of groundwater.
//               Let's explore how we can conserve water here.
//             </p>
//           </div>
//         </>
//       ),
//       disableBeacon: true,
//       placement: "right",
//     },
//     {
//       target: `.home`,
//       content: (
//         <>
//           <div className="flex items-center">
//             <Lottie options={aquaAnimationOptions} height={50} width={50} />
//             <p>
//               Welcome to your Home! Discover simple ways to save water in
//               everyday activities.
//             </p>
//           </div>
//         </>
//       ),
//       placement: "left",
//     },
//     {
//       target: `.industry`,
//       content: (
//         <>
//           <div className="flex items-center">
//             <Lottie options={aquaAnimationOptions} height={50} width={50} />
//             <p>
//               This is the Industry! Industries consume a lot of water. Learn how
//               we can make them more water-efficient.
//             </p>
//           </div>
//         </>
//       ),
//       placement: "left",
//     },
//     {
//       target: ".farm",
//       content: (
//         <>
//           <div className="flex items-center">
//             <Lottie options={aquaAnimationOptions} height={50} width={50} />
//             <p>
//               Let's start with the Farm! Perform tasks that help reduce water
//               usage and make the farm more sustainable.
//             </p>
//           </div>
//         </>
//       ),
//       placement: "right",
//     },
//   ];

//   const handleJoyride = (data) => {
//     const { status, index } = data;
//     setCurrentStep(index % ElementMap.length);

//     if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
//       setRun(false);
//     }
//   };

//   return (
//     <section className="min-h-screen w-full relative">
//       <Joyride
//         steps={steps}
//         run={run}
//         continuous
//         showProgress
//         showSkipButton
//         callback={handleJoyride}
//         spotlightPadding={1}
//         styles={{
//           options: {
//             zIndex: 10000,
//             primaryColor: "#34d399", 
//             backgroundColor: "#ffffff",
//             textColor: "#333333",
//             borderRadius: 8,
//             arrowColor: "#ffffff",
//             overlayColor: "rgba(0, 0, 0, 0.5)",
//           },
//           buttonNext: {
//             backgroundColor: "#10b981", 
//             color: "#ffffff",
//             borderRadius: 8,
//             padding: "10px 20px",
//             fontSize: "16px",
//             fontWeight: "600",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             transition: "background-color 0.3s ease, transform 0.3s ease",
//           },
//           buttonBack: {
//             backgroundColor: "#f7fafc", 
//             color: "#2d3748",
//             borderRadius: 8,
//             padding: "10px 20px",
//             fontSize: "16px",
//             fontWeight: "600",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "background-color 0.3s ease, transform 0.3s ease",
//           },
//           buttonSkip: {
//             backgroundColor: "#edf2f7",
//             color: "#2d3748",
//             borderRadius: 8,
//             padding: "10px 20px",
//             fontSize: "16px",
//             fontWeight: "600",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             transition: "background-color 0.3s ease, transform 0.3s ease",
//           },
//           tooltip: {
//             borderRadius: 12,
//             boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//             padding: "15px",
//           },
//           tooltipContent: {
//             display: "flex",
//             alignItems: "center",
//           },
//         }}
//       />
//       <div className="absolute inset-0 flex w-full h-full">
//         {ElementMap.map((item, index) => {
//           const { name, bgColor } = item;
//           return (
//             <div
//               key={index}
//               className={`group flex w-1/3  items-center justify-center cursor-pointer relative p-4 transition-all duration-300 transform ${
//                 currentStep === index ? "scale-105 shadow-lg" : ""
//               } ${name.toLowerCase()}`}
//               style={{
//                 backgroundColor:
//                   bgColor === "green"
//                     ? "#34d399"
//                     : bgColor === "yellow"
//                     ? "#facc15"
//                     : "#60a5fa",
//               }}
//               onClick={() => {
//                 navigate(`/element/${item.name.toLowerCase()}`);
//               }}
//             >
//               <h1
//                 className={`font-bold text-white text-4xl transition-opacity duration-300 ${
//                   currentStep === index
//                     ? "opacity-100"
//                     : "opacity-0 group-hover:opacity-100"
//                 }`}
//               >
//                 {name}
//               </h1>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default GameElementsIntro;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import aqua from "../../../assets/aqua/aqua.png"
import Joyride, { STATUS } from "react-joyride";
import { nextStep, setSelectedElement } from "../../../lib/Slices/tutorialSlice";
import farm from "../../../assets/IntroPageAssets/farm.png"
import home from "../../../assets/IntroPageAssets/home.png"
import industry from "../../../assets/IntroPageAssets/industry.png"
import "./GameElementsInto.css"
import { useNavigate } from "react-router-dom";


const ElementMap = [
  { name: "Farm", imgSrc: farm },
  { name: "Home", imgSrc: home },
  { name: "Industry", imgSrc: industry },
];


const GameElementsIntro = () => {
  const dispatch = useDispatch();
  const { isTutorialComplete } = useSelector((state) => state.tutorial);
  const [run, setRun] = useState(!isTutorialComplete);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      target: `.farm`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is the Farm! Farms use a significant amount of groundwater.
              Let's explore how we can conserve water here.
            </p>
            <div >
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>

          </div>
        </>
      ),
      disableBeacon: true,
      placement: "right",
    },
    {
      target: `.home`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is your Home! Every drop of water counts here. Let's discover ways to conserve water in our daily lives.
            </p>
            <div >
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>

          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: `.industry`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is the Industry! Water is essential for production. Let's find innovative methods to save water in industrial processes.
            </p>
            <div >
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>

          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: ".farm",
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is the Farm! Farms use a significant amount of groundwater.
              Let's explore how we can conserve water here.
            </p>
            <div >
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>

          </div>
        </>
      ),
      placement: "right",
    },
  ];

  const handleJoyride = (data) => {
    const { status, index } = data;
    setCurrentStep(index % ElementMap.length);

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <section className="min-h-screen w-full relative">
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress={false}
        showSkipButton
        callback={handleJoyride}
        spotlightPadding={10}
        locale={{
          back: "Previous", // Custom text for the Back button
          last: "Finish", // Custom text for the Last button (usually the Finish button)
          next: "Next", // Custom text for the Next button
          skip: "Skip", // Custom text for the Skip button
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399", // Tailwind green-400
            backgroundColor: "#ffffff",
            textColor: "#333333",
            borderRadius: 8,
            arrowColor: "#ffffff",
            overlayColor: "rgba(0, 0, 0, 0.5)"
          },
          buttonNext: {
            backgroundColor: "rgb(4 120 87)", // Tailwind green-500
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonBack: {
            backgroundColor: "rgb(101 163 13)", // Tailwind gray-50
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonSkip: {
            backgroundColor: "#edf2f7",
            color: "#2d3748",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          tooltip: {
            borderRadius: 12,
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            padding: "15px",
          },
          tooltipContent: {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
      <div className="absolute inset-0 grid grid-cols-3 w-[98%] h-[98%] overflow-hidden m-auto">
        {ElementMap.map((item, index) => {
          const { name, imgSrc } = item;
          return (
            <div
              key={index}
              className={`group bg-white/10 flex flex-col items-center justify-center cursor-pointer m-2 rounded-lg transition-transform duration-300 hover:scale-105 ${currentStep === index ? " shadow-lg" : ""
                } ${name.toLowerCase()}`}

              onClick={() => {
                navigate(`/element/${item.name.toLowerCase()}`);
              }}
            >
              {/* transition-transform duration-300 group-hover:scale-105 */}
              <img
                src={imgSrc} // Use the dynamic image source
                alt={`${name} Image`}
                className={`object-contain w-96 h-96 mb-4 `}
              />
              <h1
                className={`font-bold text-white text-5xl transition-opacity duration-300 liu-jian ${currentStep === index
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
                  }`}
              >
                {name}
              </h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GameElementsIntro;
