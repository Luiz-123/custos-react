import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { parse, v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'

function Project() {

    const {id} = useParams()
    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect (() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(resp => resp.json())
          .then((data) => {
              setProject(data)
          })  
          .catch(err => console.log)
        },200)
    },[id])

    function createService(project) {
        setMessage('')
        // Last Service ID was
        const lastService = project.services[project.services.length -1]   
        lastService.id = uuidv4()    
        
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // Maximun value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return(false)
        }

        // add service cost to project total cost
        project.cost = newCost

        //update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            // Exibir os serviços
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')
        // budget validation
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return(false)
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
    })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toogleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}                               
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento: </span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total de utilizado: </span>R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText="Salvar" 
                                        projectData={project} 
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toogleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}                               
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}                    
                                />}                     
                            </div>
                        </div>
                        <h2>Serviços:</h2>
                        <Container customClass="start">
                            <p>Item de serviço</p>
                        </Container>    
                    </Container>
                </div>
            ):(
                <Loading />
            )}
        </>
    )
}

export default Project