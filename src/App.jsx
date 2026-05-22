import Features from "./components/Features/Features"
import Hero from "./components/Hero/Hero"
import NavBar from "./components/NavBar/NavBar"


function App() {
  

  return (
    <>
    <div className="h-full w-full bg-gray-950">
      <NavBar/>
      <main>
        <Hero />
        <Features/>
      </main>
    </div>
    </>
  )
}

export default App
