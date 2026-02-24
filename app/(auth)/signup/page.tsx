
import styles from './signUp.module.css'
import AuthForm from '@/components/authForm/AuthForm'


const SignUp = () => {
  return (
    <div className={styles.container}>

        <AuthForm
          title="Create Account"
          subtitle="Get started with Sangrah"
          buttonText="Sign Up"
          footerText="Already have an account?"
          footerLinkText="Sign In"
          footerLinkHref="/signin"
          showNameField={true}
          mode="register"
        />
    
    </div>
  )
}

export default SignUp
