import { Link } from 'react-router-dom';

import Heading from '@/components/ui/custom/Heading';
import signupImage from '@/assets/img/signup-image.webp';
import Text from '@/components/ui/custom/Text';
import SignUpForm from '@/components/SignUpForm';

function SignUpPage() {
  return (
    <section className="mt-12 grid lg:grid-cols-2 lg:items-center">
      <div className="rounded overflow-hidden aspect-video lg:aspect-square">
        <img
          className="w-full h-full object-cover"
          src={signupImage}
          alt="View of the front of a building with some windows"
        />
      </div>

      <div className="lg:order-first">
        <Heading
          as="h2"
          variant="primary"
          className="text-center mt-12 text-4xl"
        >
          Sign up
        </Heading>

        <SignUpForm />
        <Text className="text-center mt-12 mb-20">
          Already have an account?{' '}
          <Link className="text-cyan-600" to="/login">
            Log in
          </Link>
        </Text>
      </div>
    </section>
  );
}

export default SignUpPage;
