function Field({name, value, onChange, children}) { // Champs txt "Nom" et "Prénom"
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control"></input>
    </div>
}

function Checkbox({name, value, onChange, children}) { // Checkbox "Newsletter"
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input"></input>
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>
}

class Form extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false
        }
        // Définition des bind de "this"
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        // Permer d'identifier le type et le nom du champ,
        // puis de modifier le state en fonction.
        const name = e.target.name
        const type = e.target.type
        const value = type === "checkbox" ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
        // Insérer logique d'envoi de données..
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false
        }) // Réinitialisation du state pour éviter un nouvel envoi de formulaire
    }

    render() {
        return <form className="container" onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange}>S'abonner à la newsletter ?</Checkbox>
            <button className="btn btn-primary">Envoyer</button>
            <div>
                <p>{JSON.stringify(this.state)}</p>
                {/*Affichage des données du state*/}
            </div>    
        </form> 
    }
}

ReactDOM.render(<Form/>, document.querySelector("#app"))