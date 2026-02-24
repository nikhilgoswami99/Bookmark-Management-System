
import styles from './signIn.module.css'
import AuthForm from '@/components/authForm/AuthForm'


const SignIn = () => {


  return (
    <div>
      <AuthForm
          title="Sign In"
          subtitle="Welcome back!"
          buttonText="Sign In"
          footerText="Don't have an account?"
          footerLinkText="Sign Up"
          footerLinkHref="/signup"
          showNameField={false}
          mode="login"
        />
    </div>
  )
}

export default SignIn
