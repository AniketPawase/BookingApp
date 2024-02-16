function App() {
  return (
    <div>
      <header className="p-4 flex justify-between">
        <a href="" className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className="font-bold text-xl">AirBnc</span>
        </a>
        <div className="flex gap-2 border border-grey-300 rounded-full py-2 px-4 shadow-md shadow-grey-800">
          <div>Anywhere </div>
          <div className="border-l border-grey-300"></div>
          <div>Any week</div>
          <div className="border-l border-grey-300"></div>
          <div>Add guest</div>
          <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
 
export default App;
