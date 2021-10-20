import "./loader.css";
export const Loader =()=>{
    return <div className="loader" data-testid="loader">
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 74C18.1178 74 2 57.8822 2 38C2 18.1178 18.1178 2 38 2C57.8822 2 74 18.1178 74 38C74 45.4006 71.7669 52.2796 67.9378 58" stroke="url(#paint0_linear_3:45)" strokeWidth="3"/>
      <defs>
      <linearGradient id="paint0_linear_3:45" x1="2" y1="38" x2="74" y2="38" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6647"/>
      <stop offset="1" stopColor="#D6008F"/>
      </linearGradient>
      </defs>
    </svg>
  </div>
}