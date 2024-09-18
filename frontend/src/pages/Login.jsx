import Form from "../components/Form"

function Login() {  //This will call the Form created in Form.jsx using the following props (properties)
    return <Form route="/api/token/" method="login" />
}

export default Login