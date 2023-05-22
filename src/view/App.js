import './App.css';
import Navbar from './components/nav/Nav';
import Footer from './components/footer/Foot';
import Card from './components/card/Card';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className='content-container'>
        <div className='image-container'>
          <h1>CRIE SUA DIETA COM UMA INTELIGÊNCIA ARTIFICIAL</h1>
          <p>A MANEIRA MAIS FÁCIL DE CRIAR UMA DIETA, TESTE AGORA</p>
        </div>
        <Card />
      </div>
      <Footer />
    </div>
  );
}

export default App;
