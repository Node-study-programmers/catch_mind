import img from './asset/img/qwe.jpg';
function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-300">
      {/* <h1 className="text-4xl font-bold text-mainColor font-mainFont">
        Hello, Tailwind CSS with Gradients!
      </h1> */}
      PR TEST
      <img src={img} alt="" className="w-[50vw] h-[50vh]" />
    </div>
  );
}

export default App;
