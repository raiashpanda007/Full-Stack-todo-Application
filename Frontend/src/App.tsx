
import { Outlet } from "react-router-dom"
function App() {


  return (
    <>
      <div className='h-screen w-screen bg-black grid grid-rows-5'>
        <h1 className="text-white text-center font-outfit row-span-1 border text-8xl font-bold">Make Your TODO</h1>
        <div className="row-span-4 border overflow-auto flex justify-center">
        <Outlet/>
        </div>
      </div>
    </>
  )
}

export default App
