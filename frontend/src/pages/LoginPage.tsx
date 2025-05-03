import Heading from '@/components/ui/custom/Heading';
import loginImage from '@/assets/img/login-image.webp';
import Text from '@/components/ui/custom/Text';
import LoginForm from '@/components/LoginForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <section className="mt-12 grid lg:grid-cols-2 lg:items-center">
      <div className="rounded overflow-hidden aspect-video lg:aspect-square">
        <img
          className="w-full h-full object-cover"
          src={loginImage}
          alt="Photo of the roof of an old building with a tower on it"
        />
      </div>

      <div>
        <Heading
          as="h2"
          variant="primary"
          className="text-center mt-12 text-4xl"
        >
          Log in
        </Heading>
        <Text className="text-center">
          Welcome back! Please enter your details.
        </Text>
        <LoginForm />
        <Text className="text-center mt-12 mb-20">
          Don't have an account?{' '}
          <Link className="text-cyan-600" to="/signup">
            Sign up
          </Link>
        </Text>
      </div>
    </section>
  );
}

export default LoginPage;
