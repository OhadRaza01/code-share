import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Hero from '../components/Hero/Hero'
import ShareCodeFeature from "../components/Features/ShareCodeFeature"
import ReviewCodeFeature from "../components/Features/ReviewCodeFeature"
import CtaSection from "../components/Features/CtaSection"
import Footer from '../components/Footer/Footer'

export default function LandingPage() {
    return (
        <div className='bg-gray-950'>
            <NavBar />
            <Hero />
            <ShareCodeFeature />
            <ReviewCodeFeature />
            <CtaSection />
            <Footer />
        </div>
    )
}
