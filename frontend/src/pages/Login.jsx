import LoginForm from "../components/LoginForm"

function Login() {  //This will call the Form created in Form.jsx using the following props (properties)
    console.log("Going to login")
    return <LoginForm route="/api/token/" />
}

export default Login