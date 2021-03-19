import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import LandingLayout from '../components/LandingLayout'
import Hero from '../components/Hero'

const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <Hero
        title="Build this rad landing page"
        subtitle="This is the sub"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="Create your account now"
        ctaLink="/signup"
      />
    </LandingLayout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default LandingPage
