import { useState} from 'react'

function Condicional() {

    const [email, setEmail] = useState();
    const [userEmail, setUserEmail] = useState();

    function enviarEmail(e) {
        e.preventDefault();
        setUserEmail(email);
        console.log(userEmail);
    }

    function limparEmail() {
        setUserEmail('');
        setEmail('');               
    }

    return (
        <div>
            
            <h2>Cadastre o seu e-mail</h2>
            <form>
                <input 
                    type="email" 
                    placeholder="Digite o seu e-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" onClick={enviarEmail}>Enviar</button>                
            </form>

            {userEmail && (
                <div>
                    <p>O e-mail do usuário é {userEmail}</p>
                    <button type="submit" onClick={limparEmail}>Limpar</button> 
                </div>
            )}

        </div>
    )
}

export default Condicional