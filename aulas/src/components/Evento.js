import Button from './evento/Button'

function Evento({ numero }) {

    function meuEvento() {
        console.log(`Em execução!`);
    }

    function segundoEvento() {
        console.log(`Atualizou!`);
    }

    return (
        <div>
            <p>Clique para executar o evento</p>
            <Button event={meuEvento} text="Primeiro Evento" /> 
            <Button event={segundoEvento} text="Segundo Evento" />           
        </div>
    )
}

export default Evento