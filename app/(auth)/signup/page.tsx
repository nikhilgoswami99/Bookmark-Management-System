
import AuthForm from '@/components/authForm/AuthForm'


const SignUp = () => {
  return (
    <div data-theme="dark">

        <AuthForm
          title="Create an account"
          subtitle="Enter your information below to create your account"
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
