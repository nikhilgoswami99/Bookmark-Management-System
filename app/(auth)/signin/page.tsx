
import AuthForm from '@/components/authForm/AuthForm'


const SignIn = () => {


  return (
    <div>
      <AuthForm
          title="Login to your account"
          subtitle="Enter your email below to login to your account"
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
