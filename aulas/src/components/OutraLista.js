function OutraLista({items}) {
    return (
        <>
            <h3>Lista de Framework</h3>
            {items.length > 0 ?
                (items.map((item,index) => <p key={index}>{item}</p>)
                ) : (<p>Não há items na lista!</p>)            
            }
        </>
    )
}

export default OutraLista