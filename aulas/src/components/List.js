import Item from './Item'

function List() {
    return (
        <>
            <h1>Minhas listas</h1>
            <ul>
                <Item marca="Mercedes" ano={1960} />               
                <Item marca="Porsche" ano={1961} />
                <Item marca="BMW" ano={1980} />
                <Item  />
            </ul>
        </>
    )
}

export default List