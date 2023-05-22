import './Card.css';
import api from '../../../services/api';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Card = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [deficitIsChecked, setDeficitChecked] = useState(false);
    const [superavitIsChecked, setSuperavitChecked] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState('');
    let goal = "";
    
    const deficitCheckInput = () => {
      setDeficitChecked((prev) => !prev);
    }

    const superavitCheckInput = () => {
      setSuperavitChecked((prev) => !prev);
    }

    const postContent = async (e) => {
      e.preventDefault();
      setIsOpen(true);

      if (deficitIsChecked === true) {
        goal = "deficit";
      } else if(superavitIsChecked === true){
        goal = "superavit";
      } else if(deficitIsChecked === true && superavitIsChecked === true){
        goal = "manutenção calorica";
      } else{
        goal = "";
      }

      const bodyMessage = {  
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "user",
          "content": `Crie uma dieta de ${goal} calorico para uma pessoa com ${height} de altura e ${weight}KG`
        }]
      };

      const response = await api.post('chat/completions', bodyMessage);
      setData(response.data.choices[0].message.content);
    }

    const closeModal = () => {
      setIsOpen(false)
      setData('');
    }

    const customStyle = {
      content: {
        top: '5%',
        right: '20%',
        left: '20%',
        textAlign: 'center',
        transition: '0.4s',
        borderRadius: '1%',
      }
    }

    return(
      <form className='form-content' onSubmit={postContent}>
        <h1>PRECISAMOS DE SUAS INFORMAÇÕES :D</h1>

        <label for='height'>ALTURA (em cm)</label>
        <input 
          required
          className='input-card' 
          id='height' 
          name='height' 
          onChange={(e) => setHeight(e.target.value)}
        />

        <label for='weight'>PESO (em KG)</label>
        <input
          required 
          className='input-card' 
          id='weight' 
          name='weight'
          onChange={(e) => setWeight(e.target.value)}
        />

        <div className='checkboxes'>
          <input type='checkbox' id='deficit' onChange={deficitCheckInput}/>
          <label for="deficit">DEFICIT CALORICO</label>

          <input type='checkbox' id='superavit' onChange={superavitCheckInput}/>
          <label for="superavit">SUPERAVIT CALORICO</label>
        </div>

        <button type='submit' className='form-button'>CRIAR MINHA DIETA</button>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyle}
        >
          <div className='modal-content'>
            <h2>DE ACORDO COM A I.A A DIETA SUGERIDA SERA:</h2>
            {
              data === '' ? <p>LOADING...</p>
              : (
                <ReactMarkdown>
                  {data}
                </ReactMarkdown>
              )
            }
            <div className='button-container'>
              <button className='modal-button' onClick={closeModal}>FECHAR</button>
            </div>
          </div>
        </ReactModal>
      </form>
    );
}

export default Card;