import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'
function App() {

  return (
    <>
    <Navbar/>
    <div className='min-h-[77vh]'>
    <Manager/>
    </div>    
    
    <Footer/>
    </>
  )
}

export default App
