import { QuizEscalera } from './component/QuizEscalera';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', fontFamily: 'Arial' }}>
        Evaluación
      </h1>
      <QuizEscalera />
    </div>
  );
}

export default App;